const { SlashCommandBuilder } = require('discord.js')
const fs = require('node:fs');
const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('class_schedule.db');



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
                if (rows.length === 0) {
                    resolve(`No schedule found for room ${room} on ${day}.`);
                } else {
                    const times = rows.map(row => `${row.start_time} - ${row.end_time}`);
                    resolve(times.join(', '));
                }
            }
        });
    });
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


    async execute(interaction) {
        const room = interaction.options.getString('room');
        const day = interaction.options.getString('day');

        try {
            const info = await getScheduleForRoomAndDay(room, day);
            await interaction.reply(`${room} is booked on ${day} during the following times: ${info}`);
        } catch (error) {
            console.error(error);
            await interaction.reply('An error occurred while retrieving the schedule.');
        }
    }
};