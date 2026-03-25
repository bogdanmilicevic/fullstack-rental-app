import express from "express";
import { KorisnikKontroler } from "../kontroleri/korisnikKontroler";
const KorisnikRuter = express.Router();

KorisnikRuter.route("/login").post((req, res) => new KorisnikKontroler().login(req, res));

KorisnikRuter.route("/login1").post((req, res) => new KorisnikKontroler().login1(req, res));

KorisnikRuter.route("/dohvatiKorisnika").post((req, res) => new KorisnikKontroler().dohvatiKorisnika(req, res));

KorisnikRuter.route("/proveriKorIme").post((req, res) => new KorisnikKontroler().proveriKorIme(req, res));

KorisnikRuter.route("/proveriMejl").post((req, res) => new KorisnikKontroler().proveriMejl(req, res));

KorisnikRuter.route("/registruj").post((req, res) => new KorisnikKontroler().registruj(req, res));

KorisnikRuter.route("/sviKorisnici").get((req, res) => new KorisnikKontroler().sviKorisnici(req, res));

KorisnikRuter.route("/odbi").post((req, res) => new KorisnikKontroler().odbi(req, res));

KorisnikRuter.route("/odobri").post((req, res) => new KorisnikKontroler().odobri(req, res));

KorisnikRuter.route("/ime").post((req, res) => new KorisnikKontroler().promeniIme(req, res));

KorisnikRuter.route("/prezime").post((req, res) => new KorisnikKontroler().promeniPrezime(req, res));

KorisnikRuter.route("/adresa").post((req, res) => new KorisnikKontroler().promeniAdresu(req, res));

KorisnikRuter.route("/mejl").post((req, res) => new KorisnikKontroler().promeniMejl(req, res));

KorisnikRuter.route("/telefon").post((req, res) => new KorisnikKontroler().promeniTelefon(req, res));

KorisnikRuter.route("/kartica").post((req, res) => new KorisnikKontroler().promeniKarticu(req, res));

KorisnikRuter.route("/slika").post((req, res) => new KorisnikKontroler().promeniSliku(req, res));

KorisnikRuter.route("/deaktiviraj").post((req, res) => new KorisnikKontroler().deaktiviraj(req, res));

KorisnikRuter.route("/proveriLozinku").post((req, res) => new KorisnikKontroler().proveriLozinku(req, res));

KorisnikRuter.route("/promeniLozinku").post((req, res) => new KorisnikKontroler().promeniLozinku(req, res));

KorisnikRuter.route("/brojVlasnika").get((req, res) => new KorisnikKontroler().brojVlasnika(req, res));

KorisnikRuter.route("/brojTurista").get((req, res) => new KorisnikKontroler().brojTurista(req, res));
export default KorisnikRuter;