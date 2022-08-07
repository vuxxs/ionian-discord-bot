import { Message } from "discord.js";

export default function george(msg: Message) {
  if (msg.guild?.id !== "691667415444095056") return;

  const images = [
    "https://media.discordapp.net/attachments/691703897236045846/859896756380762133/Screenshot_2021-06-30-23-38-22-48.jpg",
    "https://media.discordapp.net/attachments/691703897236045846/859896756090306580/Screenshot_2021-06-30-23-30-41-17.jpg",
  ];

  msg.channel.send(images[Math.floor(Math.random() * images.length)]);
}
