FROM ruby:3.2.2-slim-bullseye

RUN apt-get update -yq \
  && apt-get install -yq --no-install-recommends \
     build-essential \
     wget \
     dpkg \
     curl \
     ruby-dev \
     libpq-dev \
     libcurl4-openssl-dev \
     libgbm1 \
     libnspr4 \
     libnss3 \
     xdg-utils \
     libwayland-server0 \
     libatk-bridge2.0-0 \
     libatk1.0-0 \
     libatspi2.0-0 \
     libcairo2 \
     libcups2 \
     libdbus-1-3 \
     libglib2.0-0 \
     libpango-1.0-0 \
     libx11-6 \
     libxcb1 \
     libxcomposite1 \
     libxdamage1 \
     libxext6 \
     libxfixes3 \
     libxkbcommon0 \
     libxrandr2 \
     libxtst6 \
     libx11-xcb1 \
     libasound2 \
  && apt-get clean \
  && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

RUN cd /tmp && \
     wget https://launchpad.net/~canonical-chromium-builds/+archive/ubuntu/stage/+build/25972322/+files/chromium-browser_112.0.5615.49-0ubuntu0.18.04.1_arm64.deb && \
     wget https://launchpad.net/~canonical-chromium-builds/+archive/ubuntu/stage/+build/25972322/+files/chromium-chromedriver_112.0.5615.49-0ubuntu0.18.04.1_arm64.deb && \
     wget https://launchpad.net/~canonical-chromium-builds/+archive/ubuntu/stage/+build/25972322/+files/chromium-codecs-ffmpeg-extra_112.0.5615.49-0ubuntu0.18.04.1_arm64.deb && \
     wget https://launchpad.net/~canonical-chromium-builds/+archive/ubuntu/stage/+build/25972322/+files/chromium-codecs-ffmpeg_112.0.5615.49-0ubuntu0.18.04.1_arm64.deb && \
     dpkg -i chromium-codecs-ffmpeg_112.0.5615.49-0ubuntu0.18.04.1_arm64.deb && \
     dpkg -i chromium-codecs-ffmpeg-extra_112.0.5615.49-0ubuntu0.18.04.1_arm64.deb && \
     dpkg -i chromium-browser_112.0.5615.49-0ubuntu0.18.04.1_arm64.deb && \
     dpkg -i chromium-chromedriver_112.0.5615.49-0ubuntu0.18.04.1_arm64.deb && \
     rm -rf /tmp/*.deb
