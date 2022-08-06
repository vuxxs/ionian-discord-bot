import { Message } from "discord.js";
import CustomClient from "./customClient";

export default interface CommandParameters {
  client: CustomClient;
  msg: Message;
  args: string[];
}
