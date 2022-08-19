import { Player } from "discord-player";
import { Client, Message } from "discord.js";

export default interface CustomClient extends Client {
  prefix?: string;
  announcements?: Message[];
  musicCommands?: boolean;
  player?: Player;
}
