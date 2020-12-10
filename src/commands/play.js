//const Discord = require('discord.js');
const ytdl = require('ytdl-core');
const search = require('../util/music/search')

const run = async(yukie, message, args, data) => {
  let queue = yukie.queues.get(message.guild.id);
  try {
    const song = await search(args[0], message)
    if (song == false) return;
    
    if (queue && message.guild.me.voice.channel === null) {
      queue.msg.then(m => m.delete().catch(O_o => {}))
      await yukie.queues.delete(message.member.guild.id)
    }
    // P L A Y L I S T
    if (song.Playlist) {
      if (!queue) {
        await player(yukie, message, song);
        if (song._videos.length > 2) videos = song._videos.filter(v => v.url !== song.url)
      }
      if (yukie.queues.get(message.guild.id) && videos) {
        return videos.map(song => {
          console.log(song.author)
          console.log(song) 
          queue = yukie.queues.get(message.guild.id)
          queue.songs.push(song) 
          yukie.queues.set(message.guild.id, queue);
        })
      }
      else return player(yukie, message, song);
    }
    // V I D E O 
    else if (queue) {
      queue.songs.push(song);
      yukie.queues.set(message.guild.id, queue);
    } else return player(yukie, message, song);
  }
  catch (err) {
    console.error(err);
    message.channel.send(err)
  }
}
  const player = async (yukie, message, song) => {
    let queue = yukie.queues.get(message.member.guild.id);

    if (!song) {
      if (queue) {
        queue.connection.disconnect()
        return yukie.queues.delete(message.member.guild.id)
      }
    };
    if (queue && message.guild.me.voice.channel === null) {
      if (queue.msg !== null) queue.msg.then(m => m.delete().catch(O_o => {}))
      await yukie.queues.delete(message.member.guild.id)
    };
<<<<<<< HEAD
    //
      const playingEmbed = require('../util/music/playingEmbed')
      const embed = await playingEmbed(song)
      msg = message.channel.send('<:playing_now:786551305514647563>** | Tocando agora:**', embed)
    //
=======
    const playerEmbed = require('../util/music/playerEmbed')
    const embed = await playerEmbed(song)
    msg = message.channel.send(`**Tocando agora:**`, embed);

>>>>>>> 57231454ed88dd551d6ba8522980d99d3c3e3d9d
    if (!queue) {
      const conn = await message.member.voice.channel.join();
      queue = {
        volume: 5,
        connection: conn,
        dispatcher: null,
        songs: [song],
        msg: msg,
      };
    };
    queue.dispatcher = await queue.connection.play(
      await ytdl(song.url, { highWaterMark: 1 << 25, filter: 'audioonly' }),
      /*{
        type: 'opus',
      }*/
    )
    .on("finish", () => {
      queue.songs.shift();
      player(yukie, message, queue.songs[0]);
      if (msg !== null) msg.then(m => m.delete().catch(O_o => {}))
    });
    queue.voiceChannel = message.member.voice.channel;
    yukie.queues.set(message.member.guild.id, queue);
  }
module.exports = {
  aliase: 'p tocar',
  help: 'a',
  run,
  player,
}
