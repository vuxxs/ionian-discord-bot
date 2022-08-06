import { ChannelType, Message } from "discord.js";

import ping from "../chat/commands/ping";
import reddit from "../chat/commands/reddit";

import theo from "../chat/triggers/theo";

import announce from "../chat/commands/dev/announce";
import { deleteClientAnnouncements } from "../chat/commands/dev/deleteClientMessages";

import CustomClient from "../modules/customClient";
import CommandParameters from "../modules/commandParameters";

const commands: {
  [key: string]: ({ msg, args, client }: CommandParameters) => void;
} = {
  ping: ping,
  reddit: reddit,
  announce: announce,
  "de-announce": deleteClientAnnouncements,
};

const triggers: {
  [key: string]: (msg: Message) => void;
} = {
  theo: theo,
};

export default (client: CustomClient): void => {
  client.on("messageCreate", async (message: Message) => {
    if (message.author.bot || message.channel.type !== ChannelType.GuildText)
      return;

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

    for (const trigger in triggers) {
      if (message.content.toLowerCase().indexOf(trigger) !== -1) {
        triggers[trigger](message);
      }
    }
  });
};
