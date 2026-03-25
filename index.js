const mineflayer = require('mineflayer');
const http = require('http');

http.createServer((req, res) => {
    res.writeHead(200);
    res.end("OK");
}).listen(process.env.PORT || 8080);

const botArgs = {
    host: 'gais_9009.aternos.me',
    port: 49959,
    username: 'AFK_Bot',
    version: '1.21.1'
};

const initBot = () => {
    const bot = mineflayer.createBot(botArgs);
    bot.on('login', () => console.log('ONLINE'));
    bot.on('spawn', () => {
        setInterval(() => {
            if (bot.entity) bot.swingArm('left');
        }, 30000);
    });
    bot.on('death', () => setTimeout(() => bot.respawn(), 2000));
    bot.on('end', () => setTimeout(initBot, 5000));
    bot.on('error', (err) => console.log(err));
};

initBot();
