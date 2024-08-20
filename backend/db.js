const sqlite3 = require('sqlite3')
const db = new sqlite3.Database(':memory:');

db.serialize(() => {
    // Create Mentors table
    db.run(`CREATE TABLE Mentors (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      availability TEXT NOT NULL,
      areas_of_expertise TEXT NOT NULL,
      is_premium BOOLEAN NOT NULL
    )`);

    // Create Students table
    db.run(`CREATE TABLE Students (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      availability TEXT NOT NULL,
      area_of_interest TEXT NOT NULL
    )`);

    // Create Bookings table
    db.run(`CREATE TABLE Bookings (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      student_id INTEGER NOT NULL,
      mentor_id INTEGER NOT NULL,
      booking_time TEXT NOT NULL,
      FOREIGN KEY(student_id) REFERENCES Students(id),
      FOREIGN KEY(mentor_id) REFERENCES Mentors(id)
    )`);

    // Insert some test mentors
    db.run(`INSERT INTO Mentors (name, availability, areas_of_expertise, is_premium) VALUES
      ('John Doe', 'Mon-Fri 9am-5pm', 'JavaScript, Node.js', 1),
      ('Jane Smith', 'Tue-Thu 10am-4pm', 'Python, Data Science', 0),
      ('Emily Johnson', 'Wed-Fri 12pm-6pm', 'Java, Spring Boot', 1)
    `);
});

module.exports = db;
