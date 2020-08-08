const fs = require("fs");
const Discord = require("discord.js");

let PRIVATE_CONFIG = JSON.parse(fs.readFileSync("./config/private.json")); //Includes bot token and api keys

client = new Discord.Client();

client.on("ready", () => {
    console.log("Bot Online");
});

client.on("message", (msg) => {
    if (msg.author.bot) return;
});

client.login(BOT.token);
