// Express to run server and routes
const express= require('express');
// Start up an instance of app
const app= express();

// data object
const projectData={};

/*Depenedancies*/
// Body Parser
const bodyParser= require('body-parser'); // body-parser required

/*middle-ware */
//express will use body-parser
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({extended: false})); // the object will contain strings only

//cross origin allowance
const cors= require('cors'); // cors required
app.use(cors()); //the instance of the app should use cors()

//main project folder
app.use(express.static('website')); 

//server setup & spin
const port= 8000;
const server= app.listen(port, listening);

function listening(){
    console.log(`server running on localhost: ${port}`); //to make sure server is running
};

/*Routes */
//get route
app.get('/all', getData);

function getData(req, res){
    res.send(projectData);
};

//post route 
app.post('/add', dataAdding);

function dataAdding(req, res){
// add each of these values with a key to projectData
    projectData.temp= req.body.temp;
    projectData.feels_like= req.body.feels_like
    projectData.name= req.body.name;
    projectData.content= req.body.content;
    projectData.date= req.body.date;

    res.send(projectData);
  };
