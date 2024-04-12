#DockerFile	
FROM node:18

WORKDIR '/api_test'

# . 은 현재 디렉토리 (루트)의 모든것을, WORKDIR에 복사
COPY . .
EXPOSE 3000
RUN npm install

#COPY or ADD
#Run the specified command within the container
CMD ["npm", "start"]
