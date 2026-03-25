import * as express from "express";
import KorisnikModel from "../modeli/korisnik";
import crypto from 'crypto';
export class KorisnikKontroler {
  login = (req: express.Request, res: express.Response) => {
    let kor_ime = req.body.kor_ime;
    let lozinka = req.body.lozinka;
    let hashLozinka = crypto.createHash('sha256').update(lozinka).digest('hex');
    
    KorisnikModel.findOne({ kor_ime: kor_ime, lozinka: hashLozinka, status:"aktivan"})
      .then((user) => {
        res.json(user);
      })
      .catch((err) => console.log(err));
  };
  login1 = (req: express.Request, res: express.Response) => {
    let kor_ime = req.body.kor_ime;
    let lozinka = req.body.lozinka;
    let hashLozinka = crypto.createHash('sha256').update(lozinka).digest('hex');
    let tip=req.body.tip
    KorisnikModel.findOne({ kor_ime: kor_ime, lozinka: hashLozinka,tip:tip, status:"aktivan"})
      .then((user) => {
        res.json(user);
      })
      .catch((err) => console.log(err));
  };

  dohvatiKorisnika = (req: express.Request, res: express.Response) => {
    let kor_ime = req.body.kor_ime;

    KorisnikModel.findOne({ kor_ime: kor_ime })
      .then((user) => {
        res.json(user);
      })
      .catch((err) => console.log(err));
  };
  proveriKorIme = (req: express.Request, res: express.Response) => {
    let kor_ime = req.body.kor_ime;

    KorisnikModel.findOne({ kor_ime: kor_ime })
      .then((user) => {
        if(user){ 
          res.json({msg:"Postoji"});
        }else{
          res.json({msg:"Ne postoji"});
        }
        
      })
      .catch((err) => console.log(err));
  };

  proveriLozinku = (req: express.Request, res: express.Response) => {
    let kor_ime = req.body.kor_ime;
    let lozinka=req.body.lozinka
    let hashLozinka = crypto.createHash('sha256').update(lozinka).digest('hex');
    KorisnikModel.findOne({ kor_ime: kor_ime,lozinka:hashLozinka })
      .then((user) => {
        if(user){ 
          res.json({msg:"OK"});
        }else{
          res.json({msg:"NIJE"});
        }
        
      })
      .catch((err) => console.log(err));
  };

  promeniLozinku = (req: express.Request, res: express.Response) => {
    let kor_ime = req.body.kor_ime;
    let lozinka=req.body.lozinka
    let hashLozinka = crypto.createHash('sha256').update(lozinka).digest('hex');
    KorisnikModel.updateOne({ kor_ime: kor_ime },{$set:{lozinka:hashLozinka}})
      .then((user) => {
        if(user==null){ 
          res.json({msg:"OK"});
        }else{
          res.json({msg:"NIJE"});
        }
        
      })
      .catch((err) => console.log(err));
  };


  proveriMejl = (req: express.Request, res: express.Response) => {
    let mejl=req.body.mejl;

    KorisnikModel.findOne({ mejl: mejl })
      .then((user) => {
        if(user==null){ 
          res.json({msg:"OK"});
        }else{
          res.json({msg:"NIJE"});
        }
        
      })
      .catch((err) => console.log(err));
  };

  registruj = async (req: express.Request, res: express.Response) => {
    let korisnik=new KorisnikModel(req.body)
    let lozinka=req.body.lozinka
    let hashLozinka = crypto.createHash('sha256').update(lozinka).digest('hex');
    korisnik.lozinka=hashLozinka
    korisnik.slika=req.body.slika
    korisnik.save().then((message)=>{
      res.json({msg:"OK"});
    }).catch((err) => console.log(err));

    
  };
  sviKorisnici = (req: express.Request, res: express.Response) => {

    KorisnikModel.find({tip: { $in: ['turista', 'vlasnik']}})
      .then((korisnici) => {
          res.json(korisnici);
      }).catch((err) => console.log(err));
  };

