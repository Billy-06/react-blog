/* Initialize folder as an npm project using:
* $ npm init -y
* 
* Install Express using command
* $ npm install --save express
*
* install packages from Babel to allow the 
* use of ES6
* $ npm install --save-dev @babel/core @babel/node @babel/preset-env
* 
* create a file in the root dir using
* $ touch .babelrc
*
* use command to run server
* $ npx babel-node src/server.js
*
* $ npm install --save body-parser
*
* (development mode - update server)
* $ npm install --save-dev nodemon 
* now to run server in development mode, use
* $ npx nodemon --exec npx babel-node src/server.js
* since the above is long command, just add it to 
* scripts in blog-backend/package.json scripts{  }
* 
* install mongodb package using
* $ npm install --save mongodb
* 
*/

import express from "express";
import bodyParser from "body-parser";


// const articleInfo = {
//     "learn-react":{
//         upvotes: 0,
//         comments: []
//     },
//     "learn-node":{
//         upvotes: 0,
//         comments: []
//     },
//     "my-thoughts-on-resumes":{
//         upvotes: 0,
//         comments: []
//     }
// }

// const express = require("express")
const app = express();
// const bodyParser = require("body-parser")
import { MongoClient } from "mongodb";

// const myTestRoute = express.Router();

// app.use(bodyParser.urlencoded({
//     extended: false
// }))
app.use(bodyParser.json());

// myTestRoute.use( (req, res, next) => {
//     console.log(req.params.name)
// })

const withDB = async (operations, res) => {
    try {
        const client=  await MongoClient.connect(
            "mongodb://localhost:27017",
            { useNewUrlParser: true }
            )
        const db = client.db('my-blog');

        await operations(db);
        

        client.close();
    } catch(error){
        // res.status(500).json({
        //     message: 'Error connecting to db',
        //     error
        // }).end();
        // res.status(500).send(error).end();
        console.log(error)
    }
}


app.get("/api/articles/:name", async (req, res, next)=>{
    withDB( async (db) => {
        const articleName = req.params.name;

        const articleInfo = await db.collection('articles').findOne({
            name: articleName
        })
        res.status(200).json(articleInfo);
    }, res);
    
});

app.post("/api/articles/:name/:property/", async (res, req, next) => {
    withDB(async (db) =>{
        const articleName = req.param.name;
        const articleProp = req.params.property;
        // console.dir(articleName)
        const articleInfo = await db.collection('articles').findOne({
            name: articleName
        });

        if (articleProp == "upvote") {
            await db.collection('articles').updateOne({
                name: articleName
            }, {
                '$set': {
                    upvotes: articleInfo.upvotes + 1
                }
            });
        } else if (articleProp == "comment"){
                await db.collection('articles').updateOne({
                    name: articleName
                }, {
                    '$set': {
                        comments: articleInfo.comments.concat({ username, text }),
                    },
                }); 
        } else {
            console.log(`Couldn't find property ${req.params.upvote}`)
        }
        
        const updatedArticlesInfo = await db.collection('articles').findOne({
            name: articleName
        });
        res.status(200).json(updatedArticlesInfo);

    }, res);
        
})

// app.post("/api/articles/:name/:comment", async (res, req, next) => {
//     withDB( async(db) =>{
//         const articleName = req.params['name'];
//         const { username, text } = req.body;

//         // console.log(articleName)
//         const articleInfo = await db.collection('articles').findOne({
//             name: articleName
//         });
//         await db.collection('articles').updateOne({
//             name: articleName
//         }, {
//             '$set': {
//                 comments: articleInfo.comments.concat({ username, text }),
//             },
//         });
//         const updatedArticlesInfo = await db.collection('articles').findOne({
//             name: articleName
//         });
//         res.status(200).json(updatedArticlesInfo);
//     }, res);
// })

// app.get("/hello", (req, res) => res.send("Hello World"));
// app.get("/hello/:name", (req, res) => res.send(`Hello ${ req.params.name }`));
// app.post("/hello", (req, res) => res.send(`Hello World, my name is ${req.body.name}`));

// app.use("/", myTestRouter)

app.listen(8000, () => console.log(
    "Listening on Port 8000"
));