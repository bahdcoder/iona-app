#!/usr/bin/env bash

NAME=$1
PORT=$2
IONA_NAME=$3

cd /etc/nginx/sites-available

nginx_config() {
  local app_name=$1

  echo "
      server {
      listen 80;

      server_name $app_name;

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

setup_nginx() {
  local app_name=$1

  log Creating nginx config file: $app_name.
  touch $app_name
  test $? -eq 0 || abort Creating nginx config file failed.

  log Writing nginx config to file: $app_name.
  echo $(nginx_config $app_name) >> $app_name
  test $? -eq 0 || abort Writing nginx config to file failed.

  log Linking nginx configuration file: $app_name.
  ln -s /etc/nginx/sites-available/$app_name /etc/nginx/sites-enabled/
  test $? -eq 0 || abort Linking nginx configuration failed
}

log() {
  echo "  ○ $@"
}

abort() {
  echo
  echo "  $@" 1>&2
  echo
  exit 1
}

setup_nginx $IONA_NAME
setup_nginx $NAME

log Restarting nginx.
systemctl restart nginx
test $? -eq 0 || abort Restarting nginx failed

# Get an ssl certificate for iona test site
certbot --nginx -m certs@iona.app --agree-tos -n -d $IONA_NAME

cd ~

mkdir -p /home/iona
cd /home/iona

log Cloning default site.
git clone https://github.com/bahdcoder/iona-default-site $NAME
test $? -eq 0 || abort Failed cloning default site.

cd $NAME

log Setting port environment variable.
export PORT=$PORT

log Starting default iona site.
pm2 start index.js --name $NAME
test $? -eq 0 || abort Failed starting default site.

exit
