const tmi = require('tmi.js');
const fetch = require('node-fetch');

const SECRETS = require('./secrets');
// Define configuration options
const opts = {
    identity: {
        username: SECRETS.twitch.channelName,
        password: SECRETS.twitch.oAuthPassword
    },
    channels: [
        SECRETS.twitch.channelName
    ]
};

// Create a client with our options
const client = new tmi.client(opts);

// Register our event handlers (defined below)
client.on('message', onMessageHandler);
client.on('connected', onConnectedHandler);

// Connect to Twitch:
client.connect();

// if you are invisible in steam, this will return no lobby
async function getSteamAoeLobby() {
    return await fetch(`http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${SECRETS.steam.apiKey}&steamids=${SECRETS.steam.userId}`).then(async (response) => {
        const data = await response.json();
        const players = data.response.players;
        let result = `${players[0].personaname} does not have an open lobby.`;
        if (players[0] && players[0].lobbysteamid) {
            result = `steam://joinlobby/${SECRETS.steam.gameIds.aoe2de}/${players[0].lobbysteamid}/${SECRETS.steam.userId}`;
        }
        return result;
    }, (error) => {
        console.error('Error', error);
        return [];
    });
}

// Called every time a message comes in
function onMessageHandler(target, context, msg, self) {
    if (self) { return; } // Ignore messages from the bot
    // console.log(`target: ${target} msg: ${msg} self: ${self}`);
    // console.log('context:', context);

    // Remove whitespace from chat message
    const commandName = msg.trim();
    console.log('commandName', commandName);

    if (commandName.toLowerCase() === '!joinlobby') {
        getSteamAoeLobby().then((steamJoinLink) => {
            client.say(opts.channels[0], 'Copy and paste the below into your browser to join my game directly through steam!!');
            client.say(opts.channels[0], `${steamJoinLink}`);
        });
    }
}

// Called every time the bot connects to Twitch chat
function onConnectedHandler(addr, port) {
    console.log(`* Connected to ${addr}:${port}`);
}