import express from "express";

import { RezervacijaKontroler } from "../kontroleri/rezervacijaKontroler";
const RezervacijaRuter = express.Router();



RezervacijaRuter.route("/sveRezervacije").get((req, res) => new RezervacijaKontroler().sveRezervacije(req, res));

RezervacijaRuter.route("/dodajRezervaciju").post((req, res) => new RezervacijaKontroler().dodajRezervaciju(req, res));

RezervacijaRuter.route("/oceniRezervaciju").post((req, res) => new RezervacijaKontroler().oceniRezervaciju(req, res));

RezervacijaRuter.route("/otkaziRezervaciju").post((req, res) => new RezervacijaKontroler().otkaziRezervaciju(req, res));

RezervacijaRuter.route("/sveRezervacijeNeobradjene").get((req, res) => new RezervacijaKontroler().sveRezervacijeNeobradjene(req, res));

RezervacijaRuter.route("/prihvatiRezervaciju").post((req, res) => new RezervacijaKontroler().prihvatiRezervaciju(req, res));

RezervacijaRuter.route("/odbiRezervaciju").post((req, res) => new RezervacijaKontroler().odbiRezervaciju(req, res));
export default RezervacijaRuter;