import { Channel, ChannelType, EmbedBuilder, Guild } from "discord.js";
import { CommandParameters } from "src/modules/commands";
import { isDev } from "src/tools/common";

async function announce({ msg, args, client }: CommandParameters) {
  if (!isDev(msg.author.id) || args.length === 0) return;

  const announcement = () => args.join(" ");
  const announcement_options = [];

  // Check for options and remove them from the final message.
  while (true) {
    if (args[args.length - 1].startsWith("--")) {
      announcement_options.push(args.pop()?.substring(2).toLowerCase());
    } else {
      break;
    }
  }

  // Create the announcement Embed
  const embed = new EmbedBuilder()
    .setTitle(announcement())
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
          if (announcement_options.includes("plain")) {
            channel.send(announcement());
          } else if (
            announcement_options.includes("image") ||
            announcement_options.includes("img") ||
            announcement_options.includes("picture") ||
            announcement_options.includes("pic")
          ) {
            if (
              announcement().startsWith("http:") ||
              announcement().startsWith("https:")
            ) {
              embed.setTitle(null).setImage(announcement().toString());
              client.announcements?.push(
                await channel.send({ embeds: [embed] })
              );
            } else {
              msg.channel.send("Invalid Image URL");
              break announcements;
            }
          } else if (announcement_options.includes("test")) {
            msg.channel.send({ embeds: [embed] });
            break announcements;
          } else {
            client.announcements?.push(await channel.send({ embeds: [embed] }));
          }
          break;
        }
      }
    }
  }
}

announce.dev = true;
export default announce;
