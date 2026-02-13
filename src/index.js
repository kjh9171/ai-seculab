import * as otplib from "otplib";
import * as qrcode from "qrcode";

// 데이터 초기화 및 로드 함수 (KV 사용)
const initData = async (env) => {
  // KV에서 'site_data' 키로 데이터를 관리합니다.
  let data = await env.DB.get("site_data", "json");
  if (!data) {
    data = {
      inquiries: [],
      config: {
        secret: otplib.authenticator.generateSecret(),
        setupDone: false,
      },
    };
    await env.DB.put("site_data", JSON.stringify(data));
  }
  return data;
};

const loadData = async (env) => {
  return await env.DB.get("site_data", "json");
};

const saveData = async (env, data) => {
  await env.DB.put("site_data", JSON.stringify(data));
};

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const { pathname } = url;

    // CORS 설정 (필요 시)
    const corsHeaders = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    };

    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders });
    }

    // --- API: 보안 인증 (OTP) ---

    // 최초 실행 시 QR코드 생성
    if (pathname === "/api/admin/setup" && request.method === "GET") {
      const data = await initData(env);
      if (data.config.setupDone) {
        return new Response(
          JSON.stringify({ error: "초기 설정이 이미 완료되었습니다." }),
          {
            status: 403,
            headers: { "Content-Type": "application/json", ...corsHeaders },
          },
        );
      }

      const otpauth = otplib.authenticator.keyuri(
        "Admin",
        "AI-Seculab",
        data.config.secret,
      );
      const qrImage = await qrcode.toDataURL(otpauth);
      return new Response(JSON.stringify({ qr: qrImage }), {
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    // 초기 설정 완료 확인
    if (pathname === "/api/admin/setup-confirm" && request.method === "POST") {
      const { token } = await request.json();
      const data = await loadData(env);
      const isValid = otplib.authenticator.check(token, data.config.secret);
      if (isValid) {
        data.config.setupDone = true;
        await saveData(env, data);
        return new Response(JSON.stringify({ success: true }), {
          headers: { "Content-Type": "application/json", ...corsHeaders },
        });
      } else {
        return new Response(
          JSON.stringify({ error: "잘못된 OTP 번호입니다." }),
          {
            status: 401,
            headers: { "Content-Type": "application/json", ...corsHeaders },
          },
        );
      }
    }

    // Admin 로그인 체크
    if (pathname === "/api/admin/login" && request.method === "POST") {
      const { token } = await request.json();
      const data = await loadData(env);
      const isValid = otplib.authenticator.check(token, data.config.secret);
      if (isValid) {
        return new Response(
          JSON.stringify({
            success: true,
            sessionToken: "admin-" + Date.now(),
          }),
          {
            headers: { "Content-Type": "application/json", ...corsHeaders },
          },
        );
      } else {
        return new Response(JSON.stringify({ error: "인증에 실패했습니다." }), {
          status: 401,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        });
      }
    }

    // 설정 상태 체크
    if (pathname === "/api/admin/status" && request.method === "GET") {
      const data = await loadData(env);
      return new Response(
        JSON.stringify({ setupDone: data?.config?.setupDone || false }),
        {
          headers: { "Content-Type": "application/json", ...corsHeaders },
        },
      );
    }

    // --- API: 문의사항 관리 ---

    // 문의사항 목록 조회 (Admin 전용)
    if (pathname === "/api/admin/inquiries" && request.method === "GET") {
      const data = await loadData(env);
      return new Response(JSON.stringify(data.inquiries), {
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    // 문의사항 상태 변경 (Admin 전용)
    if (
      pathname === "/api/admin/inquiries/update" &&
      request.method === "POST"
    ) {
      const { id, status } = await request.json();
      const data = await loadData(env);
      const index = data.inquiries.findIndex((i) => i.id === id);
      if (index !== -1) {
        data.inquiries[index].status = status;
        data.inquiries[index].checkedBy = "Security Expert";
        await saveData(env, data);
        return new Response(JSON.stringify({ success: true }), {
          headers: { "Content-Type": "application/json", ...corsHeaders },
        });
      } else {
        return new Response(
          JSON.stringify({ error: "찾을 수 없는 문의사항입니다." }),
          {
            status: 404,
            headers: { "Content-Type": "application/json", ...corsHeaders },
          },
        );
      }
    }

    // 문의사항 접수 (모든 사용자)
    if (pathname === "/api/inquiries" && request.method === "POST") {
      const { name, email, message } = await request.json();
      const data = (await loadData(env)) || (await initData(env));
      const newInquiry = {
        id: Date.now(),
        name,
        email,
        message,
        status: "pending",
        createdAt: new Date().toISOString(),
      };
      data.inquiries.push(newInquiry);
      await saveData(env, data);
      return new Response(JSON.stringify({ success: true }), {
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    // 정적 자산 서빙 (public 폴더 기반)
    // Cloudflare Workers는 wrangler.toml에 [assets] 설정이 있으면 자동으로 처리하지만,
    // 필요 시 여기서 명시적으로 서빙 로직을 추가할 수도 있습니다.
    // 현재는 wrangler의 assets 기능을 활용하므로 API 이외의 요청은 무시하거나 에러 처리 가능합니다.

    return new Response("Not Found", { status: 404 });
  },
};
