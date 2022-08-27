import { GuildTextBasedChannel, Message } from "discord.js";
import { createLogEmbed } from "src/modules/common";

function deleteInvites(msg: Message) {
  if (msg.guild!.id !== "1010021933271756852") return;

  if (
    msg.member!.permissions.has("Administrator") ||
    msg.member!.roles.cache.get("1012093261306941545") /* Moderator role */
  )
    return;

  const content = msg.content.toLowerCase();

  if (
    content.startsWith("https://discord.gg/") ||
    content.startsWith("discord.gg/")
  ) {
    msg.delete();
    const channel = msg.guild!.channels.cache.get(
      "1012029657400492314"
    ) as GuildTextBasedChannel;
    if (channel) {
      const embed = createLogEmbed(msg, "**Censored Message**");
      channel.send({ embeds: [embed] });
    }
  }
}

deleteInvites.auto = true;
export default deleteInvites;
