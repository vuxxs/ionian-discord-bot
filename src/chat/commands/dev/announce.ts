import { Channel, ChannelType, EmbedBuilder, Guild } from "discord.js";
import { CommandParameters } from "src/modules/commands";
import { isDev } from "src/modules/common";
async function announce({ msg, client }: CommandParameters) {
  const args = msg.content.split(" ");
  args.shift()?.slice(1);
  if (!isDev(msg.author.id) || args.length === 0) return;

  const announcement = () => args.join(" ");
  const announcementOptions = [];
  const embed = new EmbedBuilder();

  // Check for options and remove them from the final message.
  while (true) {
    if (args[args.length - 1].startsWith("--")) {
      announcementOptions.push(args.pop()!.substring(2));
    } else {
      break;
    }
  }

  function getArgsURL(option: string) {
    const url = args.find((arg) => arg.startsWith("http"));
    if (url) return args.splice(args.indexOf(option), 1).toString(); // Remove the URL from the announcement and return it
  }
  if (announcementOptions.includes("link")) {
    const titleURL = getArgsURL("link");
    if (titleURL) embed.setURL(titleURL);
  }

  if (announcementOptions.includes("image")) {
    const imageURL = getArgsURL("image");
    if (imageURL) embed.setImage(imageURL);
  }

  // Create the announcement Embed
  embed
    .setTitle("Announcement")
    .setDescription(announcement())
    .setColor("#FF69B4")
    .setAuthor({
      name: msg.author.tag,
      iconURL: msg.author.displayAvatarURL(),
    });

  const guilds = client.guilds.cache.map((guild: Guild) =>
    client.guilds.cache.get(guild.id)
  );

  // Send the announcement in the first available channel of each guild
  announcements: for (const guild of guilds) {
    if (guild) {
      const channels = guild.channels.cache.map((channel: Channel) =>
        client.channels.cache.get(channel.id)
      );

      for (const channel of channels) {
        if (
          channel &&
          channel.type === ChannelType.GuildText &&
          guild.members.me &&
          guild.members.me.permissionsIn(channel).has("SendMessages")
        ) {
          // Check and apply announcement options
          if (announcementOptions.includes("plain")) {
            client.announcements!.push(await channel.send(announcement()));
          } else if (announcementOptions.includes("test")) {
            client.announcements!.push(
              await msg.channel.send({ embeds: [embed] })
            );
            break announcements;
          } else {
            client.announcements!.push(await channel.send({ embeds: [embed] }));
          }
          break;
        }
      }
    }
  }
}

announce.dev = true;
export default announce;
