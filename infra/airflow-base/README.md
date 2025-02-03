# Airflow Base

This is a Docker image for Apache Airflow based on `apache/airflow:latest-python3.12`.

## Features

- Based on `apache/airflow:latest-python3.12`

## Usage

To use this Docker image, you can pull it from Docker Hub and run it as follows:

### Pull the Image

```bash
docker pull hirontan3/airflow-base:latest
```

## Build Instructions

```bash
docker buildx build --platform linux/arm64,linux/amd64 -t hirontan3/airflow-base:[python-version(ex. 3.12)] -t hirontan3/airflow-base:latest --push .
```

## License

MIT
