const Discord = require('discord.js');

module.exports = { 
	aliase: 'falar',
	help: '',
	async run (yukie, message, args, data) {
		const pc = data.prefix+data.comando;
		const msg = args.join(' ')

		if (!message.member.hasPermission ('ADMINISTRATOR')) {
			return message.reply('você não tem permissão para executar este comando! Para executá-lo, você precisa ter a permissão de `administrador`!')
		}
		if (msg) {
			message.delete().catch(O_o => {})
			return message.channel.send(msg)
		}
		else {
			const embed = new Discord.MessageEmbed()
			.setTitle('Como usar?')
			.addField('Exemplo:', '`'+pc+'` `'+yukie.user.username+' é minha amiga!`')
			.setDescription('`'+pc+'` + `[frase]`')
			.setTimestamp()
			.addField('Permissão:', 'Para utilizar este comando, é necessário que você tenha a permissão de `administrador`.')
			.setFooter(`Executado por ${message.author.tag}`, message.author.displayAvatarURL())
			.setColor('RANDOM')
<<<<<<< HEAD
			.setThumbnail(message.author.avatarURL({ format: 'png', size: 128 }))
			
=======
			.setThumbnail(message.author.displayAvatarURL({ format: 'png', size: 128 }))
>>>>>>> badb599e41ffd85818b51d3eb3be15ee26a7e00b
			message.channel.send(message.author, embed)
		}
	}
}
