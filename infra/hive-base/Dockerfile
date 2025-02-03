FROM apache/hive:4.0.1 AS builder

USER root

RUN apt-get update && apt-get install -y --no-install-recommends \
    gnupg ca-certificates openjdk-11-jdk wget curl \
    && curl -fsSL https://ftp-master.debian.org/keys/archive-key-12.asc | gpg --batch --yes --dearmor -o /usr/share/keyrings/debian-archive-keyring.gpg \
    && apt-get clean && rm -rf /var/lib/apt/lists/*
    
RUN wget https://repo1.maven.org/maven2/mysql/mysql-connector-java/8.0.30/mysql-connector-java-8.0.30.jar -O /tmp/mysql-connector-java.jar \
    && wget https://repo1.maven.org/maven2/org/apache/hadoop/hadoop-aws/3.3.4/hadoop-aws-3.3.4.jar -O /tmp/hadoop-aws-3.3.4.jar \
    && wget https://repo1.maven.org/maven2/com/amazonaws/aws-java-sdk-bundle/1.11.1026/aws-java-sdk-bundle-1.11.1026.jar -O /tmp/aws-java-sdk-bundle-1.11.1026.jar \
    && wget https://repo1.maven.org/maven2/org/apache/tez/tez-runtime-library/0.10.2/tez-runtime-library-0.10.2.jar -O /tmp/tez-runtime-library-0.10.2.jar \
    && wget https://repo1.maven.org/maven2/org/apache/tez/tez-common/0.10.2/tez-common-0.10.2.jar -O /tmp/tez-common-0.10.2.jar \
    && wget https://repo1.maven.org/maven2/org/apache/tez/tez-dag/0.10.2/tez-dag-0.10.2.jar -O /tmp/tez-dag-0.10.2.jar

FROM apache/hive:4.0.1

USER root

COPY --from=builder /tmp/mysql-connector-java.jar /opt/hive/lib/
COPY --from=builder /tmp/hadoop-aws-3.3.4.jar /opt/hive/lib/
COPY --from=builder /tmp/aws-java-sdk-bundle-1.11.1026.jar /opt/hive/lib/
COPY --from=builder /tmp/tez-runtime-library-0.10.2.jar /opt/hive/lib/
COPY --from=builder /tmp/tez-common-0.10.2.jar /opt/hive/lib/
COPY --from=builder /tmp/tez-dag-0.10.2.jar /opt/hive/lib/

RUN apt-get update --allow-unauthenticated \
    && apt-get install -y --no-install-recommends gnupg ca-certificates openjdk-11-jdk netcat net-tools thrift-compiler --fix-missing \
    && apt-get clean && rm -rf /var/lib/apt/lists/*
