# Use a lightweight web server image
FROM nginx:alpine

# Copy your website files into the web server
COPY . /usr/share/nginx/html

# Expose port 80 inside the container
EXPOSE 80
