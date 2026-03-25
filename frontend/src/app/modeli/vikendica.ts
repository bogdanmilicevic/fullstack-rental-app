import Recenzija from "./recenzija";
import Slika from "./slika";

export default class Vikendica {
    naziv: string='';
    vlasnik: string='';
    mesto:string='';
    prosecna_ocena:number=0;
    opis_vikendice:string='';
    letnja_cena:number=0;
    zimska_cena:number=0;
    x:string='';
    y:string='';
    telefon:string='';
    broj_recenzija:number=0;
    recenzije:Array<Recenzija>=[];
    slike:Array<Slika>=[];
    brojOsoba:number=0
    boja:boolean=false
    datumBlokiranja:string=""
    ima3LoseOcene:boolean=false
}