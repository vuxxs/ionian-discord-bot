import { ActivityType } from "discord.js";
import CustomClient from "src/modules/customClient";
import registerSlashCommands from "src/modules/registerSlashCommands";

export default (client: CustomClient): void => {
  client.on("ready", async () => {
    client.user?.setActivity({
      type: ActivityType.Watching,
      name: `${client.prefix}help`,
    });
    console.log(`${client.user?.username} is online`);
    registerSlashCommands(client);
  });
};
