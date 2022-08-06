import error from "./events/error";
import messageCreate from "./events/messageCreate";
import { Client } from "discord.js";
import CustomClient from "./modules/customClient";
import ready from "./events/ready";

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

client.login(process.env.TOKEN);
