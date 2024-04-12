const express = require('express');
const { mongoose } = require('mongoose');
const connectToDataBase = require('./database');
const Book = require('./model/bookModel');
const app = express();

app.use(express.json());
// yo chai jaba nodejs bata ejs ko frontend garcham teti bela use garney frontend ma react jasto technology huda use garnu parena
// app.use(express.urlencoded({extended:true}))
connectToDataBase();
app.get('/',(req,res)=>{
    res.json([{
        world:"nabin thapa"
    },
        {
            surname:"thapa"
        }
]);
})
app.post("/book",async(req,res)=>{
    const {bookName,bookPrice,isbnNumber,authorName,publishedAt} = req.body;
   await Book.create({
        bookName,
        authorName,
        publishedAt,
        bookPrice,
        isbnNumber
    });
    res.status(201).json({
        message:'Book ko data stored successfully'
    })
})
//sabai data haru lina lai get gareko
app.get('/book',async(req,res)=>{
    const books = await Book.find(); // find le chai array return garcha
    res.status(200).json({
        "message":"data haru sabai aayo hai",
        data:books
    })
})
//delete operation perform gareko
app.delete('/book/:id',async(req,res)=>{
    const {id} = req.params;
    await Book.findByIdAndDelete(id); // yelse chai null return garcha kina ki item/data chai db bata delete vaisakyo jasle null return garcha delete huda
    res.status(200).json({
        message:"Data deleted successfully"
    })
});

// yo chai book table ma vako data lai update garna ko lagi put vanda patch dherai optimize chha
app.patch('/book/:id',async(req,res)=>{ 
    const {id} = req.params;
    const {bookName,bookPrice,isbnNumber,authorName,publishedAt} = req.body;
    await Book.findByIdAndUpdate(id,{
        bookName,
        bookPrice,
        isbnNumber,
        authorName,
        publishedAt
    });
    res.status(200).json({
        message:'data updated successfully'
    });
})
app.get('/book/:id',async(req,res)=>{
    const {id} = req.params;
    const singleBook = await Book.findById(id) // findById le chai object return garcha
    try{
        if(!singleBook){
            res.status(404).json({
                message:"Book vetena"
            })
        }else{
            res.status(200).json({
                message:"single book ko lagi ho yo chai",
                singleData : singleBook
            })
        }
    }catch(error){
        res.status(500).json({
            message:"something internal problem occured"
        })
    }
   
});

app.listen(3000,()=>{
    console.log("connected to port no 3000")
})