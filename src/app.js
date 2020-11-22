const path=require('path')
const express=require('express')
const hbs=require('hbs')
const forecast=require('./utils/forecast')
const geocode=require('./utils/geocode')

const app=express()
const port = process.env.PORT || 3000

//Define path for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//setup handelbars engine and views location 
app.set("view engine", "hbs");
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather',
        name:'Amey Bhattad'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About Me:',
        name:'Amey Bhattad'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        message:'Help :',
        title:'Help',
        name:'Amey Bhattad'
    })
})

app.get('/weather',(req,res)=>{

    if(!req.query.address){
        return res.send({
            error:"Address must be provided!"
        })
    }

    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error){
            return res.send({ error })
        }
        forecast(latitude,longitude,(error,forecast_data)=>{

            if(error){
                return res.send({ error })
            }
            res.send({
                address:location,
                weather:forecast_data
            })
        })
    })
})




app.get('/help/*',(req,res)=>{
    res.render("page_404",{
        title:'404',
        error:"Help article not found",
        name:'Amey Bhattad'
    })
})

app.get("/products", (req, res) => {

    if(!req.query.search){
        return res.send({
            error:'Search term should be provided!'
        })
    }
    console.log(req.query.search)
    res.send({
        producrs: [],
    });
});

//response can be sent only once

app.get('*',(req,res)=>{
    res.render("page_404", {
      title: "404",
      error: "Page not found",
      name: "Amey Bhattad",
    });
})


app.listen(port,()=>{
    console.log("Server is up on port "+port)
})