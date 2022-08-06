import { Client, ClientOptions } from "discord.js";

export default class CustomClient extends Client {
  prefix!: string;

  constructor(options: ClientOptions) {
    super(options);
  }
}
