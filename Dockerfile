# Usar Node como base
FROM node:18-alpine

# Diretório de trabalho
WORKDIR /app

RUN npm install -g @nestjs/cli

# Copiar arquivos
COPY package*.json ./

# Instalar dependências
RUN npm install

# Copiar o código da aplicação
COPY . .

# Build da aplicação
RUN npm run build

# Expor a porta da aplicação
EXPOSE 3001

# Comando para rodar o aplicativo
CMD ["npm", "run", "start:dev"]