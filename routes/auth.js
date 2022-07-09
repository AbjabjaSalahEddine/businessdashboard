const express = require('express')
const router = express.Router()
const admin = require("../db/auth.json")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const fs = require('fs')




//Login user
router.post('/login',async (req, res) => {
    const { email, password } = req.body;
    const adminfile=JSON.parse(JSON.stringify(admin));
    if(adminfile.email===email){
        const isMatched = await bcrypt.compare(password, adminfile.password)
        if (isMatched) {
            jwt.sign({ "admin":"admin" }, "secret jwt", { expiresIn: '2h' }, (err, token) => {
                if (err) {
                    res.status(500).send({msg: "error happened while crypting"});
                }
    
                res.status(200).json({ token });
            });
        } else {
            res.status(404).send({msg: "Wrong Password"});
        }
    }else res.status(404).send({msg: "Wrong Email"});
    

})

//Update password
router.put('/updatepassword',async (req, res) => {
    const { newpassword, password, tocken } = req.body;

    const adminfile=JSON.parse(JSON.stringify(admin));
    if(tocken) {
        jwt.verify(tocken,"secret jwt",async  (err,decodedtocken)=>{
            if(err){
                res.sendStatus(401).send("tocken not valid");
            }else{
                if(decodedtocken.admin==="admin"){
                    const isMatched = await bcrypt.compare(password, adminfile.password)
                    if(isMatched){
                        const hash = await bcrypt.hash(newpassword, 10);
                        adminfile.password=hash
                        fs.writeFileSync("./db/auth.json", JSON.stringify(adminfile));
                        res.status(200).send({msg: "OK",newpassword});
                    }else{res.status(401).send({msg: "Wrong password"});} 
                    
                }else{
                    res.status(401).send({msg: "wrong token"});
                }
            }
        })
    }else{
        res.sendStatus(401).send("you should be authentified");
    }
})

module.exports = router