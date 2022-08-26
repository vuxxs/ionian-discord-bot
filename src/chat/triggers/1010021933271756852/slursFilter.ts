import { GuildTextBasedChannel, Message } from "discord.js";
import { createLogEmbed, getGroupFromEnv } from "src/modules/common";

function daredevilSlursFilter(msg: Message) {
  if (msg.guild!.id !== "1010021933271756852") return;

  let isSlur = false;
  const content = msg.content.toLowerCase();
  const slurs = getGroupFromEnv("SLURS");

  if (!slurs)
    return console.log("ERROR: SLURS doesn't exist in env variables.");

  slurs.forEach((slur) => {
    if (content.includes(slur)) isSlur = true;
  });

  if (isSlur) {
    msg.delete().catch(() => {});
    if (msg.member!.roles.cache.get("1012093261306941545")) return;
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
