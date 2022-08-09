import { ChannelType } from "discord.js";
import CustomClient from "src/modules/customClient";
import { interactions } from "src/modules/interactions";

export default (client: CustomClient): void => {
  client.on("interactionCreate", async (interaction) => {
    if (
      !interaction.isChatInputCommand() ||
      !interaction.channel ||
      !interaction.guild
    )
      return;

    if (interaction.channel.type === ChannelType.GuildText) {
      if (
        interaction.guild.members
          .me!.permissionsIn(interaction.channel)
          .has(["SendMessages", "ViewChannel"])
      ) {
        interactions[interaction.commandName](interaction);
      } else {
        interaction.reply(
          "Can't reply here! I can't view or write to this channel."
        );
      }
    }
  });
};
