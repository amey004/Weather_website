const request = require("request");

const forecast=(lat,long,callback)=>{
    const url =
      "http://api.weatherstack.com/current?access_key=e67d79955ab5ccbf0152bc05e9540dfe&query="+lat+","+long;

    request({url,json:true},(error,{body})=>{

        if (error) {
            callback("Unable to coonect to weather service!",undefined)
        }else if(body.error){
            callback("Unable to find location!")
        }else{
            callback(undefined,
            body.current.weather_descriptions[0] +
             " -It is currently " +
            body.current.temperature +
             " degress out. There is " +
            body.current.precip +
             "% chance of rain."+
             "Humidity : "+body.current.humidity);
        }
    })
}


module.exports=forecast


