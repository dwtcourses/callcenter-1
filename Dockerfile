# Use node 4.4.5 LTS
FROM node:lts-alpine
ENV NODE_ENV dev

# Copy source code
COPY . /home/app/call-center

# Change working directory
WORKDIR /home/app/call-center

RUN apk update && \
	apk upgrade && \
	apk add curl && \
	apk add vim

# Install dependencies
RUN npm install

# Expose API port to the outside
EXPOSE 8000 5000

# Launch application
CMD ["npm","start"]
