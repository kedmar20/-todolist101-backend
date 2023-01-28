const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());
const tasksJson = [];

app.get("/", (req, res)=>{
    console.log(req); 
    res.send('the server works!');    
});

app.post('/todolist', (req, res) => {
    tasksJson.push(req.body);
    console.log(req.body);
    console.log(tasksJson);
    res.status(200).end();
});

app.get("/todolist", (req, res)=>{
    res.json({tasksJson});
});

app.delete("/todolist/:taskIdfromFrontend", (req, res) => {
    const taskIdfromFrontend = parseInt(req.params.taskIdfromFrontend, 10)
    console.log(taskIdfromFrontend);
    const findIndexArrayOfThisTask = tasksJson.findIndex((e)=>e.idNr === taskIdfromFrontend);
    console.log(findIndexArrayOfThisTask);
    if(findIndexArrayOfThisTask===0 || findIndexArrayOfThisTask) {
        tasksJson.splice(findIndexArrayOfThisTask, 1);
    }
    console.log(tasksJson);
    res.status(200).end();
});

app.patch("/todolist/:taskIdfromFrontend", (req, res) => {
    const taskIdfromFrontend = parseInt(req.params.taskIdfromFrontend, 10)
    console.log("40:" + taskIdfromFrontend);

    const findTask = tasksJson.find((e)=>e.idNr === taskIdfromFrontend);

    console.log("44:" + findTask);
    if(findTask) {
        const updated = req.body;
        if (updated.value !== undefined) {
            findTask.value = updated.value;
            console.log("49:" + findTask);
            console.log("50:" + findTask.value);
        }
        res.status(200).end();
    }else {
        res.status(400).end();
    }
        console.log(tasksJson);    
});

const port = process.env.PORT || 8888;

app.listen(port, ()=>{
    console.log(`Aplikacja wystartowala na porcie: ${port}`);
});

