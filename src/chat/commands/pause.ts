import { CommandParameters } from "src/modules/commands";
import { isVerified, musicFallback } from "src/modules/common";

function pause({ msg, client }: CommandParameters) {
  if (!client.musicCommands) return musicFallback(msg);

  if (isVerified(msg.guild!.id)) return musicFallback(msg);
}

pause.desc = "Pause / Unpause voice channel activity";
pause.category = "music";
export default pause;
