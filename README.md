# AI Seculab - 지능형 보안 인텔리전스 플랫폼 (Secure Internal Mode)

AI Seculab은 외부 클라우드 서비스와의 연동 없이, 본인의 서버 내부에서 모든 데이터를 격리 관리하는 **보안 특화형 어드민 플랫폼**입니다.

## 🛡 주요 보안 특징

### 1. Zero-Cloud / Self-Hosted
*   **완벽한 격리**: Firebase 등 외부 DB를 사용하지 않고, 도커 컨테이너 내부의 `data.json` 파일을 통해서만 문의사항과 설정을 관리합니다.
*   **데이터 주권**: 고객의 문의 내용이 외부망으로 흐르지 않아 정보 보안성이 최상 수준으로 유지됩니다.

### 2. Google OTP 기반 2단계 인증 (Password-less)
*   소스 코드나 DB에 고정된 암호를 저장하지 않습니다.
*   **최초 실행 시**: 생성되는 QR 코드를 스마트폰(Google Authenticator)으로 스캔하여 보안 동기화를 진행합니다.
*   **이후 접속**: 매번 갱신되는 6자리 OTP 번호로만 관리자 화면에 접근할 수 있습니다.

### 3. 영구 데이터 보존
*   Docker Volume 기능을 활용하여 컨테이너가 재시작되거나 업데이트되어도 문의 내역과 보안 설정이 유지됩니다.

## 🛠 기술 스택
*   **Backend**: Node.js, Express (Internal API)
*   **Security**: TOTP (Time-based One-Time Password)
*   **Frontend**: React (Single File Component), Tailwind CSS
*   **Infrastructure**: Docker, Docker-Compose

## 📦 실행 및 초기 설정 방법

### 1. 서비스 실행
```bash
# 저장소 복제 및 이동
git clone https://github.com/kjh9171/ai-seculab.git
cd ai-seculab

# 서비스 빌드 및 실행
docker-compose up -d --build
```

### 2. 초기 보안 설정 (최초 1회)
1.  브라우저에서 [http://localhost:8080](http://localhost:8080) 접속
2.  우측 상단 **`Admin`** 버튼 클릭
3.  화면에 나타나는 **QR 코드를 스마트폰의 Google Authenticator 앱으로 스캔**
4.  앱에 표시된 6자리 코드를 입력하여 설정 완료

### 3. 암호 분실 시 조치 방법
OTP 설정을 초기화하고 싶거나 스마트폰을 분실했을 경우:
1.  서버 내부의 `data.json` 파일을 삭제합니다.
2.  서비스를 재시작(`docker-compose restart`)하면 다시 초기 QR 코드가 생성됩니다.

## 📧 연락처
*   **Expert**: 보안 전문가
*   **Email**: gimjonghwan319@gmail.com

---
© 2026 AI SECULAB. ALL RIGHTS RESERVED.
