//to read from .txt file
const fs = require('node:fs');
const path = require('node:path')
const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');
require('dotenv').config()

// convert textFile into array 
const data = fs.readFileSync('./roomInfoScraper/room_schedule.txt', 'utf-8').split('\n');

//Initialize roomData dictionary to hold all roomData
const roomData = {};

for (i = 0; i < data.length; i++){

    // data[i] = data[i].replace('[', '').trim();
    // data[i] = data[i].replace(']', '').trim()
    data[i] = data[i].replace('[', '').replace(']', '').trim();

    
    const [room, time, day] = data[i].split(',').map(item => item.trim().replace(/'/g, ''));

    if(!roomData[room]){
        roomData[room] = []
    }
    roomData[room].push({day, time})

}

function getScheduleForRoomAndDay(room, day) {
    // Check if the room exists in the dictionary
    if (roomData[room]) {

      // Filter the time objects for the specified day
      const timesForDay = roomData[room]
      .filter(schedule => schedule.day === day)
      .map(schedule => schedule.time);
    
      return timesForDay;
    } else {
      // Return an empty array if the room does not exist
      return "No Room Data"
    }
}
// console.log(roomData)

console.log("Monday, ARC_103", getScheduleForRoomAndDay('ARC-103', 'Monday'))


//Discord Bot Setup

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ]
})

client.commands = new Collection()

//Dynamically retrieve command files
const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		// Set a new item in the Collection with the key as the command name and the value as the exported module
		if ('data' in command && 'execute' in command) {
			client.commands.set(command.data.name, command);
		} else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
}


const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}


client.login(
  process.env.DISCORD_TOKEN
);