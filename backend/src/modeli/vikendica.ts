import mongoose from "mongoose";

const Schema = mongoose.Schema;

let Vikendica = new Schema({
  naziv: {
    type: String,
  },
  vlasnik: {
    type: String,
  },
  mesto: {
    type: String,
  },
  prosecna_ocena: {
    type: Number,
  },
  opis_vikendice: {
    type: String,
  },
  letnja_cena: {
    type: Number,
  },
  zimska_cena: {
    type: Number,
  },
  x: {
    type: String,
  },
  y: {
    type: String,
  },
  telefon:{
    type:String
  },
  broj_recenzija: {
    type: Number,
  },
  recenzije: {
    type: Array,
  },
  slike: {
    type: Array,
  },
  brojOsoba:{
    type:Number
  },
  datumBlokiranja:{
    type:String
  }

});

export default mongoose.model("VikendicaModel", Vikendica, "vikendice");