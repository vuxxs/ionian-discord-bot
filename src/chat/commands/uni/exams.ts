import { CommandParameters } from "src/modules/commands";
import { isUni } from "src/tools/common";

function exams({ msg }: CommandParameters) {
  if (!msg.guild || !isUni(msg.guild.id)) return;
}

exams.uni = true;
export default exams;
