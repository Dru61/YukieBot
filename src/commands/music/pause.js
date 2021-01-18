module.exports = {
    aliases: 'pausar parar pause stop',
    async execute (yukie, message, args) {
        const queue = yukie.queues.get(message.guild.id)

        if (!message.member.voice.channel) return;
        if (!queue) { 
            return message.channel.send('Não estou reproduzindo nenhuma música no momento!') 
        }
        if (message.member.voice.channel !== message.guild.me.voice.channel) return; 

        if (queue.paused) {
            message.channel.send('A música já está pausada!');
        }

        queue.paused = true
        queue.dispatcher.pause(/*true*/)
        message.channel.send(`▶️ **Música pausada** por ${message.author}`)
    }
}

module.exports.help = {
    category: 'music',
    description: 'Pausa a música que está tocando',
    usage: ''
}