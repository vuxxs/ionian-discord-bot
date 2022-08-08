import { ChatInputCommandInteraction } from "discord.js";
import reddit from "src/chat/interactions/reddit";

export const interactions: {
  [key: string]: ((interaction: ChatInputCommandInteraction) => void) & {
    uni?: boolean;
  };
} = {
  reddit: reddit,
};
