const fs = require('fs');

// Read the room data from the text file
const roomData = {};

// Read the text file and process each line
const data = fs.readFileSync('room_schedule.txt', 'utf-8').split('\n');

// Parse the data and populate the roomData object
data.forEach(line => {
    if (line.trim()) {
        const [room, time, day] = JSON.parse(line.trim());
        if (!roomData[room]) {
            roomData[room] = [];
        }
        roomData[room].push({ time, day });
    }
});

// Example roomData structure:
// {
//     "SC-120": [{ time: "2:00 PM - 3:20 PM", day: "Thursday" }, ...],
//     ...
// }