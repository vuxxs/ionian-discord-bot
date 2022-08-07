import { CommandParameters } from "src/modules/commands";

function help({ msg }: CommandParameters) {
  msg.channel.send("Help command lmao");
}

help.desc = "Get some help.";
export default help;
