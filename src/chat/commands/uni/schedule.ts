import CommandParameters from "src/modules/commandParameters";
import { isUni } from "src/tools/common";

function schedule({ msg }: CommandParameters) {
  if (!msg.guild || !isUni(msg.guild.id)) return;
}

schedule.uni = true;
export default schedule;
