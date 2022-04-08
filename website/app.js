
/* Global Variables */
const key =  '1de8bd1d1e76a2b2a392ad4222e8c2d2&units=imperial';
const baseurl = 'https://api.openweathermap.org/data/2.5/weather';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1+'.'+ d.getDate()+'.'+ d.getFullYear();


// this async function will control the flow of process
const fetching=async (baseurl,key)=>{
    let useZip=document.getElementById("zip")
    let zipCode=useZip.value
    let feeling=document.getElementById("feelings").value;
    let data=await fetch(`${baseurl}?zip=${zipCode}&appid=${key}`).then(response=>response.json()) // fetching api for weather information
    console.log(data)
    postData=await postfun('/next',data,feeling) // calling postfunto post data and feeling on server
    updateHtml=await retriveUpdate() // calling retriveUpdate to get data from server and update on ui

}
//adding event listener to geneatre button
document.getElementById('generate').addEventListener('click',()=>{fetching(baseurl,key)
})



// this function will post data to server
const postfun=(url='',data={},feeling)=>{
    fetch(url,{
        method:'POST',
        credentials:'same-origin',
        headers:{
            'content-type':'application/json'
        },
        body:JSON.stringify({temperature:data.main.temp,date:newDate,user_response:feeling})
    })
    .then(response=>{
        return response.json()
    })
    .catch(error=>console.log('error in postfun check',error))

}


// this function will rerive data from server and update on UI
const retriveUpdate=async ()=>{
    try{

        let data=await fetch("/data").then(response=>response.json())
        console.log(data)

        document.getElementById('date').innerHTML=`Date : ${data.date}`
        document.getElementById('temp').innerHTML=`Temperature : ${data.temperature}`
        document.getElementById('content').innerHTML=`Feeling : ${data.user_response}`
    }catch(error){console.log('error at retriveUpdate check',error)}

}



