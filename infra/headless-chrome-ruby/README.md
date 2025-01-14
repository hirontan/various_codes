# Headless Chrome Ruby

This is a lightweight Docker image with Chromium and Chromedriver for ARM64 environments.

## Features

- Includes Chromium 112 and Chromedriver 112 for ARM64
- Optimized for lightweight usage
- No symbolic links for binaries

## Usage

To use this Docker image, you can pull it from Docker Hub and run it as follows:

### Pull the Image

```bash
docker pull hirontan3/headless-chrome-ruby:latest
```

### Run Chromium

```bash
docker run --rm hirontan3/headless-chrome-ruby:latest chromium-browser --version
```

### Run Chromedriver

```bash
docker run --rm hirontan3/headless-chrome-ruby:latest chromedriver --version
```

## Build Instructions

```bash
docker buildx build --platform linux/arm64 -t hirontan3/headless-chrome-ruby:[ruby-version(ex. 3.2.2)] -t hirontan3/headless-chrome-ruby:latest --push .
```

## License

MIT
