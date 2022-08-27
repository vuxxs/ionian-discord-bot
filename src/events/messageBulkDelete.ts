import { ChannelType, MessageType } from "discord.js";
import daredevilMsgDeleteLog from "src/chat/triggers/1010021933271756852/logMsgDelete";
import CustomClient from "src/modules/customClient";

export default (client: CustomClient): void => {
  client.on("messageDeleteBulk", async (messages) => {
    messages.forEach((message) => {
      setTimeout(() => {
        if (
          message.channel.type !== ChannelType.GuildText ||
          message.type !== MessageType.Default
        )
          return;
        daredevilMsgDeleteLog(message);
      }, 500);
    });
  });
};
