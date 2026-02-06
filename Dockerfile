FROM nginx:alpine
# build 단계 없이 간단한 nginx 설정을 사용하여 서비스를 배포합니다.

# index.html 파일을 nginx의 기본 서빙 경로로 복사합니다.
COPY index.html /usr/share/nginx/html/index.html

# 80 포트를 노출합니다.
EXPOSE 80

# nginx를 실행합니다.
CMD ["nginx", "-g", "daemon off;"]
