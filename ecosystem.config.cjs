module.exports = {
  apps: [
    {
      name: 'feiraco-web',
      cwd: `${__dirname}/apps/web`,
      script: 'node_modules/next/dist/bin/next',
      args: 'start -p 3000',
      env: {
        NODE_ENV: 'production',
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
