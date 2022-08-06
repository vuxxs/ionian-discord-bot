import { Client, Message } from "discord.js";

export default interface CustomClient extends Client {
  prefix?: string;
  announcements?: Message[];
}
