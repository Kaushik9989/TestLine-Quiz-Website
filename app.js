const express = require('express')
const app = express()
const path = require('path')
const ejsMate = require("ejs-mate");
const axios = require("axios");




// EJS SETUP

app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "./views"));





app.listen(3000,()=>{
    console.log("Listening on port 3000")
})

// RENDERING WEBPAGES


app.get("/",(req,res)=>{
    res.render("pages/home2.ejs");
})

app.get("/category",(req,res)=>{
    res.render("pages/category.ejs");

});

// RETRIEVING INFO FROM JSON DOC


app.get("/quiz", async (req, res) => {
    try {
      
        const response = await axios.get("https://api.jsonserve.com/Uw5CrX");
        console.log(response.data.questions );
        let data= response.data;
        if (!response.data.questions || !Array.isArray(response.data.questions)) {
            return res.status(500).send("Invalid quiz data format.");
        }
        res.render("pages/quiz2.ejs", {data });
    } catch (error) {
        console.error("Error fetching questions:", error);
        res.status(500).send("Failed to load quiz questions.");
    }
});

app.get("/terms",(req,res)=>{
    res.render("pages/policy.ejs");
})

app.get("/about",(req,res)=>{
    res.render("pages/aboutus.ejs");
})