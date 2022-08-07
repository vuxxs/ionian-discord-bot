import { ChannelType, Message } from "discord.js";

import CustomClient from "src/modules/customClient";
import { CommandParameters } from "src/modules/commands";

import help from "src/chat/commands/help";
import ping from "src/chat/commands/ping";
import coinflip from "src/chat/commands/coinflip";
import reddit from "src/chat/commands/reddit";

import announce from "src/chat/commands/dev/announce";
import { deleteClientAnnouncements } from "src/chat/commands/dev/deleteClientMessages";

// Global
import bruh from "src/chat/triggers/bruh";
import chungus from "src/chat/triggers/chungus";

// 691667415444095056
import bete from "src/chat/triggers/691667415444095056/beter";
import george from "src/chat/triggers/691667415444095056/george";
import randomYak from "src/chat/triggers/691667415444095056/randomYakuza";
import rawr from "src/chat/triggers/691667415444095056/rawr";
import spiros from "src/chat/triggers/691667415444095056/spiros";
import theo from "src/chat/triggers/691667415444095056/theo";

// 282450388408336387
import deleteNonUp from "src/chat/triggers/282450388408336387/deleteNonUp";

const commands: {
  [key: string]: (({ msg, args, client }: CommandParameters) => void) & {
    desc?: string;
    bot?: boolean;
    uni?: boolean;
    admin?: boolean;
    dev?: boolean;
  };
} = {
  ping: ping,
  coinflip: coinflip,
  cf: coinflip,
  help: help,
  h: help,
  reddit: reddit,
  r: reddit,
  /* Dev */
  announce: announce,
  "de-announce": deleteClientAnnouncements,
};

const triggers: {
  [key: string]: ((msg: Message) => void) & { auto?: boolean; bot?: boolean };
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
  randomYakuza: randomYak,
  /* 282450388408336387 */
  deleteNonUp: deleteNonUp,
};

export default (client: CustomClient): void => {
  client.on("messageCreate", async (message: Message) => {
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

    for (const trigger in triggers) {
      // Check if the trigger allows bots when the author is a bot.
      if (message.author.bot) {
        if (!triggers[trigger].bot) continue;
      }

      if (triggers[trigger].auto) {
        triggers[trigger](message); // Execute automatic triggers and skip other checks
      } else {
        // If it's not an auto trigger, try reading every other trigger.
        if (message.content.toLowerCase().indexOf(trigger) !== -1) {
          triggers[trigger](message);
        }
      }
    }
  });
};
