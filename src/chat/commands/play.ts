import { GuildTextBasedChannel } from "discord.js";
import { CommandParameters } from "src/modules/commands";
import { queueTrack } from "src/modules/everyAPI";

async function play({ msg, client, args }: CommandParameters) {
  const query = args.toString().replace(/,/g, " ");
  queueTrack(client, query, {
    channel: msg.channel as GuildTextBasedChannel,
    author: msg.member!,
    guild: msg.guild!,
  });
}

play.desc = "Play a song from YouTube in your current voice channel";
play.category = "music";
export default play;
