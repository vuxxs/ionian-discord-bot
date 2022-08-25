import { GuildTextBasedChannel, Message } from "discord.js";
import { createLogEmbed } from "src/modules/common";

function daredevilSlursFilter(msg: Message) {
  if (msg.guild!.id !== "1010021933271756852") true;

  if (msg.member!.roles.cache.get("1012093261306941545")) return;

  let slur = false;
  const content = msg.content.toLowerCase();

  if (content.includes("nigg")) slur = true;
  if (content.includes("retard")) slur = true;
  if (content.includes("fagg")) slur = true;

  if (slur) {
    msg.delete().catch(() => {});
    const channel = msg.guild!.channels.cache.get(
      "1012029657400492314"
    ) as GuildTextBasedChannel;
    if (channel) {
      const embed = createLogEmbed(msg, "Sent a slur.");
      channel.send({ embeds: [embed] });
    }
  }
}

daredevilSlursFilter.auto = true;
export default daredevilSlursFilter;
