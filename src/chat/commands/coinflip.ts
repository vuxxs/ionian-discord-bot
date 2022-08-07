import CommandParameters from "src/modules/commandParameters";

function coinflip({ msg }: CommandParameters) {
  msg.reply(Math.floor(Math.random() * 2) ? "Heads" : "Tails");
}

coinflip.desc = "Flip a coin";
export default coinflip;
