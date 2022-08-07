import { ChannelType } from "discord.js";
import { commands, runTriggers, triggers } from "src/modules/commands";
import CustomClient from "src/modules/customClient";

export default (client: CustomClient): void => {
  client.on("messageCreate", async (message) => {
    if (message.channel.type !== ChannelType.GuildText) return;

    // There should always be a prefix, unless you remove the value from index
    if (message.content.startsWith(client.prefix!)) {
      try {
        const args = message.content.toLowerCase().split(" ");
        const command = args.shift()!.slice(1);
        if (command)
          commands[command]({ msg: message, args: args, client: client });
      } catch (error) {
        // Command doesn't exist, or failed to execute. Fail silently.
      }
    }

    // Run triggers from modules, easier to use in other events.
    runTriggers(message);
  });
};
