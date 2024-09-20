const fs = require('fs');



// convert textFile into array 
const data = fs.readFileSync('roomInfoScraper/room_schedule.txt', 'utf-8').split('\n');

//Initialize roomData dictionary to hold all roomData
const roomData = {};

// console.log(data[0])
// data[0] = data[0].replace('[', '').trim();
// data[0] = data[0].replace(']', '').trim()
// console.log(data[0])

// const [room, time, day] = data[0].split(',').map(item => item.trim());
// console.log(room)
// console.log(time)
// console.log(day)

// if(!roomData[room]){
//     roomData[room] = []
// }
// roomData[room].push({day, time})
// console.log(roomData)

for (i = 0; i < 12; i++){
    data[i] = data[i].replace('[', '').trim();
    data[i] = data[i].replace(']', '').trim()

    const [room, time, day] = data[i].split(',').map(item => item.trim());

    if(!roomData[room]){
        roomData[room] = []
    }
    roomData[room].push({day, time})
    console.log(roomData)
}

console.log(roomData)
