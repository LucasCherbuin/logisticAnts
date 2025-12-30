FROM maven:3.9.6-eclipse-temurin-17

WORKDIR /app

COPY backend/pom.xml .
RUN mvn dependency:go-offline

COPY backend/src ./src

EXPOSE 8080
CMD ["mvn", "spring-boot:run"]


# docker run -p 8080:8080 logisticants-dev
FROM node:20-alpine

WORKDIR /app

COPY frontend/package*.json ./
RUN npm install

COPY frontend/. .

EXPOSE 4200
CMD ["npm", "start"]

