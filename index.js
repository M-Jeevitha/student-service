const express = require('express');
const app = express();
app.use(express.json());

// Temporary in-memory DB
let students = [
  { id: 1, name: "Gokul Raj" }
];

// Health check
app.get('/health', (req, res) => res.json({ status: 'ok', service: 'student-service' }));

// Get all students
app.get('/students', (req, res) => {
  res.json(students);
});

// Register a new student
app.post('/students', (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ error: "Student name is required" });
  }
  const newStudent = { id: students.length + 1, name };
  students.push(newStudent);
  res.status(201).json(newStudent);
});

app.listen(process.env.PORT || 3001, () => {
  console.log('student-service running on port', process.env.PORT || 3001);
});
