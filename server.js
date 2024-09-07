const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const cors = require('cors');
app.use(cors());

// Initialize app
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB (replace <username>, <password>, and <dbname> with your MongoDB credentials)
mongoose.connect('mongodb://localhost:27017/homeworkDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Assignment Schema
const assignmentSchema = new mongoose.Schema({
    name: String,
    dueDate: Date,
    priority: Number
});

// Assignment Model
const Assignment = mongoose.model('Assignment', assignmentSchema);

// API Routes
app.get('/assignments', async (req, res) => {
    const assignments = await Assignment.find();
    res.json(assignments);
});

app.post('/assignments', async (req, res) => {
    const { name, dueDate, priority } = req.body;
    const newAssignment = new Assignment({ name, dueDate, priority });
    await newAssignment.save();
    res.json({ message: 'Assignment saved' });
});

app.delete('/assignments/:id', async (req, res) => {
    const { id } = req.params;
    await Assignment.findByIdAndDelete(id);
    res.json({ message: 'Assignment deleted' });
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
