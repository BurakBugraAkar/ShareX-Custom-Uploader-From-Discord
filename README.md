# ShareX-Custom-Uploader-From-Discord

```shell
First

npm install || npm i || npm i discord.js, express, request, shortid, wio.db
```

EN
ShareX will save the pictures you have taken with discord and show them through your own site.

TR
ShareX ile çekmiş olduğunuz resimleri discorda kaydederek kendi siteniz aracılığı ile gösterir.


```js
File -> config.js
{
    "port": "80", -> Express server port
    "api_key": "pass", -> ShareX post password
    "discord_bot_token": "token", -> Discord bot token
    "guild": {
        "id": "guild_id", -> Discord server guild id
        "webhook": {
            "wehbook_id": "id", -> Webhook id
            "webhook_token": "token" -> Webhook token
        },
        "channel": {
            "image_log": "channel_id", -> İmage log channel id
            "ip_log": "channel_id" -> İp log channel id
        }
    }
}
```

Output
https://ryuk.fun/ivjjJ5Msw.png
https://ryuk.fun/04hiyqqpW.png


#information
```cmd
1. Works with Express server.
2. Main file is api.mjs
3. This project supports ES Next.
4. Required modules discord.js, express, request, shortid, wio.db.
```

#Updates
```
-> Soon!
```
