/*Globla Variables */

/**OpenWeatherMap credentials */
// OpenWeatherMap API with zipcode URL 
const baseUrl= 'https://api.openweathermap.org/data/2.5/weather?zip=';
// Personal API Key
const apiKey= '&appid=83a2820e3e60710a83c23a406dbae6a7&units=imperial';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = (d.getMonth()+1)+'.'+ d.getDate()+'.'+ d.getFullYear(); // (d.getMonth()+1) because january is 0

/* 1 - creating a generate function*/
//the event listener
document.getElementById('generate').addEventListener('click', generate);

//the main function
function generate(e){
    e.preventDefault();
    const recentHeader=document.querySelector('h4'); //selecting element h4
    recentHeader.classList.remove('hidden'); // 'Most recent' will show when generate button is clicked
   
    // get the input values
    const zipCode= document.getElementById('zip').value;
    const content= document.getElementById('feelings').value;
    console.log('generate btn works')

    getWeatherData(baseUrl, zipCode, apiKey)
        .then (function(userData) {
              dataAdding('/add', {
                    temp: userData.main.temp,
                    content ,
                    date:newDate,
                    name: userData.name,
                    feels_like: userData.main.feels_like,
                }) // adding to POST req
            .then (function(info){
                retrieveData () // function callback to update contents in UI
                })
        })
}


/* 2 - Async GET*/
const getWeatherData= async(baseUrl, zipCode, apiKey)=>{
    const res=await  fetch(baseUrl + zipCode + apiKey);
    try{
        const userData= await res.json();
        return userData;
    } catch (error){
        console.log('error', error)
    }
}

/* 3 - Async POST*/
const dataAdding = async ( url = '', data = {})=>{
      const req = await fetch(url, {
      method: 'POST', 
      credentials: 'same-origin',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(data) // body data type must match "Content-Type" header 
    })
      try {
        const newInfo = await req.json();
        return newInfo;
      }catch(error) {
      console.log("error", error); // appropriately handle the error
      }
}

/* 4 - Update UI contents*/
const retrieveData  = async () => {
    const req = await fetch('/all');
    try {
         // Transform into JSON
        const allData = await req.json();
        console.log(allData); //for debugging

         // Write updated data to DOM elements
        document.getElementById('date').innerHTML = allData.date;
        document.getElementById('temp').innerHTML = Math.round(allData.temp) +'<sup style="font-size: 24px" >°F</sup>';
        document.getElementById('feels_like').innerHTML= 'Feels like : ' + Math.round(allData.feels_like) + '<sup style="font-size: 16px">°F</sup>';
        document.getElementById('city').innerHTML = '<span class="material-symbols-outlined" style="font-size: 16px">location_on</span>' + allData.name;
        document.getElementById('content').innerHTML = allData.content;
    }
    catch (error) {
        console.log('error', error); // appropriately handle the error
    }
}
