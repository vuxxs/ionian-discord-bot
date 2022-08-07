import { Message } from "discord.js";

export default function rawr(msg: Message) {
  if (msg.guild?.id !== "691667415444095056") return;

  msg.channel.send(
    "https://cdn.discordapp.com/attachments/691556781272334347/694207970422161488/IMG_20191130_192321.jpg"
  );
}
