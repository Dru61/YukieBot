const Discord = require('discord.js')
const player = require('./play').player

module.exports = {
    aliases: 'pular',
    async execute (yukie, message, args, data) {
        const queue = yukie.queues.get(message.guild.id);
        
        if (!message.member.voice.channel) return;
        if (!queue) { 
            return message.channel.send('Não estou reproduzindo nenhuma música no momento!');
        }
        if (message.member.voice.channel.id !== message.guild.me.voice.channel.id) return;
        
        if (message.author.id !== queue.songs[0].author.id) {
            const playing = queue.songs[0].url;
            const members = message.member.voice.channel.members.filter(u => !u.user.bot);
            const membersize = Math.round(members.size / 2);

            const embed = new Discord.MessageEmbed()
            .setDescription('Aproximadamente **metade** dos usuários conectados devem concordar!\nUsuários (0/'+membersize+') concordaram')
            .setFooter(`Clique em '⏭️' para pular a música`)
            .setColor(process.env.DEFAULT_COLOR)

            return message.channel.send(embed).then(msg => {
                msg.react('⏭️').catch(() => msg.delete().catch(() => {}));

                if (msg.deleted == true) return;
                
                const filter = (r, u) => ['⏭️'].includes(r.emoji.name);
                const collector = msg.createReactionCollector(filter, { time: 30000 });
                
                collector.on("collect", (r, u) => {
                    if (!members.map(m => m.id).includes(u.id)) {
                        if (u.id === yukie.user.id) return;
                        r.users.remove(u.id);
                    };
                    if (playing !== queue.songs[0].url) return;

                    if (!yukie.queues.get(message.guild.id)) return;

                    msg.edit(embed.setDescription('Aproximadamente **metade** dos usuários conectados devem concordar!\nUsuários ('+(r.count - 1)+'/'+membersize+') concordaram'))
                    .catch(() => {});

					if (r.count - 1 >= membersize) {
                        collector.stop();
                        //if (queue.msg !== null) queue.msg.then(m => m.delete().catch(O_o => {}));

                        msg.delete().catch(() => {});
                        message.channel.send('⏭️ **Música pulada**');
                        
                        queue.paused = false;
                        queue.songs.shift();
                        player(yukie, message, queue.songs[0]);
                    }
                })

                collector.on("end", () => {
                    msg.delete().catch(() => {});
                })
            })
        }
        message.channel.send(`⏭️ **Música pulada** por ${queue.songs[0].author}`);

        queue.paused = false;
        queue.songs.shift();
        player(yukie, message, queue.songs[0]);

        //console.log(queue.msg)
        //if (queue.msg !== null) queue.msg.then(m => m.delete().catch(O_o => {}));
    }
}

module.exports.help = {
    category: 'music',
    description: 'Pula a música que está tocando',
    usage: ''
}