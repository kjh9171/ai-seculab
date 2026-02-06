# AI Seculab - 지능형 보안 인텔리전스 플랫폼

AI Seculab은 전문 보안 컨설턴트의 전문성과 현대적인 AI 기업의 UI/UX를 결합한 정보보안 솔루션 프리젠테이션 및 문의 관리용 싱글 페이지 애플리케이션(SPA)입니다.

## 🚀 주요 기능

### 1. 하이엔드 UI/UX 디자인
*   **전문성 시각화**: 무채색(Slate, Navy) 기반의 라이트/다크 테마 지원 및 전문가용 보고서 스타일의 타이포그래피 적용.
*   **지능형 애니메이션**: HTML5 Canvas를 활용한 신경망 배경 애니메이션으로 AI 보안의 정체성 표현.
*   **데이터 시각화**: Chart.js를 사용한 실시간 위협 탐지 통계 시뮬레이션.

### 2. 고도화된 문의 및 관리 시스템
*   **문의하기(Inquiry)**: Firebase Firestore 연동을 통한 실시간 고객 문의 접수 및 데이터 유실 방지.
*   **어드민 대시보드(Admin)**: 
    *   문의 내역 실시간 리스트 확인 (이름, 이메일, 내용, 시간).
    *   처리 상태(Pending/Completed) 및 관리자 확인 로그 업데이트 가능.
*   **동적 암호 관리(Dynamic Auth)**: 
    *   보안 서버(Firebase)를 통한 마스터 패스코드 인증.
    *   **암호 분실 시 복구**: Firebase 콘솔(`/settings/admin_config`)에서 실시간 암호 확인 및 변경 가능.

## 🛠 기술 스택
*   **Frontend**: React (Single File Component), Tailwind CSS (CDN)
*   **Database**: Firebase Firestore (Client Inquiry & Admin Settings)
*   **Visualization**: Chart.js, HTML5 Canvas API
*   **Deployment**: Docker (Nginx), GitHub

## 📦 실행 방법 (Docker)

```bash
# 저장소 복제
git clone https://github.com/kjh9171/ai-seculab.git
cd ai-seculab

# 컨테이너 빌드 및 실행
docker-compose up -d --build
```
실행 후 브라우저에서 [http://localhost:8080](http://localhost:8080)으로 접속하십시오.

## 🔐 관리자 정보
*   **Admin 접속**: 상단 메뉴의 'Admin' 버튼 클릭
*   **초기 패스코드**: `seculab2026`
*   **패스코드 변경/복구**: Firebase 콘솔 내 `admin_config` 문서 수정

## 📧 연락처
*   **Expert**: 보안 전문가
*   **Email**: gimjonghwan319@gmail.com
*   **Project**: [AI Seculab Web Service]

---
© 2026 AI SECULAB. ALL RIGHTS RESERVED.
