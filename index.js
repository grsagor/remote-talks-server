const express = require('express');
const cors = require('cors');
require('dotenv').config();
const port = 5000 || process.env.PORT;
const app = express();

app.use(cors());
app.use(express.json());

async function run(){
    try{
        app.get('/', (req,res) => {
            res.send('Remote Talks is running');
        });

    }
    finally{

    }

}
run().catch(console.log);


app.listen(port, () => {
    console.log(`Remote Talks is running on port: ${port}`);
})