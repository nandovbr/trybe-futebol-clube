FROM node:16.14-alpine
WORKDIR /app-frontend
# copia todos os package
COPY package* ./
# instala as dependências
RUN npm install
COPY . .
# faz a build do projeto
RUN npm run build
# port
EXPOSE 3000
# comando para rodar o projeto
CMD ["npm", "start"]