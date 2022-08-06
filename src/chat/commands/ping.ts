import CommandParameters from "src/modules/commandParameters";

function ping({ msg }: CommandParameters) {
  msg.channel.send("..pong!");
}

export default ping;
