const { SlashCommandBuilder } = require('discord.js');
const sqlite3 = require('sqlite3').verbose();

// Connect to the SQLite database
const db = new sqlite3.Database('./class_schedule.db');

function getScheduleForRoomAndDay(room, day) {
    return new Promise((resolve, reject) => {
        const query = `
            SELECT start_time, end_time 
            FROM Schedule 
            WHERE room = ? AND day = ? 
            ORDER BY start_time;
        `;

        db.all(query, [room, day], (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
}


function generateDetailedCalendar(times) {
    const calendar = [];
    const dayStart = 0; // Start of the day: 00:00
    const dayEnd = 24; // End of the day: 24:00 (one hour increments)

    // Helper function to format the time in 12-hour format with AM/PM, including minutes
    function formatTime(hour, minute = 0) {
        const isPM = hour >= 12;
        let formattedHour = hour % 12 || 12; // Convert hour to 12-hour format
        const formattedMinute = minute === 0 ? '00' : String(minute).padStart(2, '0'); // Format minutes
        const period = isPM ? 'PM' : 'AM';
        return `${String(formattedHour).padStart(2, '0')}:${formattedMinute} ${period}`;
    }

    // Initialize calendar with 1-hour intervals in 12-hour format
    for (let i = dayStart; i < dayEnd; i++) {
        calendar.push(`${formatTime(i)} |`);
    }

    // Mark booked slots
    times.forEach(({ start_time, end_time }) => {
        const [startHour, startMin] = start_time.split(':').map(Number);
        const [endHour, endMin] = end_time.split(':').map(Number);

        // If the booking crosses over to the next hour, we'll mark each hour only once
        const startSlot = startHour;
        const endSlot = endHour + (endMin > 0 ? 1 : 0); // Consider the next hour if endMin > 0

        for (let i = startSlot; i < endSlot; i++) {
            // Only mark the slot if it's not already marked as booked
            if (!calendar[i].includes('[BOOKED]')) {
                const startFormatted = formatTime(startHour, startMin);
                const endFormatted = formatTime(endHour, endMin);
                calendar[i] = `${calendar[i]} [BOOKED] (${startFormatted} - ${endFormatted})`;
            }
        }
    });

    return calendar.join('\n');
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
                    { name: 'Tuesday', value: 'Tuesday' },
                    { name: 'Wednesday', value: 'Wednesday' },
                    { name: 'Thursday', value: 'Thursday' },
                    { name: 'Friday', value: 'Friday' },
                    { name: 'Saturday', value: 'Saturday' },
                    { name: 'Sunday', value: 'Sunday' }
                )),
    
    async execute(interaction) {
        const room = interaction.options.getString('room');
        const day = interaction.options.getString('day');

        try {
            const times = await getScheduleForRoomAndDay(room, day);

            if (times.length === 0) {
                await interaction.reply(`No bookings found for ${room} on ${day}.`);
                return;
            }

            // Generate detailed text-based calendar
            const calendarText = generateDetailedCalendar(times);

            // Reply with the calendar
            await interaction.reply(`Schedule for ${room} on ${day}:\n\`\`\`\n${calendarText}\n\`\`\``);
        } catch (error) {
            console.error(error);
            await interaction.reply('An error occurred while retrieving the schedule.');
        }
    },
};
