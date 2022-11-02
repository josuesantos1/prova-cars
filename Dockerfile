FROM node:alpine
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build
RUN ls -a
USER app
EXPOSE 3030
CMD ["npm", "start"]
