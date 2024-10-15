FROM node:22-alpine

COPY package.json /app/
COPY backend /app/backend/
COPY frontend /app/frontend/
COPY .env /app/

WORKDIR /app

RUN npm run build 
CMD ["npm", "run", "start"]