import ready from "./events/ready";
import error from "./events/error";
import messageCreate from "./events/messageCreate";
import CustomClient from "./modules/customClient";
require("dotenv").config();

console.log("Bot is starting...");

const client = new CustomClient({
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

// Run events
error(client);
ready(client);
messageCreate(client);

client.login(process.env.TOKEN);
