// var http = require('http');
// 
// //Lets define a port we want to listen to
// const PORT=8090; 
// 
// //We need a function which handles requests and send response
// function handleRequest(request, response){
// 	console.log(request);    
// 	response.end('It Works!! Path Hit: ' + request.url);
// }
// 
// //Create a server
// var server = http.createServer(handleRequest);
// 
// //Lets start our server
// server.listen(PORT, function(){
//     //Callback triggered when server is successfully listening. Hurray!
//     console.log("Server listening on: http://localhost:%s", PORT);
// });
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs      = require('fs')
var multipart = require('connect-multiparty')
// Put these statements before you define any routes.
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(multipart());

app.get('/', function(req,res) {
	res.send("You connected...........")
})

app.post('/export', function(req, res){
	for( data in req.body) {
		var imageData= req.body[data];
		var iData=JSON.parse(imageData);
		console.log(iData.narrative);
			reqdata = iData.image;
			reqdata = reqdata.replace(/^data:image\/png;base64,/, "");
			binaryData  =   new Buffer(reqdata, 'base64').toString('binary');
			fs.writeFile(data+".png", binaryData, "binary", function (err) {
			    console.log(err); // writes out file without error, but it's not a valid image
			});
	}
	res.send("success")

	// res.send(string);
	// res.send('id: ' + req.query.id);
});

app.listen(3000);