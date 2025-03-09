const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const {v4 : uuidv4} = require("uuid");

const databasePath = path.join(__dirname,"../tasks.json");


// get tasks route
router.get("/",async (req,res) => {
    try{
    const data = JSON.parse(fs.readFileSync(databasePath,"utf-8"));
    if(data.length===0){
        res.status(200).json({"message" : "No Tasks Found"});
    }
    else {
        res.status(200).json({"message" : "Tasks sent Successfully",tasks : data});
    }
}
catch(Err){
    res.status(500).json({"message":`Internal Server Error : ${Err}`})
}
});

// CRUD operations on tasks
router.get("/:id", async (req,res) => {
    try{
    const data = JSON.parse(fs.readFileSync(databasePath,"utf-8"));
    const {id} = req.params;
    const getResult = data.filter((ele) => ele.taskId===id);
    if(getResult.length===1){
        res.status(200).json({"message" : "Task Found",task:getResult});
    }
    else {
        res.status(404).json({"message" : "Task Not Found"});
    }
}
catch(Err){
    res.status(500).json({"message":`Internal Server Error : ${Err}`})
}
})

router.post("/", async (req,res) => {
    try{
    const data = JSON.parse(fs.readFileSync(databasePath,"utf-8"));
    const {title,description} = req.body;
    const newTask = {
        taskId : uuidv4(),
        title,
        description
    }
    const newData = [newTask,...data];
    const result = fs.writeFileSync(databasePath,JSON.stringify(newData));
    if(newData.length>data.length){
        res.status(200).json({"message" : "Task Added Successfully",task:newTask});
    }
    else{
        res.status(200).json({"message" : "Unable To add Task"});
    }
}
catch(Err){
    res.status(500).json({"message":`Internal Server Error : ${Err}`})
}
})

router.put("/:id", async (req,res) => {
    try{
  const {id} = req.params;
  const data = JSON.parse(fs.readFileSync(databasePath,"utf-8"));
  const getTask = data.filter((ele) => ele.taskId===id);
  if(getTask.length===1){
    const updatedTask = {
        ...getTask[0],
        ...req.body,
    };
    const newdata = data.map((ele) => {
        if(ele.taskId===id){
            return updatedTask
        }
        return ele
    });
    const result = fs.writeFileSync(databasePath,JSON.stringify(newdata));
    res.status(200).json({message:`Task updated Successfully`, updatedTask})
  }
  else{
    res.status(404).json({"message" : `Task with ID ${id} not found`})
  }
}
catch(Err){
    res.status(500).json({"message":`Internal Server Error : ${Err}`})
}
})

router.delete("/:id", async (req,res) => {
    try{
    const {id} = req.params;
    const data = JSON.parse(fs.readFileSync(databasePath,"utf-8"));
    const getTask = data.filter((ele) => ele.taskId===id);
    if(getTask.length===1){
      const newdata = data.filter((ele) => ele.taskId!==id);
      const result = fs.writeFileSync(databasePath,JSON.stringify(newdata));
      res.status(200).json({"message" : "Task Deleted Successfully"});
    }
    else{
        res.status(404).json({"message" : `Task with given ID ${id} not found`})
    }
}
catch(Err){
    res.status(500).json({"message":`Internal Server Error : ${Err}`})
}
  });
  

module.exports = router;