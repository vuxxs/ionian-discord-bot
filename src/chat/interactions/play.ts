import {
  ChatInputCommandInteraction,
  GuildMember,
  GuildTextBasedChannel,
  SlashCommandStringOption,
} from "discord.js";
import CustomClient from "src/modules/customClient";
import { queueTrack } from "src/modules/everyAPI";
import * as data from "../commands/play";

async function play(
  interaction: ChatInputCommandInteraction,
  client: CustomClient
) {
  await interaction.reply("Searching for your query..");
  const query = interaction.options.get("query", true).value as string; // To fix later couldn't be bothered with slash commands since the API is having some issues anyways
  queueTrack(client, query, {
    channel: interaction.channel as GuildTextBasedChannel,
    author: interaction.member as GuildMember,
    guild: interaction.guild!,
  });
}

const ops: SlashCommandStringOption[] = [];

ops.push(
  new SlashCommandStringOption()
    .setName("query")
    .setDescription("Your search terms")
    .setRequired(true)
);

play.desc = data.default.desc;
play.ops = ops;
export default play;
