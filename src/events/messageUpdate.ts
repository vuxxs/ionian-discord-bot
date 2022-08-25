import { Message, MessageType } from "discord.js";
import { runTriggers } from "src/modules/commands";
import CustomClient from "src/modules/customClient";

export default (client: CustomClient): void => {
  client.on("messageUpdate", (oldMessage, newMessage) => {
    if (newMessage.type === MessageType.Default)
      runTriggers(newMessage, "messageUpdate", oldMessage as Message);
  });
};
