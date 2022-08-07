import { CommandParameters } from "src/modules/commands";
import { isUni } from "src/tools/common";

function portal({ msg }: CommandParameters) {
  if (!msg.guild || !isUni(msg.guild.id)) return;
}

portal.uni = true;
export default portal;
