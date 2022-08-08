import { CommandParameters } from "src/modules/commands";
import { isDev } from "src/modules/common";

export function deleteClientAnnouncements({ msg, client }: CommandParameters) {
  if (!isDev(msg.author.id)) return;

  if (!client.announcements || client.announcements.length === 0)
    return msg.channel.send("No client announcements found");

  client.announcements.forEach((announcement) => {
    if (announcement.deletable) announcement.delete();
  });
}

deleteClientAnnouncements.dev = true;
