import { ChatInputCommandInteraction } from "discord.js";
import { getReddit } from "src/modules/everyAPI";
import * as data from "../commands/reddit";

async function reddit(interaction: ChatInputCommandInteraction) {
  const embed = await getReddit("all");
  interaction.reply("Sending post from r/all..");
  interaction.channel!.send({ embeds: [embed] });
}

reddit.desc = data.default.desc;
export default reddit;
