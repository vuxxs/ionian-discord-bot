import { Message } from "discord.js";

import CustomClient from "src/modules/customClient";

import help from "src/chat/commands/help";
import ping from "src/chat/commands/ping";
import coinflip from "src/chat/commands/coinflip";
import reddit from "src/chat/commands/reddit";

import announce from "src/chat/commands/dev/announce";
import { deleteClientAnnouncements } from "src/chat/commands/dev/deleteClientMessages";

// Global
import bruh from "src/chat/triggers/bruh";
import chungus from "src/chat/triggers/chungus";
import play from "src/chat/commands/play";
import pause from "src/chat/commands/pause";
import skip from "src/chat/commands/skip";
import stop from "src/chat/commands/stop";

// 691667415444095056
import bete from "src/chat/triggers/691667415444095056/beter";
import george from "src/chat/triggers/691667415444095056/george";
import randomYak from "src/chat/triggers/691667415444095056/randomYakuza";
import rawr from "src/chat/triggers/691667415444095056/rawr";
import spiros from "src/chat/triggers/691667415444095056/spiros";
import theo from "src/chat/triggers/691667415444095056/theo";

// 282450388408336387
import deleteNonUp from "src/chat/triggers/282450388408336387/deleteNonUp";
import cube from "src/chat/triggers/282450388408336387/cube";
import deleteInvites from "src/chat/triggers/1010021933271756852/deleteInvites";
import horrors from "src/chat/triggers/1010021933271756852/horrors";
import welcomeDaredevil from "src/chat/triggers/1010021933271756852/welcome";

export const commands: {
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
  play: play,
  p: play,
  pause: pause,
  skip: skip,
  s: skip,
  stop: stop,
  die: stop,
  /* Dev */
  announce: announce,
  "de-announce": deleteClientAnnouncements,
};

export const triggers: {
  [key: string]: ((msg: Message) => void) & {
    auto?: boolean;
    bot?: boolean;
    events?: string[];
    eventExclusive?: boolean;
  };
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
  cube: cube,
  /* 1010021933271756852 */
  deleteInvites: deleteInvites,
  horrors: horrors,
  welcomeDareDevil: welcomeDaredevil,
};

export function runTriggers(msg: Message, event?: string) {
  for (const index in triggers) {
    const trigger = triggers[index];

    // Check if the trigger belongs to an event
    if (trigger.events && event) {
      if (!trigger.events.includes(event)) continue;
      if (trigger.eventExclusive) continue;
    }

    // Check if the trigger allows bots when the author is a bot.
    if (msg.author.bot) {
      if (!trigger.bot) continue;
    }

    if (trigger.auto) {
      trigger(msg); // Execute automatic triggers and skip other checks
    } else {
      // If it's not an auto trigger, try reading every other trigger.
      if (msg.content.toLowerCase().indexOf(index) !== -1) {
        trigger(msg);
      }
    }
  }
}

export function getCommandDescriptions() {
  const commandKeys = Object.keys(commands);

  const completeDescriptions: string[] = [];
  const commandDescriptions: string[] = [];
  commandKeys.forEach((key) => {
    const command = commands[key];
    if (!command.desc) return; // If there's no description, it's probably a dev command so skip it
    if (commandDescriptions.includes(command.desc)) return; // If it's a duplicate it's just another prefix for the command, skip it.
    commandDescriptions.push(command.desc);
    completeDescriptions.push(`${key}: ${command.desc}`);
  });

  return completeDescriptions;
}

export interface CommandParameters {
  client: CustomClient;
  msg: Message;
  args: string[];
}

export interface Command {
  desc: string;
  dev?: boolean;
  uni?: boolean;
  bots?: boolean;
}
