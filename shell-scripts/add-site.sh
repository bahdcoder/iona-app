# declare global constants for arguments
NAME=$1
PORT=$2

# generate the nginx config using the options passed into this script
nginx_config () {
  echo "
    server {
      listen 80;

      server_name $NAME;

      location / {
          proxy_pass http://localhost:$PORT;
          proxy_http_version 1.1;
          proxy_set_header Upgrade \$http_upgrade;
          proxy_set_header Connection 'upgrade';
          proxy_set_header Host \$host;
          proxy_set_header X-Real-IP \$remote_addr;
          proxy_set_header X-Forwarded-Proto \$scheme;
          proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
          proxy_cache_bypass \$http_upgrade;
      }
    }
  "
}
# cd into nginx folder, create nginx config and link it
setup_nginx_config () {
  local config="$(nginx_config)"

  echo config >> "~/etc/nginx/sites-available/$NAME"
  ln "~/etc/nginx/sites-available/$NAME"  "~/etc/nginx/sites-enabled/$NAME"

}
# restart nginx
# cd into the new site folder, and generate the default site.
