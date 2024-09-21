const { SlashCommandBuilder } = require('discord.js')
const fs = require('node:fs');

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

module.exports = {
    data: new SlashCommandBuilder()
        .setName('getroominfo')
        .setDescription('Gets all the times that the selected room is in use for lectures on the given day')
        .addStringOption(option =>
            option
                .setName('room')
                .setDescription('Classroom code (e.g. "ARC-103").')
                .setRequired(true))
        .addStringOption(option =>
            option
                .setName('day')
                .setDescription("Day of the week that you want to know the schedule for.")
                .setRequired(true)
                .addChoices(
                    { name: 'Monday', value: 'Monday' },
                    { name: 'Tuedsay', value: 'Tuesday' },
                    { name: 'Wednesday', value: 'Wednesday' },
                    { name: 'Thursday', value: 'Thursday' },
                    { name: 'Friday', value: 'Friday' },
                    { name: 'Saturday', value: 'Saturday' },
                    { name: 'Sunday', value: 'Sunday'}
                )),
    
    async execute(interaction){
        const room = interaction.options.getString('room')
        const day = interaction.options.getString('day')
        const info = getScheduleforRoomAndDay(room,day).toString()

        await interaction.reply(`${room} is booked on ${day} during the following times: ${info}`)
    },
};