import { CommandParameters } from "src/modules/commands";
import { getReddit } from "src/modules/everyAPI";
import { isDev } from "src/modules/common";

async function devReddit({ msg, args }: CommandParameters) {
  if (!isDev(msg.author.id)) return; // This command is too dangerous to be kept alive
  const embed = await getReddit(args[0], msg);
  msg.channel.send({ embeds: [embed] });
}

devReddit.dev = true;
export default devReddit;
