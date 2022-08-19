import { CommandParameters } from "src/modules/commands";
import { isVerified, musicFallback } from "src/modules/common";

function pause({ msg, client }: CommandParameters) {
  if (!client.musicCommands) musicFallback(msg);

  if (isVerified(msg.guild!.id)) musicFallback(msg);
}

pause.desc = "Pause / Unpause voice channel activity";
pause.category = "music";
export default pause;
