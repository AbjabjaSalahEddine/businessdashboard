const express = require("express");
var cors = require('cors');
const json = require('body-parser')

const app= express();
app.use(json());
app.use(cors());


app.use('/api/auth', require('./routes/auth'))
app.use('/api/dashboard', require('./routes/upload'))
app.use('/api/project', require('./routes/project'))


const port = process.env.PORT || 5000 ;

app.listen(port, ()=> console.log(`Server started on port : ${port}`));
