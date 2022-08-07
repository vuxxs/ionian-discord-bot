import CommandParameters from "src/modules/commandParameters";
import { getReddit } from "../../../tools/everyAPI";
import { isDev } from "../../../tools/common";

async function devReddit({ msg, args }: CommandParameters) {
  if (!isDev(msg.author.id)) return; // This command is too dangerous to be kept alive
  getReddit(args[0], msg);
}

devReddit.dev = true;
export default devReddit;
