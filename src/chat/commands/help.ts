import { EmbedBuilder } from "discord.js";
import {
  CommandParameters,
  commands as commands,
  getCommandDescriptions,
} from "src/modules/commands";

function help({ msg, client }: CommandParameters) {
  const embed = new EmbedBuilder();

  const completeDescription = getCommandDescriptions()
    .toString()
    .replace(/,/g, "\n");

  embed
    .setColor("DarkRed")
    .setTitle("List of all commands")
    .setDescription(completeDescription);

  msg.channel.send({ embeds: [embed] });
}

help.desc = `"Get some help"`;
export default help;
