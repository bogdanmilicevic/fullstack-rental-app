import express from "express";

import { VikendicaKontroler } from "../kontroleri/vikendicaKontroler";
const VikendicaRuter = express.Router();

VikendicaRuter.route("/sveVikendice").get((req, res) => new VikendicaKontroler().sveVikendice(req, res));

VikendicaRuter.route("/sveVikendice1").get((req, res) => new VikendicaKontroler().sveVikendice1(req, res));

VikendicaRuter.route("/pretrazi").post((req, res) => new VikendicaKontroler().pretrazi(req, res));

VikendicaRuter.route("/brojVikendica").get((req, res) => new VikendicaKontroler().brojVikendica(req, res));

VikendicaRuter.route("/oceniVikendicu").post((req, res) => new VikendicaKontroler().oceniVikendicu(req, res));

VikendicaRuter.route("/dodajSliku").post((req, res) => new VikendicaKontroler().dodajSliku(req, res));

VikendicaRuter.route("/ukloniSliku").post((req, res) => new VikendicaKontroler().ukloniSliku(req, res));

VikendicaRuter.route("/promeniNaziv").post((req, res) => new VikendicaKontroler().promeniNaziv(req, res));

VikendicaRuter.route("/promeniMesto").post((req, res) => new VikendicaKontroler().promeniMesto(req, res));

VikendicaRuter.route("/promeniUsluge").post((req, res) => new VikendicaKontroler().promeniUsluge(req, res));

VikendicaRuter.route("/promeniLetnjuCenu").post((req, res) => new VikendicaKontroler().promeniLetnjuCenu(req, res));

VikendicaRuter.route("/promeniZimskuCenu").post((req, res) => new VikendicaKontroler().promeniZimskuCenu(req, res));

VikendicaRuter.route("/promeniX").post((req, res) => new VikendicaKontroler().promeniX(req, res));

VikendicaRuter.route("/promeniY").post((req, res) => new VikendicaKontroler().promeniY(req, res));

VikendicaRuter.route("/promeniTelefon").post((req, res) => new VikendicaKontroler().promeniTelefon(req, res));

VikendicaRuter.route("/promeniKapacitet").post((req, res) => new VikendicaKontroler().promeniKapacitet(req, res));

VikendicaRuter.route("/dodajVikendicu").post((req, res) => new VikendicaKontroler().dodajVikendicu(req, res));

VikendicaRuter.route("/blokirajVikendicu").post((req, res) => new VikendicaKontroler().blokirajVikendicu(req, res));

VikendicaRuter.route("/obrisiVikendicu").post((req, res) => new VikendicaKontroler().obrisiVikendicu(req, res));

VikendicaRuter.route("/funkcija").post((req, res) => new VikendicaKontroler().funkcija(req, res));

VikendicaRuter.route("/funkcija2").post((req, res) => new VikendicaKontroler().funkcija2(req, res));
export default VikendicaRuter;