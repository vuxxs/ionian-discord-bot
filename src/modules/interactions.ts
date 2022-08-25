import {
  ChatInputCommandInteraction,
  SlashCommandStringOption,
} from "discord.js";
import play from "src/chat/interactions/play";
import reddit from "src/chat/interactions/reddit";
import CustomClient from "./customClient";

export const interactions: {
  [key: string]: ((
    interaction: ChatInputCommandInteraction,
    client: CustomClient
  ) => void) & {
    desc?: string;
    uni?: boolean;
    ops?: SlashCommandStringOption[];
  };
} = {
  reddit: reddit,
  play: play,
};
