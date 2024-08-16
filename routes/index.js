import express from "express";
import path from "path";


var jobs = [

    {
        title: "Genpact is hiring 2020-2024 graduates (freshers and experienced)",
        desc: "Genpact is hiring 2020 to 2024 graduates(Freshers and experienced) for English ( Voice Process )Role :Process Associate, Customer Service - Voice Process EnglishSkillset : Fresher or Max 2yrs expieren  ...",
        location: "HYDERABAD",

    }, {
        title: "Accenture is hiring 2020-2024 graduates (freshers and experienced)",
        desc: "Accenture is hiring 2020 to 2024 graduates(Freshers and experienced)",
        location: "Pune",

    }, {

        title: "TCS is hiring 2020-2024 graduates (freshers and experienced)",
        desc: "TCS is hiring for 2024 graduates(Freshers)",
        location: "Chennai",

    }

];


const app = express();
const port = 3000;

app.use(express.static("../public"));

app.set('view engine', 'ejs'); //This tells Express that you are using EJS for rendering views. 

// Set the views directory
app.set('views', path.join(process.cwd(), '../views')); //This line sets the directory where your EJS templates are located.

// process.cwd() - /home/omkar-zurange/code/Testing/routes

app.get("/", (req, res) => {

    res.render("index", { jobs: jobs });

});

















app.listen(port, () => {

    //console.log(process.cwd());

    console.log(`website is online on port ${port}`);


});