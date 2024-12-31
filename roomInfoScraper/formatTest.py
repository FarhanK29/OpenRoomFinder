import sqlite3

classInfo = [
['HC-S124', '15:50', '17:10', 'Tuesday'],
['HC-S124', '15:50', '17:10', 'Thursday'],
['BE-119', '19:30', '20:50', 'Tuesday'],
['BE-119', '19:30', '20:50', 'Thursday'],
['LSH-B111', '12:10', '13:30', 'Wednesday'],
['LSH-B111', '14:00', '15:20', 'Friday'],
['LSH-B109', '10:20', '11:40', 'Wednesday']
]


connection = sqlite3.connect('class_schedule.db')
cursor = connection.cursor()

cursor.execute('DROP TABLE IF EXISTS Schedule')

cursor.execute("""
CREATE TABLE Schedule (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    room TEXT NOT NULL,
    start_time TEXT NOT NULL,
    end_time TEXT NOT NULL,
    day TEXT NOT NULL
)
""")

for entry in classInfo:
    cursor.execute("INSERT INTO Schedule (room, start_time, end_time, day) VALUES (?, ?, ?, ?)", entry)

connection.commit()
connection.close()
print("added to database")