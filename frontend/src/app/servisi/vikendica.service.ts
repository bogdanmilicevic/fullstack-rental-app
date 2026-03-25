import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import Vikendica from '../modeli/vikendica';
import Message from '../modeli/message';
import Rezervacija from '../modeli/rezervacija';
import Slika from '../modeli/slika';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VikendicaService {

  constructor() { }
  
    private http = inject(HttpClient);
  
    uri = "http://localhost:4000/vikendice";
  
    sveVikendice() {
      return this.http.get<Vikendica[]>(`${this.uri}/sveVikendice`)
    }
    sveVikendice1() {
      return this.http.get<Vikendica[]>(`${this.uri}/sveVikendice1`)
    }

    pretrazi(naziv:string,mesto:string){
      let data={
        naziv:naziv,
        mesto:mesto
      }
      return this.http.post<Vikendica[]>(`${this.uri}/pretrazi`,data)
    }

    brojVikendica(){
      
      return this.http.get<Message>(`${this.uri}/brojVikendica`)
    }

    oceni(rezervacija:Rezervacija){
      let data={
        naziv:rezervacija.naziv_vikendice,
        kor_ime:rezervacija.naziv_turiste,
        komentar:rezervacija.komentar,
        ocena:rezervacija.ocena
      }
      return this.http.post<Vikendica[]>(`${this.uri}/oceniVikendicu`,data)
    }
    dodajSliku(base64code:string,naziv:string){
      let data={
        naziv:naziv,
        base64code:base64code,
      }
      return this.http.post<Message>(`${this.uri}/dodajSliku`,data)
    }
    ukloniSliku(base64code:string,naziv:string){
      let data={
        naziv:naziv,
        base64code:base64code,
      }
      return this.http.post<Message>(`${this.uri}/ukloniSliku`,data)
    }
    promeniNaziv(naziv:string,stariNaziv:string,vlasnik:string){
      let data={
        naziv:naziv,
        vlasnik:vlasnik,
        stariNaziv:stariNaziv
      }
      return this.http.post<Message>(`${this.uri}/promeniNaziv`,data)
    }
    promeniMesto(mesto:string,naziv:string,vlasnik:string){
      let data={
        naziv:naziv,
        vlasnik:vlasnik,
        mesto:mesto
      }
      return this.http.post<Message>(`${this.uri}/promeniMesto`,data)
    }
    promeniUsluge(usluge:string,naziv:string,vlasnik:string){
      let data={
        naziv:naziv,
        vlasnik:vlasnik,
        usluge:usluge
      }
      return this.http.post<Message>(`${this.uri}/promeniUsluge`,data)
    }
    promeniLetnjuCenu(cena:number,naziv:string,vlasnik:string){
      let data={
        naziv:naziv,
        vlasnik:vlasnik,
        cena:cena
      }
      return this.http.post<Message>(`${this.uri}/promeniLetnjuCenu`,data)
    }
    promeniZimskuCenu(cena:number,naziv:string,vlasnik:string){
      let data={
        naziv:naziv,
        vlasnik:vlasnik,
        cena:cena
      }
      return this.http.post<Message>(`${this.uri}/promeniZimskuCenu`,data)
    }
    promeniX(x:string,naziv:string,vlasnik:string){
      let data={
        naziv:naziv,
        vlasnik:vlasnik,
        x:x
      }
      return this.http.post<Message>(`${this.uri}/promeniX`,data)
    }
    promeniY(y:string,naziv:string,vlasnik:string){
      let data={
        naziv:naziv,
        vlasnik:vlasnik,
        y:y
      }
      return this.http.post<Message>(`${this.uri}/promeniY`,data)
    }
    promeniTelefon(telefon:string,naziv:string,vlasnik:string){
      let data={
        naziv:naziv,
        vlasnik:vlasnik,
        telefon:telefon
      }
      return this.http.post<Message>(`${this.uri}/promeniTelefon`,data)
    }
    promeniKapacitet(kapacitet:number,naziv:string,vlasnik:string){
      let data={
        naziv:naziv,
        vlasnik:vlasnik,
        kapacitet:kapacitet
      }
      return this.http.post<Message>(`${this.uri}/promeniKapacitet`,data)
    }
    dodajVikendicu(naziv:string,vlasnik:string,mesto:string,opis_vikendice:string,letnja_cena:number,zimska_cena:number,telefon:string,x:string,y:string,slike:Slika[],brojOsoba:number){
      let data={
        naziv:naziv,
        vlasnik:vlasnik,
        mesto:mesto,
        prosecna_ocena:0,
        opis_vikendice:opis_vikendice,
        letnja_cena:letnja_cena,
        zimska_cena:zimska_cena,
        x:x,
        y:y,
        telefon:telefon,
        broj_recenzija:0,
        recenzije:[],
        slike:slike,
        brojOsoba:brojOsoba,
        datumBlokiranja:""
      }
      return this.http.post<Message>(`${this.uri}/dodajVikendicu`,data)
    }

    blokiraj(vikendica:Vikendica){
      let data={
        naziv:vikendica.naziv,
        vlasnik:vikendica.vlasnik,
      }
      return this.http.post<Message>(`${this.uri}/blokirajVikendicu`,data)
    }
    obrisiVikendicu(vikendica:Vikendica){
      const data={
        naziv:vikendica.naziv,
        vlasnik:vikendica.vlasnik
      }
      return this.http.post<Message>(`${this.uri}/obrisiVikendicu`,data)
    }
    funkcija(kor_ime:string):Observable<any>{
      const data={
        vlasnik:kor_ime
      }
      return this.http.post(`${this.uri}/funkcija`,data)
    }

    funkcija2(kor_ime:string):Observable<any>{
      const data={
        vlasnik:kor_ime
      }
      return this.http.post(`${this.uri}/funkcija2`,data)
    }
}
