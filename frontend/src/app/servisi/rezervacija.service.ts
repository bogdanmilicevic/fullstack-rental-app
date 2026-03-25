import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import Message from '../modeli/message';
import Rezervacija from '../modeli/rezervacija';

@Injectable({
  providedIn: 'root'
})
export class RezervacijaService {

  constructor() { }
    
  private http = inject(HttpClient);
    
  uri = "http://localhost:4000/rezervacije";
    
      
  sveRezervacije() {
    return this.http.get<Rezervacija[]>(`${this.uri}/sveRezervacije`)
  }
  dodajRezervaciju(vikendica:string,kor_ime:string,datumOd:string,datumDo:string,datumRezervacije:string,brojOsoba:number,dodatniZahtevi:string){
    let data={
      naziv_vikendice:vikendica,
      naziv_turiste:kor_ime,
      datumOd:datumOd,
      datumDo:datumDo,
      datumRezervacije:datumRezervacije,
      razlog_odbijanja:"",
      status:"neobradjena",
      brojOsoba:brojOsoba,
      dodatniZahtevi:dodatniZahtevi,
      ocenjena:false,
      komentar:"",
      ocena:0
    }
    return this.http.post<Message>(`${this.uri}/dodajRezervaciju`,data)
  }

  oceni(rezervacija:Rezervacija){
    let data={
      komentar:rezervacija.komentar,
      ocena:rezervacija.ocena,
      kor_ime:rezervacija.naziv_turiste,
      datumOd:rezervacija.datumOd
    }
    return this.http.post<Message>(`${this.uri}/oceniRezervaciju`,data)
  }
  otkazi(rezervacija:Rezervacija){
    let data={
      kor_ime:rezervacija.naziv_turiste,
      datumOd:rezervacija.datumOd
    }
    return this.http.post<Message>(`${this.uri}/otkaziRezervaciju`,data)
  }
  sveRezervacijeNeobradjene(){
    return this.http.get<Rezervacija[]>(`${this.uri}/sveRezervacijeNeobradjene`)
  }   
  prihvati(rezervacija:Rezervacija){
    let data={
      kor_ime:rezervacija.naziv_turiste,
      datumOd:rezervacija.datumOd
    }
    return this.http.post<Message>(`${this.uri}/prihvatiRezervaciju`,data)
  }
  odbi(rezervacija:Rezervacija,razlog_odbijanja:string){
    let data={
      kor_ime:rezervacija.naziv_turiste,
      datumOd:rezervacija.datumOd,
      razlog_odbijanja:razlog_odbijanja
    }
    return this.http.post<Message>(`${this.uri}/odbiRezervaciju`,data)
  }
  
}
