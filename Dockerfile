FROM openjdk:11
COPY build/libs/amplicode-ldap-demo-r2-0.0.1-SNAPSHOT.jar amplicode-ldap-demo-r2.jar
ENTRYPOINT ["java","-jar","/amplicode-ldap-demo-r2.jar"]
