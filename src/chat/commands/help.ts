import { EmbedBuilder } from "discord.js";
import { CommandParameters, commands as commands } from "src/modules/commands";

function help({ msg, client }: CommandParameters) {
  const embed = new EmbedBuilder();
  const commandKeys = Object.keys(commands);

  const completeLine: string[] = [];
  const commandDescriptions: string[] = [];
  commandKeys.forEach((key) => {
    const command = commands[key];
    if (!command.desc) return; // If there's no description, it's probably a dev command so skip it
    if (commandDescriptions.includes(command.desc)) return; // If it's a duplicate it's just another prefix for the command, skip it.
    commandDescriptions.push(command.desc);
    completeLine.push(`${key}: ${command.desc}`);
  });
  const completeDescription = completeLine.toString().replace(/,/g, "\n");

  embed
    .setColor("DarkRed")
    .setTitle("List of all commands")
    .setDescription(completeDescription);

  msg.channel.send({ embeds: [embed] });
}

help.desc = "Get some help.";
export default help;
