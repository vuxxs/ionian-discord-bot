import { Message } from "discord.js";

function welcomeDaredevil(msg: Message) {
  if (msg.guild!.id !== "1010021933271756852") return;

  if (msg.channel.id !== "1010021933720551496") return;

  if (msg.content.toLowerCase() === "elegant sux") {
    msg.channel.send(
      `Alright, just kidding. You still have to wait for someone to let you in but thanks for reading the rules 👍`
    );
  }
}

welcomeDaredevil.auto = true;
export default welcomeDaredevil;
