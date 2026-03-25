import * as express from "express";
import VikendicaModel from "../modeli/vikendica";
import RezervacijaModel from "../modeli/rezervacija";
export class VikendicaKontroler {
  sveVikendice = (req: express.Request, res: express.Response) => {
  VikendicaModel.find()
    .then((vikendice) => {
      const sada = new Date();

      const filtrirane = vikendice.filter((v) => {
        if (!v.datumBlokiranja) return true; 

        const datumBlokiranja = new Date(v.datumBlokiranja);
        const prosloMs = sada.getTime() - datumBlokiranja.getTime();

        
        const prosloSati = prosloMs / (1000 * 60 * 60);
        return prosloSati > 48;
      });

      res.json(filtrirane);
    })
    .catch((err) => {
      console.error("Greška prilikom čitanja vikendica:", err);
      res.status(500).json({ message: "Greška na serveru" });
    });
};
  sveVikendice1 = (req: express.Request, res: express.Response) => {
    VikendicaModel.find()
      .then((vikendice) => {
    
      
      
    res.json(vikendice);
      })
      .catch((err) => console.log(err));
  };

  pretrazi = (req: express.Request, res: express.Response) => {
    let naziv=req.body.naziv
    let mesto=req.body.mesto
    VikendicaModel.find({naziv: { $regex: '^' + naziv, $options: 'i' },mesto: { $regex: '^' + mesto, $options: 'i' }})
      .then((vikendice) => {
        res.json(vikendice);
      })
      .catch((err) => console.log(err));
  };

  brojVikendica = (req: express.Request, res: express.Response) => {
    
    VikendicaModel.find()
      .then((vikendice) => {
        res.json({msg:vikendice.length});
      })
      .catch((err) => console.log(err));
  };

  oceniVikendicu = (req: express.Request, res: express.Response) => {
    let naziv=req.body.naziv
    let kor_ime=req.body.kor_ime
    let komentar=req.body.komentar
    let ocena=req.body.ocena
    let brojOcena=0
    let zbir=0
    let noviProsek=0
    
    VikendicaModel.findOne({naziv:naziv})
      .then((vikendica) => {
        let naziv=req.body.naziv 
        let kor_ime=req.body.kor_ime 
        let komentar=req.body.komentar 
        let ocena=req.body.ocena 
        let brojOcena=0 
        let zbir=0 
        let noviProsek=0 
        VikendicaModel.findOne({naziv:naziv}) 
        .then((vikendica) => { 
          if(vikendica?.broj_recenzija)
            brojOcena=vikendica.broj_recenzija 
          if(vikendica?.prosecna_ocena)zbir=brojOcena*vikendica.prosecna_ocena 
          zbir=zbir+ocena 
          noviProsek=zbir/(brojOcena+1) 
          VikendicaModel.updateOne({naziv:naziv},{$set:{prosecna_ocena:noviProsek,broj_recenzija:brojOcena+1}}) 
          .then((vikendica) => { 
            VikendicaModel.updateOne({ 'naziv': naziv }, { $push: { 'recenzije': { 'komentar': komentar, 'ocena': ocena,'recerzent':kor_ime} } })
            .then(ok=>{ res.json({ 'msg': 'ok' }) })
            .catch(err=>{ res.json({ 'msg': err }) }) }) 
            .catch((err) => console.log(err)); }) 
            .catch((err) => console.log(err));}) 
  };

