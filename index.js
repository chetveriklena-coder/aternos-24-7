const mineflayer = require('mineflayer');

const botArgs = {
    host: 'gais_9009.aternos.me',
    port: 49959,
    username: 'AFK_Bot',
    version: '1.21.1'
};

const initBot = () => {
    const bot = mineflayer.createBot(botArgs);

    bot.on('login', () => {
        console.log('✅ Бот зашел на сервер!');
    });

    bot.on('spawn', () => {
        setInterval(() => {
            bot.setControlState('jump', true);
            setTimeout(() => bot.setControlState('jump', false), 500);
        }, 30000);
    });

    bot.on('end', () => {
        console.log('❌ Соединение потеряно. Переподключение...');
        setTimeout(initBot, 10000);
    });

    bot.on('error', (err) => console.log('Ошибка:', err));
};

initBot();
