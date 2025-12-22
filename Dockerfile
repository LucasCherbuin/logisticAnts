########################
# 1️⃣ FRONTEND Angular
########################
FROM node:20-alpine AS frontend
WORKDIR /frontend

# Copier package.json et package-lock.json
COPY package*.json ./

# Installer TOUTES les dépendances (prod + dev)
RUN npm install

# Copier les fichiers de configuration et sources
COPY angular.json tsconfig*.json ./
COPY src ./src
COPY public ./public

# Build Angular
RUN npm run build -- --configuration production

########################
# 2️⃣ BACKEND Java / Maven
########################
FROM maven:3.9.9-eclipse-temurin-17 AS backend
WORKDIR /app

COPY pom.xml ./
RUN mvn dependency:go-offline -B

COPY src ./src
COPY WebContent ./WebContent

RUN mvn clean package -DskipTests -B

########################
# 3️⃣ TOMCAT FINAL
########################
FROM eclipse-temurin:17-jre-alpine
ENV TOMCAT_VERSION=10.1.29
ENV CATALINA_HOME=/opt/tomcat
ENV PATH=$CATALINA_HOME/bin:$PATH

RUN apk add --no-cache wget tar && \
    wget -q https://archive.apache.org/dist/tomcat/tomcat-10/v${TOMCAT_VERSION}/bin/apache-tomcat-${TOMCAT_VERSION}.tar.gz && \
    tar -xzf apache-tomcat-${TOMCAT_VERSION}.tar.gz && \
    mv apache-tomcat-${TOMCAT_VERSION} ${CATALINA_HOME} && \
    rm apache-tomcat-${TOMCAT_VERSION}.tar.gz && \
    rm -rf ${CATALINA_HOME}/webapps/* && \
    apk del wget tar

# Copier backend WAR
COPY --from=backend /app/target/*.war ${CATALINA_HOME}/webapps/ROOT.war

# Copier frontend Angular
COPY --from=frontend /frontend/dist/logisticants ${CATALINA_HOME}/webapps/angular

ENV JAVA_OPTS="-Xms512m -Xmx1024m -Djava.security.egd=file:/dev/./urandom"

EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=3s --start-period=60s --retries=3 \
    CMD wget --quiet --tries=1 --spider http://localhost:8080 || exit 1

CMD ["catalina.sh", "run"]

# 🚀 COMMANDES UTILES :
# ---------------------
# Build : docker build -t logisticants .
# Run   : docker exec -it logisticants bash
# docker run -it --rm -v "L:/Projet developpements/logisticAnts:/app" -w /app maven:3.9-eclipse-temurin-17 bash (ajouter le chemin sur votre machine)
# connexion base de données  docker exec -it db mysql -u root -p

