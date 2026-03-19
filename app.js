/* (1.)
const http = require('http');

//backend server
const server = http.createServer((req, res) => {
    res.write("Server is running..");
    res.end();
});

server.listen(3000, () => {
    console.log("Server running on port 3000");
});
*/

// express server
const express = require('express');
const app = express();
const Task = require('./models/Task');

// API end point
app.get('/', (req, res) => {
    res.send("Welcome to Task manager API");
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});

//routes for api; res.json()
app.get('/task', (req, res) => {
    res.json([
        { id: 1, task: "Learn Node.js"},
        { id: 2, task: "Build Project"}
    ]);
});

//middleware
app.use(express.json());  // reads json body 

//POST send data to server; req.body
// app.post('/tasks', (req, res) => {
//     const newTask = req.body;
//     task.push(newTask);
//     res.json({ message: "Task added", tasks });

// });

app.post('/tasks', async (req, res) => {
    const task = new Task(req.body);
    await task.save();
    res.json(task);
});

app.get('/tasks', async (req, res) => {
    const tasks = await Task.find();
    res.json(tasks);
});
//Always use async/await
// DB operations are asynchronous

//connect Db
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/taskmanager')
.then(() => console.log("DB connected"))
.catch(err => console.log(err));      
