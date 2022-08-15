import { Client } from "discord.js";
import error from "src/events/error";
import messageCreate from "src/events/messageCreate";
import CustomClient from "src/modules/customClient";
import ready from "src/events/ready";
import messageUpdate from "./events/messageUpdate";
import interactionCreate from "./events/interactionCreate";
import guildCreate from "./events/guildCreate";
import guildDelete from "./events/guildDelete";
require("dotenv").config();

console.log("Bot is starting...");

const client: CustomClient = new Client({
  intents: [
    "DirectMessageReactions",
    "DirectMessageTyping",
    "DirectMessages",
    "GuildBans",
    "GuildEmojisAndStickers",
    "GuildIntegrations",
    "GuildInvites",
    "GuildMembers",
    "GuildMessageReactions",
    "GuildMessageTyping",
    "GuildMessages",
    "GuildPresences",
    "GuildScheduledEvents",
    "GuildVoiceStates",
    "GuildWebhooks",
    "Guilds",
    "MessageContent",
  ],
});

client.prefix = ".";
client.announcements = [];

// Run events
error(client);
ready(client);
messageCreate(client);
messageUpdate(client);
interactionCreate(client);
guildCreate(client);
guildDelete(client);

client.login(process.env.TOKEN);
