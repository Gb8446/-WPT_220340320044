
const express = require('express');
const app = express();
const mysql=require('mysql2');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'cdac',
    database: 'jalgaon',
	port:3306
});


app.use(express.static('abc'));

//whether you want nested objects support  or not

app.get('/getbookdetail', function (req, res) {
	 let input=req.query.x
	  let output={status:false,bookdetails:{bookid:1,bookname:'History',price:50}};
	  
	connection.query('select * from book where bookid=?',[input],(error,res1)=>{

		if(res1.length>0){
			output.status=true;
			output.bookdetails=res1[0]
		
		}

		res.send(output);
	});


	});
	
	app.get('/adddetails', function (req, res) {
		let input={bookid:req.query.x,bookname:req.query.y,price:req.query.z};
		 let output=false;
		 
	   connection.query('insert into book (bookid,bookname,price) values (?,?,?)',[input.bookid,input.bookname,input.price],(error,res1)=>{
			
		if(error){

		}
		 else  if(res1.affectedRows>0){
			   output=true;
			  
		   }
   
		   res.send(output);
	   });
   
   
	   });

	   app.get('/updatedetails', function (req, res) {
		let input={bookid:req.query.x,bookname:req.query.y,price:req.query.z};
		 let output=false;
		 
	   connection.query('update book set bookname=?,price=? where bookid=?',[input.bookname,input.price,input.bookid],(error,res1)=>{
			
		if(error){

		}
		 else  if(res1.affectedRows>0){
			   output=true;
			  
		   }
   
		   res.send(output);
	   });
   
   
	   });


	app.get('/getalldetail', function (req, res) {
		
		 
	   connection.query('select * from book',[],(error,rows)=>{
   
		   res.send(rows);
	   });
   
   
	   });
   




app.listen(8081, function () {
    console.log("server listening at port 8081...");
});