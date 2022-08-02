import { Client, EmbedBuilder, Message } from "discord.js";
import { isAdmin } from "../../../tools/common";

function announce(msg: Message, args: string[], client: Client) {
  if (!isAdmin(msg.author.id)) return;

  const announcement = () => args.join(" ");
  const announcement_options = [];

  // Check for options and remove them from the final message.
  while (true) {
    if (args[args.length - 1].startsWith("--")) {
      announcement_options.push(args.pop()?.substring(2).toLowerCase());
    } else {
      break;
    }
  }

  if (announcement_options.includes("plain")) {
    msg.channel.send(announcement());
    return;
  } // Executing this option outside of the option loop because it overrides every other option.

  const unknown_options = [];
  for (const option of announcement_options) {
    if (option === "test") {
      msg.channel.send(
        "Executing test command and doing nothing useful here.."
      );
    } else {
      unknown_options.unshift(option);
    }
  }

  if (unknown_options.length > 0) {
    msg.channel.send(
      `Unknown options: "${unknown_options.join(", ")}".` +
        " " +
        "Cancelling the announcement."
    );
    return; // Don't send the announcement in case of a wrong option.
  }

  const embed = new EmbedBuilder()
    .setTitle(announcement())
    .setColor("#FF69B4")
    .setAuthor({
      name: msg.author.username,
      iconURL: msg.author.displayAvatarURL(),
    });
  msg.channel.send({ embeds: [embed] });
}

announce.admin = true;
export default announce;
