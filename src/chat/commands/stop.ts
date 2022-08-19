import { CommandParameters } from "src/modules/commands";
import { isVerified, musicFallback } from "src/modules/common";

function stop({ msg, client }: CommandParameters) {
  if (!client.musicCommands) return musicFallback(msg);

  if (isVerified(msg.guild!.id)) return musicFallback(msg);
  if (!client.player) return;

  const queue = client.player.getQueue(msg.guildId!);
  if (!queue || !queue.playing) {
    msg.channel.send("❌ | No music is being played!");
    return;
  }
  queue.destroy();
  msg.channel.send("🛑 | Stopped the player!");
}

stop.desc = "Kill the music playlist";
stop.category = "music";
export default stop;
