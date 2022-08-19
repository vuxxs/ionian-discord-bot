import { CommandParameters } from "src/modules/commands";
import { isDev } from "src/modules/common";
import { getReddit } from "src/modules/everyAPI";
import devReddit from "src/chat/commands/dev/reddit";
async function reddit(parameters: CommandParameters) {
  if (isDev(parameters.msg.author.id) && parameters.args[0])
    return devReddit(parameters);
  const embed = await getReddit("all", parameters.msg);
  parameters.msg.channel.send({ embeds: [embed] });
}

reddit.desc = "Retrieve a Reddit post from r/all";
export default reddit;
