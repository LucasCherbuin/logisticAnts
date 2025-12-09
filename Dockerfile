# Étape 1 : Build du frontend Angular
FROM node:20-alpine AS angular-build

WORKDIR /app

# Copier package.json et installer les dépendances
COPY package*.json ./

RUN npm install

# Copier tous les fichiers Angular nécessaires
COPY angular.json tsconfig*.json ./
COPY src ./src
COPY public ./public

# Construire l'application Angular en mode production
RUN npm run build -- --configuration production

# Étape 2 : Build du backend Struts
FROM maven:3.9.2-eclipse-temurin-20 AS struts-build

WORKDIR /app
     


# Copier pom.xml et télécharger les dépendances
COPY pom.xml ./
RUN mvn dependency:go-offline

# Copier uniquement les fichiers Java/Maven nécessaires
COPY src ./src
COPY WebContent ./WebContent

# Compiler le projet Struts et générer le WAR
RUN mvn clean package -DskipTests

# Étape 3 : Image finale avec Tomcat
FROM tomcat:10.1-jdk17

# Supprimer les applications par défaut de Tomcat
RUN rm -rf /usr/local/tomcat/webapps/*

# Copier le WAR du backend depuis l'étape de build Struts
COPY --from=struts-build /app/target/*.war /usr/local/tomcat/webapps/ROOT.war

# Copier le build Angular depuis l'étape de build Angular
# Ajustez le chemin selon votre configuration angular.json
COPY --from=angular-build /app/dist/logisticants /usr/local/tomcat/webapps/angular

# Exposer le port 8080
EXPOSE 8080

# Démarrer Tomcat
CMD ["catalina.sh", "run"]