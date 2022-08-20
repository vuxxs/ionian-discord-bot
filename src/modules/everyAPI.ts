import { QueryType } from "discord-player";
import {
  ChannelType,
  EmbedBuilder,
  Guild,
  GuildMember,
  GuildTextBasedChannel,
  Message,
} from "discord.js";
import fetch from "node-fetch";
import { isVerified, musicFallback } from "./common";
import CustomClient from "./customClient";

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

export async function queueTrack(
  client: CustomClient,
  query: string,
  {
    channel,
    guild,
    author,
  }: { channel: GuildTextBasedChannel; guild: Guild; author: GuildMember }
) {
  if (!client.musicCommands) return musicFallback(channel);

  if (isVerified(guild.id)) return musicFallback(channel);

  if (!client.player) return;
  const searchResult = await client.player
    .search(query, {
      requestedBy: author,
      searchEngine: QueryType.AUTO,
    })
    .catch(() => {});

  if (!searchResult || !searchResult.tracks.length) {
    channel.send(`No results for \`\`${query}\`\``);
    return;
  }

  const queue = client.player.createQueue(guild, {
    metadata: { channel: channel },
  });

  try {
    if (!queue.connection) await queue.connect(author.voice.channel!);
  } catch {
    void client.player.deleteQueue(guild.id);
    channel.send("Could not join your voice channel.");
    return;
  }

  searchResult.playlist
    ? queue.addTracks(searchResult.tracks)
    : queue.addTrack(searchResult.tracks[0]);
  if (!queue.playing) await queue.play();
}
