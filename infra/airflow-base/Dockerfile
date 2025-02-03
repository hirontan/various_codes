FROM apache/airflow:latest-python3.12

USER root

RUN apt-get update && apt-get install -y --no-install-recommends \
    gnupg curl ca-certificates \
    gcc \
    procps \
    wget \
    openjdk-17-jdk-headless \
    libkrb5-dev && \
    apt-get clean && rm -rf /var/lib/apt/lists/*
