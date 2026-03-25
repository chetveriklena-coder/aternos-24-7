const mineflayer = require('mineflayer');
const http = require('http');

// Это заставляет Render думать, что мы - сайт, и не выключать нас
http.createServer((req, res) => {
    res.writeHead(200);
    res.end("OK");
}).listen(process.env.PORT || 8080);

const botArgs = {
    host: 'gais_9009.aternos.me:49959',
    port: 49959,
    username: 'AFK_Bot',
    version: '1.21.1'
};

const initBot = () => {
    const bot = mineflayer.createBot(botArgs);

    bot.on('login', () => console.log('✅ Бот в игре!'));

    bot.on('spawn', () => {
        // Бот будет просто махать рукой раз в 30 секунд, чтобы не кикнуло за АФК
        setInterval(() => {
            if (bot.entity) bot.swingArm('left');
        }, 30000);
    });

    bot.on('death', () => setTimeout(() => bot.respawn(), 2000));
    
    bot.on('end', () => {
        console.log('❌ Вылет, перезахожу...');
        setTimeout(initBot, 5000);
    });

    bot.on('error', (err) => console.log('Ошибка:', err));
};

initBot();

