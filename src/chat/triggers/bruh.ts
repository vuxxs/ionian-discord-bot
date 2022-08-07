import { Message } from "discord.js";

export default function bruh(msg: Message) {
  if (msg.content.toLowerCase() === "bruh") msg.channel.send("ｂｒｕｈ");
}
