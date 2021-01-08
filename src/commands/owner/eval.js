const Discord = require('discord.js');

module.exports = {
    aliases: 'e',
    requireAcessPermission: true,
    async execute (yukie, message, args, data) {
        let code = args.join(' ');
        let hide = false;

        if (code.includes('--hide')) {
            hide = true;
            code = code.replace('--hide', '');
        }

        if (message.mentions.users && code.includes('--user')) {
            code = code.replace('--user', '').replace(/<@!?(\d{16,18})>/g, `yukie.users.cache.get("$1")`);
            hide = false;
        }

        if (code === 'ncu --ver') {
            message.channel.send('```js\n\'checking for updates...\'```');
            
            var upgraded = await require('npm-check-updates').run({
                jsonUpgraded: false,
                silent: true
            });
            code = upgraded;
        }
        
        let result;

        try {
            const evaled = await eval(code);
            
            result = require("util").inspect(evaled, { compact: true, depth: 0 });
        } catch(error) {
            hide = false;
            result = error.toString();
        }

        if (hide === false) return message.channel.send(result, { code: 'js' });
    }
}
