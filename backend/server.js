const express = require("express");
const server = express();
const port = 3000

server.get("/", (request,response)=>{
    response.send("App One");
})

server.listen(port, ()=>{
    console.log(`Server running at http://localhost:${port}/`);
})