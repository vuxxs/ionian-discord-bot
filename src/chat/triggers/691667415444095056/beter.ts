import { Message } from "discord.js";

export default function bete(msg: Message) {
  if (msg.guild?.id !== "691667415444095056") return;
  msg.channel.send(
    "https://cdn.discordapp.com/attachments/691667415444095059/757979704966905977/IMG_20181007_123439.jpg"
  );
}
