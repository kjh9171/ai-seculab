const express = require('express');
const fs = require('fs');
const path = require('path');
const otplib = require('otplib');
const qrcode = require('qrcode');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;
const DATA_FILE = path.join(__dirname, 'data.json');

app.use(bodyParser.json());
app.use(express.static('public'));

// 데이터 파일 로드 및 초기화
const initData = () => {
    if (!fs.existsSync(DATA_FILE)) {
        const initialData = {
            inquiries: [],
            config: { 
                secret: otplib.authenticator.generateSecret(), 
                setupDone: false 
            }
        };
        fs.writeFileSync(DATA_FILE, JSON.stringify(initialData, null, 2));
    }
    return JSON.parse(fs.readFileSync(DATA_FILE));
};

const loadData = () => JSON.parse(fs.readFileSync(DATA_FILE));
const saveData = (data) => fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));

// --- API: 보안 인증 (OTP) ---

// 최초 실행 시 QR코드 생성
app.get('/api/admin/setup', async (req, res) => {
    const data = loadData();
    if (data.config.setupDone) return res.status(403).json({ error: '초기 설정이 이미 완료되었습니다.' });
    
    const otpauth = otplib.authenticator.keyuri('Admin', 'AI-Seculab', data.config.secret);
    const qrImage = await qrcode.toDataURL(otpauth);
    res.json({ qr: qrImage });
});

// 초기 설정 완료 확인
app.post('/api/admin/setup-confirm', (req, res) => {
    const { token } = req.body;
    const data = loadData();
    const isValid = otplib.authenticator.check(token, data.config.secret);
    if (isValid) {
        data.config.setupDone = true;
        saveData(data);
        res.json({ success: true });
    } else {
        res.status(401).json({ error: '잘못된 OTP 번호입니다.' });
    }
});

// Admin 로그인 체크
app.post('/api/admin/login', (req, res) => {
    const { token } = req.body;
    const data = loadData();
    
    // 개발 편의 또는 비상용 하드코딩 패스워드 제거
    // 오직 OTP 번호로만 인증
    const isValid = otplib.authenticator.check(token, data.config.secret);
    if (isValid) {
        res.json({ success: true, sessionToken: 'admin-' + Date.now() });
    } else {
        res.status(401).json({ error: '인증에 실패했습니다.' });
    }
});

// 설정 상태 체크 (QR 코드를 보여줄지 말지 결정)
app.get('/api/admin/status', (req, res) => {
    const data = loadData();
    res.json({ setupDone: data.config.setupDone });
});

// --- API: 문의사항 관리 ---

// 문의사항 목록 조회 (Admin 전용)
app.get('/api/admin/inquiries', (req, res) => {
    // 실제 운영 시에는 세션 토큰 검증 로직이 필요함
    const data = loadData();
    res.json(data.inquiries);
});

// 문의사항 상태 변경 (Admin 전용)
app.post('/api/admin/inquiries/update', (req, res) => {
    const { id, status } = req.body;
    const data = loadData();
    const index = data.inquiries.findIndex(i => i.id === id);
    if (index !== -1) {
        data.inquiries[index].status = status;
        data.inquiries[index].checkedBy = 'Security Expert';
        saveData(data);
        res.json({ success: true });
    } else {
        res.status(404).json({ error: '찾을 수 없는 문의사항입니다.' });
    }
});

// 문의사항 접수 (모든 사용자)
app.post('/api/inquiries', (req, res) => {
    const { name, email, message } = req.body;
    const data = loadData();
    const newInquiry = { 
        id: Date.now(), 
        name, 
        email, 
        message, 
        status: 'pending', 
        createdAt: new Date().toISOString() 
    };
    data.inquiries.push(newInquiry);
    saveData(data);
    res.json({ success: true });
});

// 서버 구동
initData();
app.listen(PORT, () => console.log(`[AI-Seculab] Secure server running on http://localhost:${PORT}`));
