#!/usr/bin/env bash
set -euo pipefail

release_archive="${1:?Release archive is required}"
release_id="${2:?Release id is required}"
base_dir=/home/opc/grupoabr
release_dir="$base_dir/releases/$release_id"
shared_env="$base_dir/shared/feiraco.env"

test -f "$shared_env"
mkdir -p "$release_dir"
tar -xzf "$release_archive" -C "$release_dir"
cp "$shared_env" "$release_dir/.env"
chmod 600 "$release_dir/.env"

cd "$release_dir"
node --env-file=.env apps/api/dist/migrate.js

pm2 delete feiraco-web feiraco-api 2>/dev/null || true
pm2 start ecosystem.config.cjs
pm2 save

ln -sfn "$release_dir" "$base_dir/current"
rm -f "$release_archive"

mapfile -t old_releases < <(find "$base_dir/releases" -mindepth 1 -maxdepth 1 -type d -printf '%T@ %p\n' | sort -nr | tail -n +4 | cut -d' ' -f2-)
if ((${#old_releases[@]})); then
  rm -rf -- "${old_releases[@]}"
fi

curl --fail --silent http://127.0.0.1:3000/ >/dev/null
curl --fail --silent http://127.0.0.1:3333/api/v1/db-health >/dev/null
