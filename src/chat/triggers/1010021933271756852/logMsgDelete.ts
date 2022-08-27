import { GuildTextBasedChannel, Message } from "discord.js";
import { createLogEmbed } from "src/modules/common";

function daredevilMsgDeleteLog(msg: Message) {
  if (msg.guild!.id !== "1010021933271756852") return;
  if (msg.member!.roles.cache.get("1012093261306941545")) return;

  const channel = msg.channel;
  if (channel) {
    const embed = createLogEmbed(msg, "**Deleted Message**");
    channel.send({ embeds: [embed] });
  }
}

daredevilMsgDeleteLog.auto = true;
export default daredevilMsgDeleteLog;
