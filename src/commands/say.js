const Discord = require('discord.js');

module.exports = { 
	aliase: 'falar',
	help: '',
	async run (yukie, message, args, data) {
		const arg = args.join(' ')

		if (!message.member.hasPermission ('ADMINISTRATOR')) {
			return message.reply('você não tem permissão para executar este comando! Para executá-lo, você precisa ter a permissão de `administrador`!')
		}
		if (arg) {
			message.delete().catch(O_o => {})
			return message.channel.send(arg)
		}
		else {
			let embed = new Discord.MessageEmbed()
<<<<<<< HEAD
			.setColor('RANDOM')
			.setTitle('Como usar?')
=======
			.setTitle('Como usar?')
			.addField('Exemplo:', '`'+pc+'` `'+yukie.user.username+' é minha amiga!`')
			.setDescription('`'+pc+'` + `[frase]`')
			.setTimestamp()
			.addField('Permissão:', 'Para utilizar este comando, é necessário que você tenha a permissão de `administrador`.')
			.setFooter(`Executado por ${message.author.tag}`, message.author.avatarURL())
			.setColor('RANDOM')
>>>>>>> 33a3651497c010174899ad058f4025c41fe855af
			.setThumbnail(message.author.avatarURL({ format: 'png', size: 128 }))
			.setDescription('`'+data.prefix+data.comando+'` + `[frase]`')
			.addField('Exemplo:', '`'+data.prefix+data.comando+'` `'+yukie.user.username+' é minha amiga!`')
			.addField('Permissão:', 'Para utilizar este comando, é necessário que você tenha a permissão de `administrador`.')
			.setFooter(`Executado por ${message.author.tag}`, message.author.avatarURL())
			.setTimestamp()
			
			message.channel.send(message.author, embed)
		}
	}
}