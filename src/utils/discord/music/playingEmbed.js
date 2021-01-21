const Discord = require('discord.js')
const ytsearch = require('yt-search')

module.exports = async function playing(song) {
    var toHHmmss = (secs) => {
        var sec_num = parseInt(secs, 10);
        var hour    = Math.floor(sec_num / 3600);
        var minutes = Math.floor(sec_num / 60) % 60;
        var seconds = sec_num % 60;

        return [hour, minutes, seconds]
        .map(v => v < 10 ? "0" + v : v)
        .filter((v, i) => v !== "00" || i > 0)
        .join(':')
    }

    song.duration = (await ytsearch({ videoId: song.id })).seconds;
    const duration = toHHmmss(song.duration);

    const embed = new Discord.MessageEmbed()
    .setTitle(`${song.title}`)
    .setDescription(`${song.author} • Duração ${duration}`)
    .setThumbnail(song.thumbnail)
    .setColor(process.env.DEFAULT_COLOR)

    return embed;
}