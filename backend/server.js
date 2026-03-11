const express = require("express");
const server = express();
const cors = require("cors");
const pool = require("./db");
const port = 3000

server.use(cors());
server.use(express.json());

//Query server for groceries details
    // Get data from database
    // convert data to JSON for display
server.get(["/","/index"], async (request, response)=>{
    try{
        const sql = "SELECT category_name, items.item_name , items.item_count , items.toggle FROM categories JOIN items ON items.category_id = categories.id;";
        const data = await pool.query(sql)
        
        const jsonReduce = data.rows.reduce((acc, item)=>
            {
                const { category_name, item_name, item_count, toggle} = item;
                
                if(!acc[category_name]){
                    acc[category_name] = [];
                }
                acc[category_name].push({item_name, item_count, toggle});
                
                return acc;
            }, {});
            
        // console.log(json(jsonReduce))
        response.json(jsonReduce);


    }
    catch(err){
        console.error(err);
        response.status(500).json({error: "Database connection failed"});
    }

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