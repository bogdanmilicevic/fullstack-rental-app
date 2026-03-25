import mongoose from "mongoose";

const Schema = mongoose.Schema;

let Rezervacija = new Schema({
  naziv_vikendice: {
    type: String,
  },
  naziv_turiste: {
    type: String,
  },
  datumOd: {
    type: String,
  },
  datumDo: {
    type: String,
  },
  datumRezervacije: {
    type: String,
  },
  razlog_odbijanja: {
    type: String,
  },
  status: {
    type: String,
  },
  brojOsoba:{
    type:Number
  },
  dodatniZahtevi:{
    type:String
  },
  ocenjena:{
    type: Boolean
  },
  komentar:{
    type:String
  },
  ocena:{
    type:Number
  }

});

export default mongoose.model("RezervacijaModel", Rezervacija, "rezervacije");