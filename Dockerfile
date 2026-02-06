FROM node:18-alpine

# 작업 디렉토리 설정
WORKDIR /app

# 의존성 파일 복사 및 설치
COPY package*.json ./
RUN npm install

# 전체 소스 코드 복사
COPY . .

# 데이터 파일 권한 설정 (Docker 볼륨 마운트 대비)
RUN touch data.json && chmod 666 data.json

# 서버 포트 노출
EXPOSE 3000

# 서버 실행
CMD ["node", "server.js"]
