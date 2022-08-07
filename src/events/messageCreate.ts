import { ChannelType, Message } from "discord.js";

import CustomClient from "../modules/customClient";
import CommandParameters from "../modules/commandParameters";

import ping from "../chat/commands/ping";
import reddit from "../chat/commands/reddit";

import announce from "../chat/commands/dev/announce";
import { deleteClientAnnouncements } from "../chat/commands/dev/deleteClientMessages";

// Global
import bruh from "../chat/triggers/bruh";
import chungus from "../chat/triggers/chungus";

// 691667415444095056
import bete from "../chat/triggers/691667415444095056/beter";
import george from "../chat/triggers/691667415444095056/george";
import randomYak from "../chat/triggers/691667415444095056/randomYakuza";
import rawr from "../chat/triggers/691667415444095056/rawr";
import spiros from "../chat/triggers/691667415444095056/spiros";
import theo from "../chat/triggers/691667415444095056/theo";

// 282450388408336387
import deleteNonUp from "../chat/triggers/282450388408336387/deleteNonUp";

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
  /* Global */
  bruh: bruh,
  chungus: chungus,
  chuggy: chungus,
  chungy: chungus,
  /* 691667415444095056 */
  bete: bete,
  pete: bete,
  george: george,
  rawr: rawr,
  spyro: spiros,
  spiro: spiros,
  σπύρο: spiros,
  σπυρο: spiros,
  theo: theo,
};

const auto_triggers = [
  /* 691667415444095056 */ randomYak,
  /* 282450388408336387 */ deleteNonUp,
];

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

    for (const auto_trigger of auto_triggers) auto_trigger(message);
  });
};
