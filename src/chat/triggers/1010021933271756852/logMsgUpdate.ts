import { GuildTextBasedChannel, Message } from "discord.js";
import { createLogEmbed } from "src/modules/common";

function daredevilMsgUpdateLog(msg: Message, oldMsg?: Message) {
  if (msg.guild!.id !== "1010021933271756852" || msg.author.bot) return;
  if (!oldMsg) return;
  if (msg.member!.roles.cache.get("1012093261306941545")) return;

  const channel = msg.guild!.channels.cache.get(
    "1012029657400492314"
  ) as GuildTextBasedChannel;
  if (channel) {
    const oldMessageEmbed = createLogEmbed(
      oldMsg,
      "**Edited Message** | Before"
    );
    const newMessageEmbed = createLogEmbed(msg, "**Edited Message** | After");
    channel.send({
      content: "**Message Edit**",
      embeds: [oldMessageEmbed, newMessageEmbed],
    });
  }
}

daredevilMsgUpdateLog.auto = true;
export default daredevilMsgUpdateLog;
