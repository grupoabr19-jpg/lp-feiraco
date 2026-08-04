module.exports = {
  apps: [
    {
      name: 'feiraco-web',
      cwd: __dirname,
      script: 'apps/web/server.js',
      env: {
        NODE_ENV: 'production',
        PORT: '3000',
        HOSTNAME: '127.0.0.1',
      },
      max_memory_restart: '180M',
      restart_delay: 3000,
    },
    {
      name: 'feiraco-api',
      cwd: __dirname,
      script: 'apps/api/dist/server.js',
      env: {
        NODE_ENV: 'production',
        PORT: '3333',
      },
      max_memory_restart: '140M',
      restart_delay: 3000,
    },
  ],
};
