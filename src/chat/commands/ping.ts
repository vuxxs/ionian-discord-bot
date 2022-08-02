import { Message } from "discord.js";

function ping(msg: Message) {
  msg.channel.send("..pong!");
}

export default ping;
