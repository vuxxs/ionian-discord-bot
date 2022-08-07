import { CommandParameters } from "src/modules/commands";

function ping({ msg, client }: CommandParameters) {
  msg.channel.send(`..pong! (${client.ws.ping}ms)`);
}

ping.desc = "Check my ping to the server.";
export default ping;
