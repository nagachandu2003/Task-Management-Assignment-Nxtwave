const express = require("express");
const cors = require("cors");
const path = require("path");
const morgan = require("morgan");

const app = express();
app.use(express.json());
app.use(cors());


// Morgan to log api requests
app.use( morgan('tiny'));


const taskRouter = require("./routes/taskroutes");

app.use("/tasks", taskRouter);

app.get("/", async (req,res) => {
    res.status(200).json({"message" : "Welcome to Task Manager Backend Application"})
})


app.listen(3001,() => {
    console.log(`Server is Running at http:localhost:3001`);
})
