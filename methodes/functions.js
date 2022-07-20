const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


function isLogged(id,token){
    let validation = false
    jwt.verify(token,"secret jwt",async  (err,decodedtocken)=>{
        if(err){
        }else{
            if(decodedtocken.id===id){
                validation=true
            }
        }
    })
    return validation
}


exports.isLogged=isLogged