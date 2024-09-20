//to read from .txt file
const fs = require('fs');

//discord imports
const {Client, IntentsBitField} = require('discord.js')

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
    IntentsBitField.Flags.Guilds
  ]
})