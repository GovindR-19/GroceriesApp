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

server.post('/items', async (request, response) =>{
    try{
        console.log("Request Received: ",request.body);
        const { item_name, item_count, category_id, toggle  } = request.body;

        
        const allItems = await pool.query(`
            INSERT INTO items (category_id, item_name, item_count, toggle)
            VALUES ($1, $2, $3, $4 ) RETURNING * ;`,
            [category_id, item_name, item_count, toggle ]
            );

        response.json(allItems.rows[0]);
    }

    catch(err){
        console.error(err.message);
        response.status(800).send('Server Error');
    }
})

server.listen(port, ()=>{
    console.log(`Server running at http://localhost:${port}/`);
});