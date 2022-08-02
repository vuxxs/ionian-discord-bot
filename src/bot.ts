import { Client } from "discord.js";
import ready from "./events/ready";
import error from "./events/error";
import messageCreate from "./events/messageCreate";
require("dotenv").config();

console.log("Bot is starting...");

const client = new Client({
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

// Run events
error(client);
ready(client);
messageCreate(client);

client.login(process.env.TOKEN);
