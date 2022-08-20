import { GuildTextBasedChannel } from "discord.js";
import { CommandParameters } from "src/modules/commands";
import { isVerified, musicFallback } from "src/modules/common";

function pause({ msg, client }: CommandParameters) {
  if (!client.musicCommands && !isVerified(msg.guild!.id))
    return musicFallback(msg.channel as GuildTextBasedChannel);
}

pause.desc = "Pause / Unpause voice channel activity";
pause.category = "music";
export default pause;
