module.exports = {
  apps : [{
    name: 'codinghelp-bot',
    script: 'index.js',
    watch: '.',
    env: {
      NODE_ENV: "development",
    },
    env_production: {
      NODE_ENV: "production",
    }
  }, {
    name: 'codinghelp-index',
    script: 'index.js'
  }]
};
