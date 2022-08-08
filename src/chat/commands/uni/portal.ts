import { CommandParameters } from "src/modules/commands";
import { isUni } from "src/modules/common";

function portal({ msg }: CommandParameters) {
  if (!msg.guild || !isUni(msg.guild.id)) return;
}

portal.uni = true;
export default portal;
