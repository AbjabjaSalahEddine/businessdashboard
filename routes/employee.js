const express = require('express')
const router = express.Router()
const pool = require("../db/db");
const functions = require("../methodes/functions");

const {isLogged}=functions
const {readPeopleFromDB}=functions

// get all employees
router.get('/',async (req,res)=>{
    try {
        var rows=await pool.query('select * from employees')
        res.send(rows.rows)
    } catch (error) {
        console.log(error.message)
    }
  })

router.post('/',async (req, res) => {
    const {drts_full_name,drts_id,system_id,system_login,position,reports_to,integration_d,exit_d,birth_d,cin,phone, id , token } = req.body;
    if(isLogged(id,token)){
        try { 
            console.log(system_login)
            employee_id = await pool.query('INSERT INTO employees(drts_full_name,drts_id,system_id,position,reports_to,integration_date,exit_date,birth_date,cin,phone_number,system_login) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11) returning emp_id',
            [drts_full_name,drts_id,system_id,position,reports_to,integration_d,exit_d,birth_d,cin,phone,system_login]);
            readPeopleFromDB()
            res.status(200).json({msg : "employee added successfully!" , employee_id: employee_id.rows[0].employee_id});
        } catch (error) {
            console.log(error.message)
        }
    }else{
        res.status(401).json({ msg :'You should be authentified!!' });
    }
})

router.put('/:employeeid',async (req, res) => {
    const employee_id=req.params.employeeid;
    const { drts_full_name,drts_id,system_id,system_login,position,reports_to,integration_d,exit_d,birth_d,cin,phone, id , token} = req.body;
    if(isLogged(id,token)){
        try { 
            await pool.query(
                'UPDATE employees SET drts_full_name=$1,drts_id=$2,system_id=$3,system_login=$4,position=$5,reports_to=$6,integration_date=$7,exit_date=$8,birth_date=$9,cin=$10,phone_number=$11 WHERE emp_id=$12',
                [drts_full_name,drts_id,system_id,system_login,position,reports_to,integration_d,exit_d,birth_d,cin,phone,employee_id]);
            readPeopleFromDB()
            res.status(200).json({msg : "employee edited successfully!"});
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
        var rows=await pool.query('select * from employees where employee_id=$1',[id])
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
            var rows=await pool.query('select * FROM employees WHERE emp_id=$1',[p_id])
            if(rows.rowCount===0){
                res.status(400).json({msg : "No Such Employee"});
            }else{
                await pool.query('DELETE FROM employees WHERE emp_id=$1',[p_id]);
                readPeopleFromDB()
                res.status(200).json({msg : "Employee deleted successfully!"});
            }
            
        } catch (error) {
            console.log(error.message)
        }
    }else{
        res.status(401).json({ msg :'You should be authentified!!' });
    }

})
module.exports = router


