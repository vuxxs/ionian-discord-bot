import { Client, Guild, SlashCommandBuilder } from "discord.js";
import { commands } from "src/modules/commands";
import { isUni } from "./common";

const { REST } = require("@discordjs/rest");
import { Routes } from "discord-api-types/v10";
import { interactions } from "./interactions";

export default async function registerSlashCommands(client: Client) {
  const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);
  console.log("Trying to refresh application (/) commands...");
  try {
    const guilds = client.guilds.cache.map((guild: Guild) =>
      client.guilds.cache.get(guild.id)
    );

    const interactionKeys = Object.keys(interactions);

    const slashCommands: SlashCommandBuilder[] = [];
    const slashCommandsUni: SlashCommandBuilder[] = [];
    interactionKeys.forEach(async (key) => {
      const interaction = commands[key];
      if (!interaction.desc) return;
      const slashCommand = new SlashCommandBuilder()
        .setName(key)
        .setDescription(interaction.desc);

      if (!interaction.uni) {
        let duplicate = false;
        for (const slashCommand of slashCommands) {
          if (slashCommand.description === interaction.desc) {
            duplicate = true;
            break;
          }
        }
        if (!duplicate) slashCommands.push(slashCommand);
      }

      if (interaction.uni) {
        slashCommandsUni.push(slashCommand);
      }
    });

    if (client.user)
      await rest.put(Routes.applicationCommands(client.user.id), {
        body: slashCommands,
      });

    guilds.forEach(async (guild) => {
      if (!guild || !client.user) return;
      if (!isUni(guild.id)) return;
      if (
        !guild.members.me ||
        !guild.members.me.permissions.has("UseApplicationCommands")
      )
        await rest.put(
          Routes.applicationGuildCommands(client.user.id, guild.id),
          {
            body: slashCommandsUni,
          }
        );
    });

    console.log("Finished refreshing application (/) commands.");
  } catch (err) {
    console.log(`ERROR! Failed to refresh application (/) commands:\n ${err}`);
  }
}
