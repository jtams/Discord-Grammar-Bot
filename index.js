const fs = require("fs");
const Discord = require("discord.js");
const GrammarBot = require("grammarbot");

let PRIVATE_CONFIG = JSON.parse(fs.readFileSync("./config/private.json")); //Includes bot token and api keys

const grammar = new GrammarBot({
    api_key: PRIVATE_CONFIG.apiKey, // (Optional) defaults to node_default
    language: "en-US", // (Optional) defaults to en-US
    base_uri: "api.grammarbot.io", // (Optional) defaults to api.grammarbot.io
});

client = new Discord.Client();

client.on("ready", () => {
    console.log("Grammar Bot Online");
});

client.on("message", (msg) => {
    if (msg.author.bot) return;
    grammar.check(msg.content, function (error, result) {
        if (!error) {
            corrections = getCorrection(result);
            if (corrections != "") {
                msg.channel.send(corrections);
            }
        }
    });
});

function getCorrection(data) {
    data = data.matches;
    msg = "";
    count = 0;
    data.forEach((match) => {
        if (msg != "") {
            msg += ", ";
        }
        if (match.rule.category.id != "CASING" && match.rule.issueType != "whitespace") {
            msg += match.replacements[0].value + "\\*";
            count++;
        }
    });
    if (msg == "*, *") msg = "";
    return msg;
}

client.login(PRIVATE_CONFIG.botToken);
