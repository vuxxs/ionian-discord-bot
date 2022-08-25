import { Guild, GuildTextBasedChannel } from "discord.js";
import { CommandParameters } from "src/modules/commands";
import { isVerified, musicFallback } from "src/modules/common";

async function skip({ msg, client }: CommandParameters) {
  if (!client.musicCommands && !isVerified(msg.guild!.id))
    return musicFallback(msg.channel as GuildTextBasedChannel);

  if (!client.player) return;

  const queue = client.player.getQueue(msg.guildId!);
  if (!queue || !queue.playing) {
    msg.channel.send("❌ | No music is being played!");
    return;
  }

  const currentTrack = queue.current;
  const success = queue.skip();
  msg.channel.send(
    success ? `✅ | Skipped **${currentTrack}**!` : "❌ | Something went wrong!"
  );
}

skip.desc = "Skip the current song";
skip.category = "music";
export default skip;