  dodajSliku=(req: express.Request, res: express.Response) => {
    let naziv=req.body.naziv
    let base64code=req.body.base64code
    VikendicaModel.updateOne({naziv:naziv},{$push:{slike:{base64code:base64code}}})
      .then((vikendice) => {
        res.json({msg:"OK"});
      })
      .catch((err) => console.log(err));
  };
  ukloniSliku=(req: express.Request, res: express.Response) => {
    let naziv=req.body.naziv
    let base64code=req.body.base64code
    VikendicaModel.updateOne({naziv:naziv, "slike.base64code": base64code},{$pull:{slike:{base64code:base64code}}})
      .then((vikendice) => {
        res.json({msg:"OK"});
      })
      .catch((err) => console.log(err));
    }; 
  promeniNaziv=(req: express.Request, res: express.Response) => {
    let naziv=req.body.naziv
    let vlasnik=req.body.vlasnik
    let stariNaziv=req.body.stariNaziv
    VikendicaModel.updateOne({naziv:stariNaziv,vlasnik:vlasnik},{$set:{naziv:naziv}})
      .then((vikendice) => {
        res.json({msg:"OK"});
      })
      .catch((err) => console.log(err));
  }; 
  promeniMesto=(req: express.Request, res: express.Response) => {
    let naziv=req.body.naziv
    let vlasnik=req.body.vlasnik
    let mesto=req.body.mesto
    VikendicaModel.updateOne({naziv:naziv,vlasnik:vlasnik},{$set:{mesto:mesto}})
      .then((vikendice) => {
        res.json({msg:"OK"});
      })
      .catch((err) => console.log(err));
  }; 
  promeniUsluge=(req: express.Request, res: express.Response) => {
    let naziv=req.body.naziv
    let vlasnik=req.body.vlasnik
    let usluge=req.body.usluge
    VikendicaModel.updateOne({naziv:naziv,vlasnik:vlasnik},{$set:{opis_vikendice:usluge}})
      .then((vikendice) => {
        res.json({msg:"OK"});
      })
      .catch((err) => console.log(err));
  };
  promeniLetnjuCenu=(req: express.Request, res: express.Response) => {
    let naziv=req.body.naziv
    let vlasnik=req.body.vlasnik
    let cena=req.body.cena
    VikendicaModel.updateOne({naziv:naziv,vlasnik:vlasnik},{$set:{letnja_cena:cena}})
      .then((vikendice) => {
        res.json({msg:"OK"});
      })
      .catch((err) => console.log(err));
  }; 
  promeniZimskuCenu=(req: express.Request, res: express.Response) => {
    let naziv=req.body.naziv
    let vlasnik=req.body.vlasnik
    let cena=req.body.cena
    VikendicaModel.updateOne({naziv:naziv,vlasnik:vlasnik},{$set:{zimska_cena:cena}})
      .then((vikendice) => {
        res.json({msg:"OK"});
      })
      .catch((err) => console.log(err));
  };
  promeniX=(req: express.Request, res: express.Response) => {
    let naziv=req.body.naziv
    let vlasnik=req.body.vlasnik
    let x=req.body.x
    VikendicaModel.updateOne({naziv:naziv,vlasnik:vlasnik},{$set:{x:x}})
      .then((vikendice) => {
        res.json({msg:"OK"});
      })
      .catch((err) => console.log(err));
  };
  promeniY=(req: express.Request, res: express.Response) => {
    let naziv=req.body.naziv
    let vlasnik=req.body.vlasnik
    let y=req.body.y
    VikendicaModel.updateOne({naziv:naziv,vlasnik:vlasnik},{$set:{y:y}})
      .then((vikendice) => {
        res.json({msg:"OK"});
      })
      .catch((err) => console.log(err));
  };
  promeniTelefon=(req: express.Request, res: express.Response) => {
    let naziv=req.body.naziv
    let vlasnik=req.body.vlasnik
    let telefon=req.body.telefon
    VikendicaModel.updateOne({naziv:naziv,vlasnik:vlasnik},{$set:{telefon:telefon}})
      .then((vikendice) => {
        res.json({msg:"OK"});
      })
      .catch((err) => console.log(err));
  };
  promeniKapacitet=(req: express.Request, res: express.Response) => {
    let naziv=req.body.naziv
    let vlasnik=req.body.vlasnik
    let kapacitet=req.body.kapacitet
    VikendicaModel.updateOne({naziv:naziv,vlasnik:vlasnik},{$set:{brojOsoba:kapacitet}})
      .then((vikendice) => {
        res.json({msg:"OK"});
      })
      .catch((err) => console.log(err));
  };
  dodajVikendicu=(req: express.Request, res: express.Response) => {
    let vikendica=new VikendicaModel(req.body)
    vikendica.save()
      .then((vikendice) => {
        res.json({msg:"OK"});
      })
      .catch((err) => console.log(err));
  };
  obrisiVikendicu=(req: express.Request, res: express.Response) => {
    let naziv=req.body.naziv
    let vlasnik=req.body.vlasnik
    VikendicaModel.deleteOne({naziv:naziv,vlasnik:vlasnik})
      .then((vikendice) => {
        res.json({msg:"OK"});
      })
      .catch((err) => console.log(err));
  };
  blokirajVikendicu=(req: express.Request, res: express.Response) => {
    let naziv=req.body.naziv
    let vlasnik=req.body.vlasnik
    let date=new Date()
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    let datum=`${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
    VikendicaModel.updateOne({naziv:naziv,vlasnik:vlasnik},{$set:{datumBlokiranja:datum}})
      .then((vikendice) => {
        res.json({msg:"OK"});
      })
      .catch((err) => console.log(err));
  }; 
  funkcija = async (req: express.Request, res: express.Response) => {
    try {
      const vlasnik = req.body.vlasnik;
      const vikendice = await VikendicaModel.find({ vlasnik });

      const rezultat = await Promise.all(
        vikendice.map(async (v) => {
          const nizMeseci: number[] = Array(12).fill(0);
          const rezervacije = await RezervacijaModel.find({ naziv_vikendice: v.naziv });

          for (const r of rezervacije) {
            if (!r.datumOd) continue;
            const d = new Date(r.datumOd);
            const mesec = d.getMonth();
            if (mesec >= 0 && mesec < 12) nizMeseci[mesec]++;
          }

          return {
            naziv: v.naziv!,
            meseci: nizMeseci,
          };
        })
    );

      res.json(rezultat);
    } catch (err) {
      console.log(err);
      res.status(500).json({ msg: 'Greska pri racunanju statistike' });
    }
  };
  funkcija2 = async (req: express.Request, res: express.Response) => {
  try {
    const vlasnik = req.body.vlasnik;
    const vikendice = await VikendicaModel.find({ vlasnik });

    const rezultat = await Promise.all(
      vikendice.map(async (v) => {
        const rezervacije = await RezervacijaModel.find({ naziv_vikendice: v.naziv });

        let vikend = 0;
        let radniDani = 0;

        for (const r of rezervacije) {
          if (!r.datumOd || !r.datumDo) continue;

          const start = new Date(r.datumOd);
          const end = new Date(r.datumDo);

          for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
            const dan = d.getDay(); 
            if (dan === 0 || dan === 6) vikend++;
            else radniDani++;
          }
        }

        return {
          naziv: v.naziv!,
          vikend,
          radniDani,
        };
      })
    );

    res.json(rezultat);
  } catch (err) {
    console.error(err);
    
  }
};
}