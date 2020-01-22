# Twitch Chat Steam Integration

## Install

1. Open an administrator command prompt.
-   Windows Key > cmd > Shift Right Click > Open as Administrator

2. Type `git clone https://github.com/Treee/twitch-chat-steam-integration`.
- If git cannot be found, download [64bit version for your OS](https://git-scm.com/downloads)
- Accept all defaults.

3. Type `cd twitch-chat-steam-integration`.

4. Type `npm install`
- If npm cannot be found, download [NodeJS LTS version](https://nodejs.org/en/).
- Reopen the administrator command prompt after installing and navigate to the `twitch-chat-steam-integration` folder. 

5. Find the `secrets.js` file and set the values.
- If these values are not set, the bot will not work.

    **Twitch**
- oAuthPassword

    - [Register Your Twitch App](https://dev.twitch.tv/console/apps/create).
    - Name: Name it something unique
    - OAuth Redirect Urls: **localhost**
    - `Do not share the generated oAuth token with anyone. This is how Twitch authenticates apps on their platform and if leaked can be used to mask malicious activity under your app.`
- channelName: Your channel name

    **Steam**
- ApiKey

    - [Register Your Steam App](https://steamcommunity.com/dev/apikey)
    - Domain Name: **localhost**
    - `Do not share the generated oAuth token with anyone. This is how Twitch authenticates apps on their platform and if leaked can be used to mask malicious activity under your app.`
- UserId:

    - [Search for your steam username](https://steamid.xyz/)
    - Copy `Steam64 ID`

6. Type `npm start`.

**The chat bot should be up and running if the steps were completed successfully**


## Modify

Line 52 in the file `index.js` looks like the following: `if (commandName.toLowerCase() === '!joinlobby')`.

!joinlobby is the command the bot is looking for when deciding to post the steam lobby join link. Change the value to whatever you want and relaunch the server using `npm start`.