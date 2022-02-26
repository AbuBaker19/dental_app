const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser');
// const mysql =  require('mysql')
const userRouts = require('./userRoutes/user')



app.use(express.urlencoded({extended:false}))
app.use(express.json())



app.use('/api', userRouts)


app.listen(4000, ()=>{
    console.log('your server ruuning at port 4000');
})