  odbi = (req: express.Request, res: express.Response) => {
    let kor_ime=req.body.kor_ime
    KorisnikModel.updateOne({ kor_ime: kor_ime}, { $set: { "status": "odbijen" } })
      .then((korisnici) => {
          res.json({msg:"OK"});
      }).catch((err) => console.log(err));
  };

  deaktiviraj = (req: express.Request, res: express.Response) => {
    let kor_ime=req.body.kor_ime
    KorisnikModel.updateOne({ kor_ime: kor_ime}, { $set: { "status": "deaktiviran" } })
      .then((korisnici) => {
          res.json({msg:"OK"});
      }).catch((err) => console.log(err));
  };

  odobri = (req: express.Request, res: express.Response) => {
    let kor_ime=req.body.kor_ime
    KorisnikModel.updateOne({ kor_ime: kor_ime}, { $set: { "status": "aktivan" } })
      .then((korisnici) => {
          res.json({msg:"OK"});
      }).catch((err) => console.log(err));
  }
  promeniIme = (req: express.Request, res: express.Response) => {
    let kor_ime=req.body.kor_ime
    let ime=req.body.ime
    KorisnikModel.updateOne({ kor_ime: kor_ime}, { $set: { "ime": ime } })
      .then((korisnici) => {
          res.json({msg:"OK"});
      }).catch((err) => console.log(err));
  }
  promeniPrezime = (req: express.Request, res: express.Response) => {
    let kor_ime=req.body.kor_ime
    let prezime=req.body.prezime
    KorisnikModel.updateOne({ kor_ime: kor_ime}, { $set: { "prezime": prezime } })
      .then((korisnici) => {
          res.json({msg:"OK"});
      }).catch((err) => console.log(err));
  }
  promeniAdresu = (req: express.Request, res: express.Response) => {
    let kor_ime=req.body.kor_ime
    let adresa=req.body.adresa
    KorisnikModel.updateOne({ kor_ime: kor_ime}, { $set: { "adresa": adresa } })
      .then((korisnici) => {
          res.json({msg:"OK"});
      }).catch((err) => console.log(err));
  }
  promeniTelefon = (req: express.Request, res: express.Response) => {
    let kor_ime=req.body.kor_ime
    let telefon=req.body.telefon
    KorisnikModel.updateOne({ kor_ime: kor_ime}, { $set: { "telefon": telefon } })
      .then((korisnici) => {
          res.json({msg:"OK"});
      }).catch((err) => console.log(err));
  }
  promeniMejl = (req: express.Request, res: express.Response) => {
    let kor_ime=req.body.kor_ime
    let mejl=req.body.mejl
    KorisnikModel.updateOne({ kor_ime: kor_ime}, { $set: { "mejl": mejl } })
      .then((korisnici) => {
          res.json({msg:"OK"});
      }).catch((err) => console.log(err));
  }
  promeniKarticu = (req: express.Request, res: express.Response) => {
    let kor_ime=req.body.kor_ime
    let kartica=req.body.kartica
    KorisnikModel.updateOne({ kor_ime: kor_ime}, { $set: { "broj_kartice": kartica } })
      .then((korisnici) => {
          res.json({msg:"OK"});
      }).catch((err) => console.log(err));
  }
  promeniSliku = (req: express.Request, res: express.Response) => {
    let kor_ime=req.body.kor_ime
    let slika=req.body.slika
    KorisnikModel.updateOne({ kor_ime: kor_ime}, { $set: { "slika": slika } })
      .then((korisnici) => {
          res.json({msg:"OK"});
      }).catch((err) => console.log(err));
  }
  brojVlasnika= (req: express.Request, res: express.Response) => {
    
    KorisnikModel.find({ tip: "vlasnik",status:"aktivan"})
      .then((korisnici) => {
          res.json({msg:korisnici.length});
      }).catch((err) => console.log(err));
  }
  brojTurista= (req: express.Request, res: express.Response) => {
    
    KorisnikModel.find({ tip: "turista",status:"aktivan"})
      .then((korisnici) => {
          res.json({msg:korisnici.length});
      }).catch((err) => console.log(err));
  }
}