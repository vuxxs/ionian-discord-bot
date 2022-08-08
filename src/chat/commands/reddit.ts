import { CommandParameters } from "src/modules/commands";
import { isDev } from "src/modules/common";
import { getReddit } from "src/modules/everyAPI";
import devReddit from "src/chat/commands/dev/reddit";
function reddit(parameters: CommandParameters) {
  if (isDev(parameters.msg.author.id) && parameters.args[0])
    return devReddit(parameters);
  getReddit("all", parameters.msg);
}

reddit.desc = "Retrieve a Reddit post from r/all";
export default reddit;
