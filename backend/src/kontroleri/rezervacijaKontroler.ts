import * as express from "express";
import RezervacijaModel from "../modeli/rezervacija";

export class RezervacijaKontroler {
  
    sveRezervacije = (req: express.Request, res: express.Response) => {

    RezervacijaModel.find({status: "prihvacena"}).then((rezervacije) => {
        res.json(rezervacije);
    }).catch((err) => console.log(err));
    };

    dodajRezervaciju = (req: express.Request, res: express.Response) => {
        let rezervacija=new RezervacijaModel(req.body)
        rezervacija.save().then((message) => {
            res.json({msg:"OK"});
        }).catch((err) => console.log(err));
    };
    oceniRezervaciju = (req: express.Request, res: express.Response) => {
        let ocena=req.body.ocena
        let kor_ime=req.body.kor_ime
        let komentar=req.body.komentar
        let datumOd=req.body.datumOd

        RezervacijaModel.updateOne({naziv_turiste:kor_ime,datumOd:datumOd,status:"prihvacena"},{$set:{komentar:komentar,ocena:ocena,ocenjena:true}}).then((message) => {
            res.json({msg:"OK"});
        }).catch((err) => console.log(err));
    };
    otkaziRezervaciju= (req: express.Request, res: express.Response) => {
        
        let kor_ime=req.body.kor_ime
        
        let datumOd=req.body.datumOd

        RezervacijaModel.deleteOne({naziv_turiste:kor_ime,datumOd:datumOd,status:"prihvacena"}).then((message) => {
            res.json({msg:"OK"});
        }).catch((err) => console.log(err));
    };

    sveRezervacijeNeobradjene = (req: express.Request, res: express.Response) => {

    RezervacijaModel.find({status: "neobradjena"}).then((rezervacije) => {
        res.json(rezervacije);
    }).catch((err) => console.log(err));
    };

    odbiRezervaciju=(req: express.Request, res: express.Response) => {
        let razlog_odbijanja=req.body.razlog_odbijanja
        let kor_ime=req.body.kor_ime
        
        let datumOd=req.body.datumOd

        RezervacijaModel.updateOne({naziv_turiste:kor_ime,datumOd:datumOd,status:"neobradjena"},{$set:{status:"odbijena",razlog_odbijanja:razlog_odbijanja}}).then((message) => {
            res.json({msg:"OK"});
        }).catch((err) => console.log(err));
    };
    prihvatiRezervaciju=(req: express.Request, res: express.Response) => {
        
        let kor_ime=req.body.kor_ime
        
        let datumOd=req.body.datumOd

        RezervacijaModel.updateOne({naziv_turiste:kor_ime,datumOd:datumOd,status:"neobradjena"},{$set:{status:"prihvacena"}}).then((message) => {
            res.json({msg:"OK"});
        }).catch((err) => console.log(err));
    };
}