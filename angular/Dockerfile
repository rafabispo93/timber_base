### Stage 1: build ###

FROM node:11.4.0-alpine as builder

RUN mkdir /app
WORKDIR /app

# Copy app dependencies.
COPY invoices-app/package.json invoices-app/package-lock.json /app/invoices-app/

# Install app dependencies.
RUN npm install --prefix invoices-app

# Copy app files.
COPY . /app

# Build app
RUN npm run build --prefix invoices-app -- --output-path=./dist/out

### Stage 2: delivery ###

FROM nginx:1.15.7-alpine

# Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

# Copy output directory from builder to nginx image.
COPY --from=builder /app/invoices-app/dist/out /usr/share/nginx/html

# Copy nginx configuration file.
COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf