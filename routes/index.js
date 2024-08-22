import express from "express";
import path from "path";
import axios from "axios";
import bodyParser from "body-parser";

// var jobDetails = [

//     {
//         title: "Genpact is hiring 2020-2024 graduates (freshers and experienced)",
//         desc: "Genpact is hiring 2020 to 2024 graduates(Freshers and experienced) for English ( Voice Process )Role :Process Associate, Customer Service - Voice Process EnglishSkillset : Fresher or Max 2yrs expieren  ...",
//         location: "HYDERABAD",

//     }, {
//         title: "Accenture is hiring 2020-2024 graduates (freshers and experienced)",
//         desc: "Accenture is hiring 2020 to 2024 graduates(Freshers and experienced)",
//         location: "Pune",

//     }, {

//         title: "TCS is hiring 2020-2024 graduates (freshers and experienced)",
//         desc: "TCS is hiring for 2024 graduates(Freshers)",
//         location: "Chennai",

//     }

// ];

const app = express();
const port = 4000;

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("../public"));

app.set("view engine", "ejs"); //This tells Express that you are using EJS for rendering views.

// Set the views directory
app.set("views", path.join(process.cwd(), "../views")); //This line sets the directory where your EJS templates are located.

// process.cwd() - /home/omkar-zurange/code/Testing/routes

// app.get("/", (req, res) => {

//     res.render("index", { jobs: jobDetails });

// });

app.get("/", async (req, res) => {
  try {
    let page = parseInt(req.query.page) || 1;

    //    console.log(page);

    const jobDetails = await axios.get(
      "http://103.211.219.31:3000/all?page=" + page
    );

    // console.log("/"+jobDetails.data.pageNo);

    res.render("index.ejs", { jobs: jobDetails });
  } catch (error) {}
});

app.get("/filter", async (req, res) => {
 

  try {
    let page = parseInt(req.query.page) || 1;
    let jobLocation = req.query.jobLocation || "";

    //    console.log(page);

    const jobDetails = await axios.get(
      "http://103.211.219.31:3000/filter?jobLocation=" +
        jobLocation +
        "&page=" +
        page
    );

    // console.log("/"+jobDetails.data.pageNo);

    res.render("index.ejs", { jobs: jobDetails, jobLocation: jobLocation });
  } catch (error) {}
});

// app.get("/all",async (req,res)=> {

//   console.log(req.body);

// });

app.get("/getJobLocation", async (req, res) => {
  try {
    const jobLocation = await axios.get(
      "http://103.211.219.31:3000/jobLocation"
    );

    res.json(jobLocation.data);
  } catch (error) {}
});

app.listen(port, () => {
  //console.log(process.cwd());

  console.log(`website is online on port ${port}`);
});
