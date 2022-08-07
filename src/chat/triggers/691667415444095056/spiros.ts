import { Message } from "discord.js";

export default function spiros(msg: Message) {
  if (msg.guild?.id !== "691667415444095056") return;

  const texts = [
    "https://cdn.discordapp.com/attachments/691667415444095059/803220384722714684/Screenshot_20210125-111000.png",
    "https://cdn.discordapp.com/attachments/691667415444095059/803220384722714684/Screenshot_20210125-111000.png",
    "Ο σπύρος είναι",
  ];

  msg.channel.send(texts[Math.floor(Math.random() * texts.length)]);
}
