# Utilizar uma imagem oficial do Node.js com versão 18 (ou mais recente)
FROM node:18-alpine

# Define o diretório de trabalho dentro do container
WORKDIR /usr/src/app

# Desabilitar o prompt de analytics do Angular CLI
ENV NG_CLI_ANALYTICS=ci

# Copiar o arquivo package.json e o package-lock.json (se disponível)
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copiar o restante dos arquivos do projeto
COPY . .

# Expor a porta 4200 para acessar o Angular no localhost
EXPOSE 4200

# Comando padrão ao rodar o container
CMD ["npm", "start"]
