import { CommandParameters } from "src/modules/commands";
import { isDev } from "src/modules/common";

export function deleteClientAnnouncements({ msg, client }: CommandParameters) {
  if (!isDev(msg.author.id)) return;
  if (!client.announcements)
    return msg.channel.send("No client announcements found");

  client.announcements.forEach((announcement) => {
    announcement.delete();
  });
}

deleteClientAnnouncements.dev = true;
