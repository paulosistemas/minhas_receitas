FROM maven:3-eclipse-temurin-23-alpine as builder
# Copy the jar file into the container
COPY . .
RUN mvn package -DskipTests

FROM eclipse-temurin:23-alpine as server
WORKDIR /java-app
COPY --from=builder target/*.jar app.jar
EXPOSE 8080
# Specify the command to run on container start
ENTRYPOINT ["java", "-jar", "app.jar"]