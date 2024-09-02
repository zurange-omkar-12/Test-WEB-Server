import express from "express";
import path from "path";
import axios from "axios";
import bodyParser from "body-parser";
import fs from 'fs';

import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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


app.get('/images/:CompanyName', (req, res) => {

  //console.log(__filename); // /home/omkar-zurange/TestServer/webServer/routes/index.js
  //console.log(__dirname); // /home/omkar-zurange/TestServer/webServer/routes
  
  

  const imageDir = path.join(__dirname, '../public/images');
  const imageName = req.params.CompanyName + ".png";
  const defaultImage = 'Logo.png';

  //console.log(imageName);
  

  // Check if the image exists
  const imagePath = path.join(imageDir, imageName);
  const imageSrc = fs.existsSync(imagePath) ? imageName : defaultImage;

  //console.log(path.join(imageDir, imageSrc));
  

  res.sendFile(path.join(imageDir, imageSrc));
});



app.get("/", async (req, res) => {
  try {
    let page = parseInt(req.query.page) || 1;

    //    console.log(page);

    const jobDetails = await axios.get(
      "http://103.211.219.31:3000/all?page=" + page
    );

    // console.log(jobDetails.data.uniqueskills);

    res.render("index.ejs", { jobs: jobDetails });
  } catch (error) {}
});

app.get("/filter", async (req, res) => {
  try {
    const jobLocation = req.query.jobLocation || "";
    let jobExperience = req.query.jobExperience || "";
    const jobSkills = req.query.jobSkills || "";
    const pageNo = parseInt(req.query.page) || 1;

    console.log(
      `/filter?jobSkills=${jobSkills}&jobExperience=${jobExperience}&jobLocation=${jobLocation}`
    );

    const jobDetails = await axios.get(
      `http://103.211.219.31:3000/filter?jobSkills=${jobSkills}&jobExperience=${jobExperience}&jobLocation=${jobLocation}&page=${pageNo}`
    );

    console.log("/" + jobDetails.data.pageNo);
    
    res.render("index.ejs", {
      jobs: jobDetails,
      jobLocation: jobLocation,
      jobExperience: jobExperience,
      jobSkills: jobSkills,
    });
  } catch (error) {
    res.redirect("/");
  }
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

app.get("/jobs/:jobId", async (req, res) => {
  const jobreqId = req.params.jobId;

  try {
    const JOB = await axios.get(`http://103.211.219.31:3000/jobs/${jobreqId}`);

    res.render("jobs.ejs", { JOB: JOB });
  } catch (error) {}
});


app.get('/sitemap.xml', (req, res) => {

  console.log("Sitemap");

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://getjobopenings.com/</loc>
    <lastmod>2024-09-02T20:01:17+00:00</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.00</priority>
  </url>
  <url>
    <loc>https://getjobopenings.com/jobs/400</loc>
    <lastmod>2024-09-02T20:01:17+00:00</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.80</priority>
  </url>
  <url>
    <loc>https://getjobopenings.com/jobs/201</loc>
    <lastmod>2024-09-02T20:01:17+00:00</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.80</priority>
  </url>
  <url>
    <loc>https://getjobopenings.com/jobs/401</loc>
    <lastmod>2024-09-02T20:01:17+00:00</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.80</priority>
  </url>
  <url>
    <loc>https://getjobopenings.com/jobs/402</loc>
    <lastmod>2024-09-02T20:01:17+00:00</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.80</priority>
  </url>
  <url>
    <loc>https://getjobopenings.com/jobs/02</loc>
    <lastmod>2024-09-02T20:01:17+00:00</lastmod>
    <priority>0.80</priority>
  </url>
  <url>
    <loc>https://getjobopenings.com/jobs/4</loc>
    <lastmod>2024-09-02T20:01:17+00:00</lastmod>
    <priority>0.80</priority>
  </url>
  <url>
    <loc>https://getjobopenings.com/jobs/203</loc>
    <lastmod>2024-09-02T20:01:17+00:00</lastmod>
    <priority>0.80</priority>
  </url>
  <url>
    <loc>https://getjobopenings.com/jobs/1</loc>
    <lastmod>2024-09-02T20:01:17+00:00</lastmod>
    <priority>0.80</priority>
  </url>
</urlset>`;

  res.header('Content-Type', 'application/xml');
  res.send(sitemap);
});



app.listen(port, () => {
  //console.log(process.cwd());
  console.log(`website is online on port ${port}`);
});
