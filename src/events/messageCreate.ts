import { ChannelType, Client, Message } from "discord.js";
import reddit from "../chat/commands/reddit";
import ping from "../chat/commands/ping";
import theo from "../chat/triggers/theo";
import announce from "../chat/commands/dev/announce";

const prefix = ".";

const commands: { [key: string]: ((message: Message) => void) | any } = {
  ping: ping,
  reddit: reddit,
  announce: announce,
};

const triggers: { [key: string]: (message: Message) => void } = {
  theo: theo,
};

export default (client: Client): void => {
  client.on("messageCreate", async (message: Message) => {
    if (message.author.bot || message.channel.type !== ChannelType.GuildText)
      return;

    if (message.content.startsWith(prefix)) {
      try {
        const args = message.content.toLowerCase().split(" ");
        const command = args.shift()?.slice(1);
        if (command) commands[command](message, args, { client });
      } catch (error) {
        // Command doesn't exist, or failed to execute. Fail silently.
      }
    }

    for (const trigger in triggers) {
      if (message.content.toLowerCase().indexOf(trigger) !== -1) {
        triggers[trigger](message);
      }
    }
  });
};
