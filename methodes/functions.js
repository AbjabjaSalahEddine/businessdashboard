const fs = require('fs');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const XLSX = require('xlsx') ;
const pool = require("../db/db");
const { DateTime } = require("luxon");


const year=2022;

const mounthweek =["no mounth","January","January","January"
,"February","February","February","February","March","March","March","March","March","April","April","April","April"
,"May","May","May","May","June","June","June","June","June","July","July","July","July","August","August","August","August"
,"September","September","September","September","September","October","October","October","October"
,"November","November","November","November","December","December","December","December","December","January"]

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

const parseExcel = (filename) => {

    const excelData = XLSX.readFile(filename);

    return Object.keys(excelData.Sheets).map(name => ({
        name,
        data: XLSX.utils.sheet_to_json(excelData.Sheets[name]),
    }));
};


function getProjectsData(){
    var rows= pool.query('select * FROM projects')
    return rows
}
function getPeopleData(){
    var rows= pool.query('select * FROM employees')
    return rows
    
}



function readProjectsFromDB(){
    wo_num_name = {}
    getProjectsData().then((result) => {
        result.rows.map(p=> {
            wo_num_name[p.wo_number]=p.project_name
        } )
        fs.writeFileSync("./data/fromdb/projects.json", JSON.stringify(wo_num_name, null, 2) , err => {
                    if (err) console.log("Error writing file:", err);
                  });
    })
}
function readPeopleFromDB(){
    getPeopleData().then((result) => {
        dates = {}
        result.rows.map(p=> {
            let exitdate=p.exit_date==null ? [(year+1).toString(),"01","01"] : (p.exit_date.toISOString().split("T")[0]).split("-")
            let integrationdate=p.integration_date==null ? [(year-1).toString(),"01","01"] : (p.integration_date.toISOString().split("T")[0]).split("-")
            dates[p.drts_id]={"exitweek":exitdate[0]>year?53:DateTime.local(Number(exitdate[0]),Number(exitdate[1]),Number(exitdate[2])).weekNumber,
            "integrationweek":integrationdate[0]<year?-1:DateTime.local(Number(integrationdate[0]),Number(integrationdate[1]),Number(integrationdate[2])).weekNumber}
            
        } )
        fs.writeFileSync("./data/fromdb/employees.json", JSON.stringify(dates, null, 2) , err => {
                    if (err) console.log("Error writing file:", err);
                  });
    })
}



const  filterdata = ()=>{
    console.log("=> filtering starts ...")

    const employeedates =JSON.parse( fs.readFileSync("./data/fromdb/employees.json",
        {encoding:'utf8', flag:'r'}));

    var data = parseExcel("./data/source.xlsx")[0].data.filter(function (p){
        
        console.log(p.Login_ID.toString());
        return employeedates[p.Login_ID.toString()]!==undefined;
    });
    fs.writeFileSync("./data/filteredsource.json", JSON.stringify(data, null, 2) , err => {
        if (err) console.log("Error writing file:", err);
      });
}

const headCount=(w,employeedates)=>{
    w=(w%52) +1
    let sum=0;
    
    for (var e in employeedates) {
        sum+=(employeedates[e].exitweek>w && employeedates[e].integrationweek<w)?1:0
    }
    return sum
}



const filldonutchartdata =()=>{
    const filtereddata =JSON.parse( fs.readFileSync("./data/filteredsource.json",
            {encoding:'utf8', flag:'r'}));
    
    const wo_num_name =JSON.parse( fs.readFileSync("./data/fromdb/projects.json",
            {encoding:'utf8', flag:'r'}));
    const employeedates =JSON.parse( fs.readFileSync("./data/fromdb/employees.json",
            {encoding:'utf8', flag:'r'}));
    
    let data = {}

    let e = {
        "HC":0,
        "Projects":0,
        "Holidays":0,
        "Training":0,
        "Idle":0,
        "xR non Available":0,
        "Missed":0
    }
    filtereddata.forEach(b => { 
        if(!data["W"+parseInt(b["myWeekNumber"]).toString()]){
            data["W"+parseInt(b["myWeekNumber"]).toString()]=e
        }
        switch(wo_num_name[b.WO_number]) {
            case undefined:
                data["W"+parseInt(b["myWeekNumber"]).toString()]["xR non Available"]+=Math.round(b.ST)
                break;
            case "Holidays":
                data["W"+parseInt(b["myWeekNumber"]).toString()]["Holidays"]+=Math.round(b.ST)
                break;
            case "Training":
                data["W"+parseInt(b["myWeekNumber"]).toString()]["Training"]+=Math.round(b.ST)
                break;
            case "Idle":
                data["W"+parseInt(b["myWeekNumber"]).toString()]["Idle"]+=Math.round(b.ST)
                break;
            default:
                data["W"+parseInt(b["myWeekNumber"]).toString()]["Projects"]+=Math.round(b.ST)
          }
          
          e = {
            "HC":0,
            "Projects":0,
            "Holidays":0,
            "Training":0,
            "Idle":0,
            "xR non Available":0,
            "Missed":0
        }
        
    })
    for (var w in data) {
        data[w].HC=headCount(Number(w.slice(1)),employeedates)
        data[w].Missed=(data[w].HC*44)-(data[w].Projects+data[w].Holidays+data[w].Idle+data[w].Training+data[w]["xR non Available"])
    }
    fs.writeFileSync("./data/tobedisplayed/donutchartdata.json", JSON.stringify(data, null, 2) , err => {
        if (err) console.log("Error writing file:", err);
      });
    console.log("Donnutchart data ready !!!")
}



async function  excelToJson(){
    
    filterdata()
    console.log("data well filtered \n=> filling data to be displayed ...")
    filldonutchartdata();
}




exports.isLogged=isLogged
exports.excelToJson=excelToJson
exports.readPeopleFromDB=readPeopleFromDB
exports.readProjectsFromDB=readProjectsFromDB