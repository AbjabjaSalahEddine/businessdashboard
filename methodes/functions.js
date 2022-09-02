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
    console.log("=> reading/filtering excel will starts")
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
            wo_num_name[p.wo_number]=Object({'name':p.project_name,'bu':p.bu})
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
    
    const employeedates =JSON.parse( fs.readFileSync("./data/fromdb/employees.json",
        {encoding:'utf8', flag:'r'}));
    
    var data = parseExcel("./data/source.xlsx")[0].data.filter(function (p){
        return employeedates[p.Login_ID.toString()]!==undefined;
    });
    console.log("done filtering")
    fs.writeFileSync("./data/filteredsource.json", JSON.stringify(data, null, 2) , err => {
        if (err) console.log("Error writing file:", err);
      });
}

const isInWeek=(w,integrationweek,exitweek)=>{
    w=(w%52)
    integrationweek=integrationweek==52?0:integrationweek
    exitweek=exitweek==52?0:exitweek
    return (integrationweek<w && exitweek>w)
}

const headCount=(w,employeedates)=>{
    w=(w%52)
    let sum=0;
    
    for (var e in employeedates) {
        sum+=isInWeek(w,employeedates[e].integrationweek,employeedates[e].exitweek)?1:0
    }
    return sum
}



const filldonutchartdata =()=>{
    const filtereddata =JSON.parse( fs.readFileSync("./data/filteredsource.json",
            {encoding:'utf8', flag:'r'}));
    
    const projectsdata =JSON.parse( fs.readFileSync("./data/fromdb/projects.json",
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
        if(projectsdata[b.WO_number]==undefined){
            data["W"+parseInt(b["myWeekNumber"]).toString()]["xR non Available"]+=Math.round(b.ST)
        }else{
            switch(projectsdata[b.WO_number].name) {
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
const fillemployeeslistchartdata =()=>{
    const filtereddata =JSON.parse( fs.readFileSync("./data/filteredsource.json",
            {encoding:'utf8', flag:'r'}));
    
    const projectsdata =JSON.parse( fs.readFileSync("./data/fromdb/projects.json",
            {encoding:'utf8', flag:'r'}));
    const employeedates =JSON.parse( fs.readFileSync("./data/fromdb/employees.json",
            {encoding:'utf8', flag:'r'}));
    
    let data = {}

    let m = {
        "Projects":0,
        "Holidays":0,
        "Training":0,
        "Idle":0,
        "xR non Available":0,
        "Missed":44
    }
    filtereddata.forEach(b => { 
        var weekNum=parseInt(b["myWeekNumber"])
        if(!data["W"+weekNum.toString()]){
            data["W"+weekNum.toString()]={}
        }
        for (var e in employeedates) {
            if(isInWeek(weekNum,employeedates[e].integrationweek,employeedates[e].exitweek)){
                if(!data["W"+weekNum.toString()][e]){
                    data["W"+weekNum.toString()][e]=m
                }
                if(b.Login_ID==e){
                    if(projectsdata[b.WO_number]==undefined){
                        data["W"+weekNum.toString()][e]["xR non Available"]+=Math.round(b.ST)
                    }else{
                        switch(projectsdata[b.WO_number].name) {
                            case "Holidays":
                                data["W"+weekNum.toString()][e]["Holidays"]+=Math.round(b.ST)
                                
                                break;
                            case "Training":
                                data["W"+weekNum.toString()][e]["Training"]+=Math.round(b.ST)
                                break;
                            case "Idle":
                                data["W"+weekNum.toString()][e]["Idle"]+=Math.round(b.ST)
                                break;
                            default:
                                data["W"+weekNum.toString()][e]["Projects"]+=Math.round(b.ST)
                          }
                    }
                    data["W"+weekNum.toString()][e]["Missed"]-=Math.round(b.ST)
                }

                
                m = {
                    "Projects":0,
                    "Holidays":0,
                    "Training":0,
                    "Idle":0,
                    "xR non Available":0,
                    "Missed":44
                }
                
            }
        }

        
        
          
        
        
    })
    
    fs.writeFileSync("./data/tobedisplayed/employeeslistchartdata.json", JSON.stringify(data, null, 2) , err => {
        if (err) console.log("Error writing file:", err);
      });
    console.log("Donnutchart data ready !!!")
}

const filltreemapchartdata =()=>{
    const filtereddata =JSON.parse( fs.readFileSync("./data/filteredsource.json",
            {encoding:'utf8', flag:'r'}));
    
    const projectsdata =JSON.parse( fs.readFileSync("./data/fromdb/projects.json",
            {encoding:'utf8', flag:'r'}));
    
    
    let data = {}
    filtereddata.forEach(p=>{
        
        if(projectsdata[p.WO_number]){
            if(!data[projectsdata[p.WO_number].bu]){
                data[projectsdata[p.WO_number].bu]=0
            }
            data[projectsdata[p.WO_number].bu]+=Math.round(p.ST)
        }
    })
    
    fs.writeFileSync("./data/tobedisplayed/treemapchartdata.json", JSON.stringify(data, null, 2) , err => {
        if (err) console.log("Error writing file:", err);
      });
    console.log("Treemapchart data ready !!!")
}

const fillradialchartdata =()=>{
    const donutchartdata =JSON.parse( fs.readFileSync("./data/tobedisplayed/donutchartdata.json",
            {encoding:'utf8', flag:'r'}));
    var efficiencies=[];
    Object.keys(donutchartdata).forEach( key => {
        sum=donutchartdata[key]["Projects"]+donutchartdata[key]["Missed"]+donutchartdata[key]["Idle"]+donutchartdata[key]["Training"]+donutchartdata[key]['xR non Available']
        
        efficiencies.push((donutchartdata[key]["Projects"]+donutchartdata[key]["xR non Available"])/sum)
    });
    const average = array => array.reduce((a, b) => a + b) / array.length;
    

    data={'efficiency':(average(efficiencies)*100).toFixed(2)}

    fs.writeFileSync("./data/tobedisplayed/radialchartdata.json", JSON.stringify(data, null, 2) , err => {
        if (err) console.log("Error writing file:", err);
      });
    console.log("Radialchart data ready !!!")
}
const filllinechartdata =()=>{
    const donutchartdata =JSON.parse( fs.readFileSync("./data/tobedisplayed/donutchartdata.json",
            {encoding:'utf8', flag:'r'}));
    const employeedates =JSON.parse( fs.readFileSync("./data/fromdb/employees.json",
        {encoding:'utf8', flag:'r'}));

    var data={
        "January": 0,
        "February": 0,
        "March": 0,
        "April": 0,
        "May": 0,
        "June": 0,
        "July": 0,
        "August": 0,
        "September": 0,
        "October": 0,
        "November": 0,
        "December": 0
      }

      for (let i = 1; i <= 52; i++) {
        data[mounthweek[i]]+=headCount(i,employeedates)
      }
      for (let i = 1; i < 13; i++) {
        const is5=i%3==0 ? 1:0
        data[Object.keys(data)[i-1]]=data[Object.keys(data)[i-1]]/(4+is5)
        
      }
    fs.writeFileSync("./data/tobedisplayed/linechartdata.json", JSON.stringify(data, null, 2) , err => {
        if (err) console.log("Error writing file:", err);
      });
    console.log("Linechartdata data ready !!!")
}

async function  fillData(){
    console.log("=> filling data to be displayed ...")
    filldonutchartdata();
    filltreemapchartdata();
    fillradialchartdata();
    filllinechartdata()
    fillemployeeslistchartdata()
}

async function  excelToJson(){
    filterdata()
    fillData()
}

exports.isLogged=isLogged
exports.fillData=fillData
exports.excelToJson=excelToJson
exports.readPeopleFromDB=readPeopleFromDB
exports.readProjectsFromDB=readProjectsFromDB

