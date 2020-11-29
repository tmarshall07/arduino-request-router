module.exports = {
    apps: [{
        name: 'arduino-request-router',
        script: 'bin/www',
        // Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
        autorestart: true,
        watch: true,
        max_memory_restart: '1G',
        env: {
            NODE_ENV: 'development',
            PORT: 3000
        },
        env_production: {
            NODE_ENV: 'production',
            PORT: 3000
        }
    }]
};
