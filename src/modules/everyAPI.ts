import {
  ChannelType,
  EmbedBuilder,
  Interaction,
  InteractionType,
  Message,
} from "discord.js";
import fetch from "node-fetch";
import { isDev } from "./common";

async function fetchURL(url: string) {
  const response: any = await fetch(url);
  return await response.json();
}

export async function getReddit(sub: String, msg?: Message) {
  const url = `https://meme-api.herokuapp.com/gimme/${sub}`;
  const embed = new EmbedBuilder();

  let data = await fetchURL(url);
  if (data.message) data.title = data.message; // Yeah this works for now

  if (
    msg &&
    msg.channel &&
    msg.channel.type === ChannelType.GuildText &&
    !msg.channel.nsfw &&
    data.nsfw
  ) {
    [...Array(5)].every(async () => {
      data = await fetchURL(url);
      return data.nsfw;
    });

    if (data.nsfw) {
      data = {};
      data.title = "NSFW Post in NON-NSFW channel. (Impossible)";
      data.url = "https://c.tenor.com/9PTGVf4BLwYAAAAM/crying-emoji-dies.gif";
    }
  }
  embed
    .setColor("#FF5700")
    .setTitle(data.title)
    .setImage(data.url)
    .setURL(data.postLink);
  if (data.subreddit) {
    embed
      .setAuthor({ name: `u/${data.author} at r/${data.subreddit}` })
      .setFooter({ text: `${data.ups} upvotes.` });
  }

  return embed;
}
