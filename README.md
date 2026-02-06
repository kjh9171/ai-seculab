# AI Seculab: Advanced Security Intelligence Platform

![Security](https://img.shields.io/badge/Security-Intelligence-blue.svg)
![Auth](https://img.shields.io/badge/Auth-Google%20OTP-orange.svg)
![Docker](https://img.shields.io/badge/Infrastructure-Docker-blue.svg)

AI Seculab은 전문 보안 컨설턴트의 통찰력과 현대적인 AI 보안 인텔리전스를 결합한 **독립형 보안 관리 플랫폼**입니다. 외부 클라우드 의존성을 완전히 제거하고, 폐쇄망 환경에서도 운영 가능한 **Self-Hosted 아키텍처**를 지향합니다.

---

## 🛡️ Core Security Architecture

### 1. Zero-Cloud Intelligence (가용성 및 주권 보장)
*   **Data Sovereignty**: 모든 데이터는 관리자의 로컬 인프라(Docker Container) 내부 `data.json`에만 기록됩니다. 외부 API 호출이나 클라우드 전송이 원천 차단된 진정한 의미의 보안 주권을 실현합니다.
*   **Internal Pipeline**: 문의사항 접수부터 관리자 피드백까지 모든 흐름이 내부 API를 통해 격리되어 처리됩니다.

### 2. Password-less OTP Authentication (최상위 보안 인증)
*   **TOTP 기반 2FA**: 고정된 하드코딩 암호를 배제하고, Google Authenticator와 연동되는 **Time-based One-Time Password(TOTP)** 시스템을 탑재했습니다.
*   **Secure Provisioning**: 최초 실행 시 1회에 한하여 QR 코드를 이용한 보안 프로비저닝을 수행하며, 이후에는 6자리 가변 코드로만 접근이 허용됩니다.

### 3. Integrated Threat Visualization (데이터 기반 통찰)
*   **Heuristic Analysis Rendering**: HTML5 Canvas를 활용한 지능형 배경 애니메이션은 사이버 위협 탐지망의 밀도와 연결성을 상징적으로 표현합니다.
*   **Live Risk Simulation**: Chart.js 기반의 대시보드는 비즈니스가 직면한 리스크 지표를 실시간으로 시뮬레이션하여 시각화합니다.

---

## 🛠️ Technology Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend** | React (SFC), Tailwind CSS, Chart.js, Canvas API |
| **Backend** | Node.js (Express), Internal Secure API |
| **Security** | otplib (TOTP), qrcode (Provisioning) |
| **Infrastructure** | Docker, Docker-Compose (Automated Orchestration) |

---

## 📦 Deployment & Configuration

### 1. Quick Start
Docker 환경이 구축된 서버에서 아래 명령어를 실행하십시오.

```bash
# Repository Cloning
git clone https://github.com/kjh9171/ai-seculab.git
cd ai-seculab

# Service Build & Launch
docker-compose up -d --build
```
서비스는 기본적으로 **[http://localhost:8080](http://localhost:8080)**에서 구동됩니다.

### 2. Admin Security Setup (최초 1회 필수)
1.  홈페이지 접속 후 우측 상단의 **`Admin`** 메뉴를 클릭합니다.
2.  화면에 표시되는 고유 QR 코드를 **Google Authenticator** 앱으로 스캔합니다.
3.  앱에 등록된 6자리 번호를 입력하여 인증 장치 등록을 완료합니다.
4.  *보안 경고: 한 번 설정이 완료되면 QR 코드는 더 이상 노출되지 않습니다.*

### 3. Recovery & Reset (비상 조치)
보안 장치(스마트폰) 분실 등으로 인증이 불가능할 경우:
1.  `data.json` 파일을 백업 후 삭제합니다.
2.  컨테이너를 재시작(`docker-compose restart`)하면 보안 프로비저닝 단계로 초기화됩니다.

---

## 📧 Contact Information

*   **Senior Consultant**: 보안 전문가
*   **Technical Support**: gimjonghwan319@gmail.com
*   **Project Vision**: *“Intelligence beyond boundaries, Security within control.”*

---
© 2026 AI SECULAB. ALL RIGHTS RESERVED.
