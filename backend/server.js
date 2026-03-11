const express = require("express");
const server = express();
const cors = require("cors");
const pool = require("./db");
const port = 3000

server.use(cors());
server.use(express.json());

server.get("/", (request,response)=>{
    response.send("Groceries App");
});

server.get("/test", (request, response)=>{
    response.send("Testing, testing. Is this mike on?")
});

server.get('/items', async (request, response) =>{
    try{
        const allItems = await pool.query('SELECT * FROM items');
        response.json(allItems.rows);
    }

    catch(err){
        console.error(err.message);
        response.status(800).send('Server Error');
    }
})

server.listen(port, ()=>{
    console.log(`Server running at http://localhost:${port}/`);
});