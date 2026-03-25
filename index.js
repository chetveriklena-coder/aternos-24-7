const mineflayer = require('mineflayer');
const http = require('http');

// 1. Создаем фальшивый сервер для Render
http.createServer((req, res) => {
    res.write("I am alive");
    res.end();
}).listen(8080);

const botArgs = {
    host: 'gais_9009.aternos.me',
    port: 49959,
    username: 'AFK_Bot',
    version: '1.21.1'
};

const initBot = () => {
    const bot = mineflayer.createBot(botArgs);

    bot.on('login', () => console.log('✅ Бот на базе!'));

    bot.on('spawn', () => {
        console.log('📍 Бот появился в мире');
        // Анти-АФК и фарм (машет рукой)
        setInterval(() => {
            bot.swingArm('left');
        }, 15000); 
    });

    bot.on('death', () => {
        setTimeout(() => bot.respawn(), 2000);
    });

    bot.on('end', () => {
        console.log('❌ Вылет. Перезаход...');
        setTimeout(initBot, 10000);
    });

    bot.on('error', (err) => console.log('Ошибка:', err));
};

initBot();
