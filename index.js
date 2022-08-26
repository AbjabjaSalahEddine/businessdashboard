const express = require("express");
var cors = require('cors');
const json = require('body-parser')

const app= express();
app.use(json());
app.use(cors());


app.use('/api/auth', require('./routes/auth'))
app.use('/api/dashboard', require('./routes/upload'))
app.use('/api/project', require('./routes/project'))
app.use('/api/employee', require('./routes/employee'))
app.use('/api/dashboard', require('./routes/data'))

if (process.env.NODE_ENV === "production") {
    //server static content
    //npm run build
    app.use(express.static(path.join(__dirname, "client/build")));
  }

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client/build/index.html"));
});

const PORT = process.env.PORT || 5000 ;

app.listen(PORT, ()=> console.log(`Server started on port : ${PORT}`));
