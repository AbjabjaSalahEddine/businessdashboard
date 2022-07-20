const express = require('express')
const router = express.Router()
const pool = require("../db/db");
const functions = require("../methodes/functions");

const {isLogged}=functions
// get all projects
router.get('/',async (req,res)=>{
    try {
        var rows=await pool.query('select * from projects')
        res.send(rows.rows)
    } catch (error) {
        console.log(error.message)
    }
  
  })

router.post('/',async (req, res) => {
    const { bu , wo_number , project_name ,requestor , wo_description , xr , id , token } = req.body;
    if(isLogged(id,token)){
        try { 
            project_id = await pool.query('INSERT INTO projects(bu,wo_number,project_name,requestor,wo_description,xr) VALUES($1,$2,$3,$4,$5,$6) returning project_id',
            [bu,wo_number , project_name ,requestor , wo_description , xr]);
            res.status(200).json({msg : "project added successfully!" , project_id: project_id.rows[0].project_id});
        } catch (error) {
            console.log(error.message)
        }
    }else{
        res.status(401).json({ msg :'You should be authentified!!' });
    }
})

router.get('/:id',async (req,res)=>{
    const id=req.params.id
    try {
        var rows=await pool.query('select * from projects where project_id=$1',[id])
        res.send(rows.rows[0])
    } catch (error) {
        console.log(error.message)
    }

})

router.delete('/:id',async (req,res)=>{
    const p_id = req.params.id;
    const {id,token}=req.body;
    if(isLogged(id,token)){
        try { 
            var rows=await pool.query('select * FROM projects WHERE project_id=$1',[p_id])
            if(rows.rowCount===0){
                res.status(400).json({msg : "No Such Project"});
            }else{
                await pool.query('DELETE FROM projects WHERE project_id=$1',[p_id]);
                res.status(200).json({msg : "project deleted successfully!"});
            }
            
        } catch (error) {
            console.log(error.message)
        }
    }else{
        res.status(401).json({ msg :'You should be authentified!!' });
    }

})
module.exports = router


