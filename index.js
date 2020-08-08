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
    if (count > 2) {
        responses = [
            "Too many mistakes for me to understand. :(",
            "https://www.spellingcity.com/spelling-games-vocabulary-games.html",
            "Please use english.",
            "wtf???",
            "Get gooder grammer pls",
            "No clue what that means, but I can tell you that it's wrong.",
            "Error: Maximum grammar errors exceeded!",
            "What?",
            "https://www.dictionary.com/",
            "Please resend that... but better.",
            "Please rethink what you just said.",
            "Please read before you hit send.",
            "MY EYES!!!",
            "Error: System overload! Shutting down...",
            "I can only assume you're still in kindergarden with that spelling",
        ];
        msg = responses[Math.floor(Math.random() * responses.length)];
    }
    return msg;
}

client.login(PRIVATE_CONFIG.botToken);
