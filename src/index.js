const express = require('express')
const app = express()
const port = 8080
const {newsArticleModel} = require('./connector')
const onePageArticleCount = 10


// Parse JSON bodies (as sent by API clients)
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


console.log(newsArticleModel)


app.get("/newFeeds",(req,res)=>{ 

    let  limitRecived = (req.query.limit);
    let offsetRecived = (req.query.offset);

    let limit   = parseInt(Number(limitRecived));
    let offset  = parseInt(Number(offsetRecived));

    console.log((limit),(offset));
    console.log(isNaN(limit),isNaN(offset));
    if(!limitRecived){
        limit = onePageArticleCount;

    }

    if(!offsetRecived){

        offset=0;
    }


    if(isNaN(offset)){

        offset=0;
    }

    if(isNaN(limit)||limit<0){
        limit = onePageArticleCount;

        if(!offsetRecived){
            offset=0;
        }
    }
    

    const values = {};
    values.skip = offset;
    values.limit = limit;

 
    newsArticleModel.countDocuments({},function(error){
        if(error){
            res.status(500).send({message:error.message});
            return;
        }

        newsArticleModel.find({},{},values,function(error,result){
            

            if(error){
                res.status(500).send({message:error.message});
                return;
               

            }
            else{

                res.status(200).send(result);
               

            }
            
        })
        
      

    })

  



});






app.listen(port, () => console.log(`App listening on port ${port}!`))

module.exports = app;