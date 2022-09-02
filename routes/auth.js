
const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const pool = require("../db/db");
const isLogged = require("../methodes/functions");





//Login user
router.post('/login',async (req, res) => {
    const { email, password } = req.body;
    console.log(email)
    const rows = await pool.query('SELECT * FROM admins where email=$1',[email]);
    if(rows.rowCount===1){
        const isMatched = await bcrypt.compare(password, rows.rows[0].password)
        if (isMatched) {
            const id=rows.rows[0].admin_id;
            jwt.sign({ "id": id }, "secret jwt", { expiresIn: '2h' }, (err, token) => {
                if (err) {
                    res.status(500).send({msg: "error happened while crypting"});
                }
    
                res.status(200).json({ id , token });
            });
        } else {
            res.status(400).send({msg: "Wrong Password"});
        }
    }else res.status(400).send({msg: "Wrong Email"});
    

})

//Check if Logged in

router.post('/isLogged',async (req, res) => {
    const {token , id } = req.body;
    const validation =isLogged.isLogged(id,token)
    res.send(validation);
})

//Update password
router.put('/updatepassword',async (req, res) => {
    const { newpassword, password, token , id } = req.body;
    if(token) {
        if(isLogged.isLogged(id,token)){
            const rows = await pool.query('SELECT password FROM admins where admin_id=$1',[id]);
            const isMatched = await bcrypt.compare(password, rows.rows[0].password)
            if(isMatched){
                
                const hash = await bcrypt.hash(newpassword, 10);
                await pool.query('UPDATE admins  set password=$1 where admin_id=$2',[hash,id]);
                res.status(200).send({msg: "OK",newpassword});
            }else{res.status(401).send({msg: "Wrong password"});} 
        }else{
            res.status(401).send({msg: "you should be authentified"});
        }
    }else{
        res.status(401).send({msg: "No Tocken sent"});
    }
})

module.exports = router