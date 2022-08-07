import CommandParameters from "src/modules/commandParameters";
import { isUni } from "src/tools/common";

function portal({ msg }: CommandParameters) {
  if (!msg.guild || !isUni(msg.guild.id)) return;
}

portal.uni = true;
export default portal;
