import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import korisnikRuter from "./ruteri/korisnik.ruter";
import vikendicaRuter from "./ruteri/vikendica.ruter";
import rezervacijaRuter from "./ruteri/rezervacija.ruter";


const app = express();
app.use(cors());
app.use(express.json({ limit: '100mb' })); 
app.use(express.urlencoded({ limit: '100mb', extended: true }));

mongoose.connect("mongodb://127.0.0.1:27017/projekat2025");
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("db connection ok");
});

const router = express.Router();
router.use("/korisnici", korisnikRuter);
router.use("/vikendice", vikendicaRuter);
router.use("/rezervacije", rezervacijaRuter);

app.use("/", router);

app.listen(4000, () => console.log(`Express server running on port 4000`));

