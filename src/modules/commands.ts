import { Message } from "discord.js";
import CustomClient from "./customClient";

export interface CommandParameters {
  client: CustomClient;
  msg: Message;
  args: string[];
}

export interface Command {
  desc: string;
  dev?: boolean;
  uni?: boolean;
  bots?: boolean;
}
