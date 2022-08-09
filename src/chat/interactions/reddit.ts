import { ChannelType, ChatInputCommandInteraction } from "discord.js";
import { getReddit } from "src/modules/everyAPI";

export default async function reddit(interaction: ChatInputCommandInteraction) {
  const embed = await getReddit("all");
  interaction.reply("Sending post from r/all..");
  interaction.channel!.send({ embeds: [embed] });
}
