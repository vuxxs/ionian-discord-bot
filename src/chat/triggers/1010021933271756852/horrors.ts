import { Message, MessageType } from "discord.js";

function horrors(msg: Message) {
  if (msg.guild!.id !== "1010021933271756852") return;

  if (msg.channel.id !== "1010252610495840296") return;

  if (msg.type === MessageType.Reply) return;

  setTimeout(() => {
    if (msg.attachments.size === 0 && msg.embeds.length === 0)
      msg.delete().catch(() => {});
  }, 500);
}

horrors.auto = true;
export default horrors;
