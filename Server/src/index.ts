import express from "express";
import "./db";
import router from "./routers/note"
import cors from 'cors'
// create a server
const app = express();

//this will parse json data
app.use(express.json());
//this will parse html from data
app.use(express.urlencoded({ extended: false }));
//To avoid CORS problem
app.use(cors());


app.post("/", (req, res) => {
  console.log(req.body);
  res.json({ message: "I am listening to home!" });
});

app.use("/note",router)

// listen to some port(open localhost:8000 on browser)
app.listen(8000, () => {
  console.log("listening to the port 8000");
});
