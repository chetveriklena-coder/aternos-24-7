const mineflayer = require('mineflayer');
const http = require('http');

// Создаем сервер, который Render будет видеть как "живой сайт"
const port = process.env.PORT || 8080;
http.createServer((req, res) => {
    res.writeHead(200);
    res.end("OK");
}).listen(port, "0.0.0.0");

const botArgs = {
    host: 'gais_9009.aternos.me',
    port: 49959,
    username: 'AFK_Bot',
    version: '1.21.1'
};

const initBot = () => {
    const bot = mineflayer.createBot(botArgs);

    bot.on('spawn', () => {
        console.log('Бот на месте и стоит стабильно');
        // Редкий взмах рукой раз в 30 сек, чтобы не кикнул сам Атернос
        setInterval(() => {
            bot.swingArm('left');
        }, 30000);
    });

    bot.on('death', () => setTimeout(() => bot.respawn(), 2000));
    bot.on('end', () => setTimeout(initBot, 5000));
    bot.on('error', () => {}); 
};

initBot();

