import { Message } from "discord.js";

export default function randomYak(msg: Message) {
  if (msg.guild?.id !== "691667415444095056") return;

  if (Math.floor(Math.random() * 500) === 82) {
    msg.channel.send(
      "https://media.tenor.com/images/ddcc87e14e9e1bdb7a38e2d6bb73fa46/tenor.gif"
    );
  }
}
