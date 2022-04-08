// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express=require('express');
const bodyParser=require('body-parser');


// Start up an instance of app
const app=express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors=require('cors')
app.use(cors())

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port=3000;

app.get('/data',(req,res)=>{
    res.send(projectData)
})

app.post('/next',(req,res)=>{
    console.log(req.body)
    projectData=req.body
    res.send(projectData)
})


app.listen(port,()=>{
    console.log(`server is listening on port ${port}`)
})



