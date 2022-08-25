import { EmbedBuilder, GuildTextBasedChannel, Message } from "discord.js";

function isAnything(groupName: string, id: string) {
  if (!process.env[groupName]) {
    console.log("ERROR! Can't locate groups in enviromental variables.");
    console.log(`in ${__dirname}`);
    console.log(`at ${__filename}`);
    return;
  }
  const group = process.env[groupName]!.split(".");
  return group?.includes(id);
}

export const isUni = (id: string) => isAnything("UNI", id);

export const isDev = (id: string) => isAnything("DEV", id);

export const isVerified = (id: string) => isAnything("VERIFIED", id);

export function musicFallback(channel: GuildTextBasedChannel) {
  channel.send(
    "Music commands are globally disabled, they were never meant to be a working feature cause Google is acting mad sus over using them"
  );
}

export function createLogEmbed(msg: Message, description: string) {
  const embed = new EmbedBuilder();
  embed.setAuthor({
    name: msg.author.tag,
    iconURL: msg.author.displayAvatarURL(),
  });
  embed.setTitle(description);
  embed.setDescription(`${msg.content} | <#${msg.channel.id}>`);
  embed.setColor("DarkGrey");
  return embed;
}
