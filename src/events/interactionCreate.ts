import CustomClient from "src/modules/customClient";
import { interactions } from "src/modules/interactions";

export default (client: CustomClient): void => {
  client.on("interactionCreate", async (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    interactions[interaction.commandName](interaction);
  });
};
