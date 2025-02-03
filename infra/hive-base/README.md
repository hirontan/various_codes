# Hive Base

This is a Docker image for Apache Hive. It is based on the official `apache/hive:4.0.1` image and adds some additional configuration.

## Features

- Based on `apache/hive:4.0.1`

## Usage

To use this Docker image, you can pull it from Docker Hub and run it as follows:

### Pull the Image

```bash
docker pull hirontan3/hive-base:latest
```

## Build Instructions

```bash
docker buildx build --platform linux/arm64,linux/amd64 -t hirontan3/hive-base:[hive-version(ex. 4.0.1)] -t hirontan3/hive-base:latest --push .
```

## License

MIT
