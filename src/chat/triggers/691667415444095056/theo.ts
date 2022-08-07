import { Message } from "discord.js";

export default function theo(msg: Message) {
  if (msg.guild?.id !== "691667415444095056") return;

  const images = [
    "https://cdn.discordapp.com/attachments/691667415444095059/803257640150630450/received_10203870073027765.jpeg",
    "https://i.imgur.com/X3TdT73.png",
    "https://cdn.discordapp.com/attachments/655037262253391873/694193625784909824/Screenshot_20200330_173732.jpg",
    "https://cdn.discordapp.com/attachments/655037262253391873/694193473242398801/Screenshot_20200330_173643_com.android.gallery3d.jpg",
    "https://cdn.discordapp.com/attachments/655037262253391873/694193106681331792/IMG_20200330_173527.jpg",
    "https://cdn.discordapp.com/attachments/655037262253391873/694208322135392466/IMG_20200330_183531.jpg",
    "https://cdn.discordapp.com/attachments/692801905575067708/694211274795647056/Screenshot_20200330_184722.jpg",
    "https://cdn.discordapp.com/attachments/633271811697803304/694192153005523004/IMG_20200330_173133.jpg",
  ];

  msg.channel.send(images[Math.floor(Math.random() * images.length)]);
}
