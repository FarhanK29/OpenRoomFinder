
# OpenRoomRU Discord Bot

OpenRoomRU is a Discord bot designed for Rutgers University students. It allows users to retrieve class schedules for any room at Rutgers University by scraping data from the official Rutgers Schedule of Classes website (https://classes.rutgers.edu/soc/). Students can input a room name and select a specific day to view all the time slots during which the room is booked. This bot is especially useful for finding free time slots in classrooms for study sessions, group meetings, or other activities.

## Features

* Web Scraping: Automatically scrapes the Rutgers Schedule of Classes for all classrooms and compiles daily room schedules.

* Class Timing Sorting: Organizes class timings by classroom and day, ensuring accurate and efficient data retrieval.

* Slash Commands: Supports Discord slash commands, making it easy to input room names and select days for quick information.

* Easy-to-Use Interface: Allows users to simply type the room name and day in a Discord channel to get the room's schedule for that day.

## How It Works

1. Data Collection:

* The bot uses Python with Beautiful Soup and Selenium to web scrape Rutgers' Schedule of Classes (https://classes.rutgers.edu/soc/).
* It collects all available class timings for each room across different days.
* The data is sorted by room and day for easy lookup.

2. Discord Integration:

* The bot integrates with Discord using discord.js to implement a slash command /room.
* Users can input a room name and select a day to get a list of all class timings for that day.
* Example usage: /room {room_name} {day}.

3. Output:

* The bot returns all booked time slots for the room on the selected day, so users know when the room is in use.


## Tech Stack

* **Python:** for bot logic and web scraping
* **BeautifulSoup and Selenium** for scraping Rutgers' Schedule of Classes
* **discord.js** for discord bot development
* **Rutgers Schedule of Classes Website** (https://classes.rutgers.edu/soc/)

