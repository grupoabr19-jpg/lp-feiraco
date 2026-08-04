#!/usr/bin/env bash
set -euo pipefail

APP_DIR=/home/opc/grupoabr/2-lp-terceiro-feiraco
cd "$APP_DIR"
umask 077

db_password="$(openssl rand -hex 24)"
export_token="$(openssl rand -hex 32)"
ip_salt="$(openssl rand -hex 32)"

printf '%s\n' \
  'POSTGRES_USER=feiraco' \
  "POSTGRES_PASSWORD=$db_password" \
  'POSTGRES_DB=feiraco' \
  > deploy/.env.database

printf '%s\n' \
  'NODE_ENV=production' \
  'PORT=3333' \
  'FRONTEND_URL=https://evento.grupoabr.com.br' \
  "DATABASE_URL=postgresql://feiraco:$db_password@127.0.0.1:5432/feiraco" \
  'DATABASE_SSL=false' \
  "LEADS_EXPORT_TOKEN=$export_token" \
  "IP_HASH_SALT=$ip_salt" \
  > .env

printf '%s' "$export_token" > /home/opc/grupoabr/feiraco-sheets-token
chmod 600 .env deploy/.env.database /home/opc/grupoabr/feiraco-sheets-token

sudo docker compose -f deploy/docker-compose.yml up -d

for attempt in $(seq 1 30); do
  if sudo docker exec feiraco-postgres pg_isready -U feiraco -d feiraco >/dev/null 2>&1; then
    break
  fi
  if [ "$attempt" -eq 30 ]; then
    echo 'PostgreSQL did not become healthy in time.' >&2
    exit 1
  fi
  sleep 2
done

pnpm install --frozen-lockfile --child-concurrency=1 --network-concurrency=4
pnpm build
node --env-file=.env apps/api/dist/migrate.js

pm2 startOrReload ecosystem.config.cjs
pm2 save

sudo install -m 644 deploy/nginx.conf /etc/nginx/conf.d/feiraco.conf
sudo setsebool -P httpd_can_network_connect 1
sudo nginx -t
sudo systemctl enable --now nginx
sudo systemctl restart nginx

sudo install -m 755 /home/opc/.nvm/versions/node/v24.19.0/bin/node /usr/local/bin/node
sudo rm -rf /opt/pm2
sudo cp -a /home/opc/.nvm/versions/node/v24.19.0/lib/node_modules/pm2 /opt/pm2
sudo install -m 644 deploy/pm2-opc.service /etc/systemd/system/pm2-opc.service
sudo systemctl daemon-reload
sudo systemctl enable pm2-opc
