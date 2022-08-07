import CommandParameters from "src/modules/commandParameters";
import { isDev } from "src/tools/common";
import { getReddit } from "src/tools/everyAPI";
import devReddit from "./dev/reddit";
function reddit(parameters: CommandParameters) {
  if (isDev(parameters.msg.author.id) && parameters.args[0])
    return devReddit(parameters);
  getReddit("all", parameters.msg);
}

reddit.desc = "Retrieve a Reddit post from r/all";
export default reddit;
