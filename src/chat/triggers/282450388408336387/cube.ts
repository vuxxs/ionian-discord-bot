import { Message } from "discord.js";

function cube(msg: Message) {
  if (msg.guild?.id !== "282450388408336387") return;

  msg.channel.send("Ladies love it");
}
export default cube;

// This command is a reference to the freeze-self Wizard spell in World of Warcraft and an amazing level-up adventure I had with a friend from this server.
