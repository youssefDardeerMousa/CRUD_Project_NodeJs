import express from 'express'
import mysql from 'mysql2'
 import cors from "cors"
const app=express()
app.use(express.json())
// access to work your api in frontend
app.use(cors())

const connection=mysql.createConnection({
host:"localhost",
port:3306,
user:"root",
password:"root",
database:"products"
})
 
app.post('/send',(req,res)=>{
    let{name,price,description}=req.body;
    connection.query(`INSERT INTO detailsproduct (name, price, description) VALUES ("${name}",${price},"${description}")`,(error,result)=>{
        if(error){
            res.json({status:404,message:error.message,result:false})
        }
        else{
            res.json({status:200,result,message:"successful",result:true})
        }
    })
})
app.patch('/edit/:id',(req,res)=>{
    let{name,price,description}=req.body;

let {id}=req.params;
connection.query(`UPDATE detailsproduct SET name='${name}',price=${price},description="${description}" WHERE id=${id}`,(err,result)=>{
if(err){
    return res.json({status:404,success:false,message:err.message})
}
else if(result.affectedRows){
    return res.json({status:200,success:true,message:"successful adding"}) 
}
else{
    return res.json({status:404,success:false,message:"the product is not found"}) 

}
})
})
app.delete('/delete/:id',(req,res)=>{

let {id}=req.params;
connection.query(`DELETE FROM detailsproduct WHERE id=${id}`,(err,result)=>{
   
if(err){
    return res.json({status:404,success:false,message:err.message})
}
else if(result.affectedRows){
    return res.json({status:200,success:true,message:"successful deleting"}) 
}
else{
    return res.json({status:404,success:false,message:"the product is not found"}) 

}
})
})
app.get("/get",(req,res)=>{
  
    connection.query(`SELECT * FROM detailsproduct`,(err,results)=>{
      
        if(err){
            res.json({status:404,success:false,message:err.message})
        }
        else if(results.length==0){
            connection.query("TRUNCATE TABLE detailsproduct",(err,results)=>{
                return res.json({status:200,success:true,data:results})
            })
        }
        else{
            res.json({success:true,status:200,data:results})
        }
    })
})
app.listen(3000,()=>{
    console.log("Server Is Running");
})