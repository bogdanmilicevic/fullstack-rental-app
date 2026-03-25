import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import Korisnik from '../modeli/korisnik';
import Message from '../modeli/message';

@Injectable({
  providedIn: 'root'
})
export class KorisnikService {

  constructor() { }

  private http = inject(HttpClient);

  uri = "http://localhost:4000/korisnici";

  login(username: string, password: string) {
    let data = {
      kor_ime: username, lozinka: password
    }
    return this.http.post<Korisnik>(`${this.uri}/login`, data)
  }
  login1(username: string, password: string,tip:string) {
    let data = {
      kor_ime: username, lozinka: password,tip:tip
    }
    return this.http.post<Korisnik>(`${this.uri}/login1`, data)
  }

  dohvatiKorisnika(username: string) {
    let data = {
      kor_ime: username
    }
    return this.http.post<Korisnik>(`${this.uri}/dohvatiKorisnika`, data)
  }

  proveriKorIme(username: string){
    let data = {
      kor_ime: username
    }
     return this.http.post<Message>(`${this.uri}/proveriKorIme`, data)
  }

  proveriMejl(mejl: string){
    let data = {
      mejl: mejl
    }
     return this.http.post<Message>(`${this.uri}/proveriMejl`, data)
  }

  registruj(kor_ime:string,lozinka:string,ime:string,prezime:string,pol:string,adresa:string,telefon:string,mejl:string,slika:string,broj_kartice:string,tip:string,status:string){
    let data = {
    kor_ime: kor_ime,
    lozinka: lozinka,
    ime:ime,
    prezime:prezime,
    pol:pol,
    adresa:adresa,
    telefon:telefon,
    mejl:mejl,
    slika:slika,
    broj_kartice:broj_kartice,
    tip:tip,
    status:status
    }
    return this.http.post<Message>(`${this.uri}/registruj`, data)
  }

  sviKorisnici(){
    return this.http.get<Korisnik[]>(`${this.uri}/sviKorisnici`)
  }
  deaktiviraj(korisnik:Korisnik){
    const data={
      kor_ime:korisnik.kor_ime
    }
    return this.http.post<Message>(`${this.uri}/deaktiviraj`, data)
  }
  odbi(korisnik:Korisnik){
    const data={
      kor_ime:korisnik.kor_ime
    }
    return this.http.post<Message>(`${this.uri}/odbi`, data)
  }

  odobri(korisnik:Korisnik){
    const data={
      kor_ime:korisnik.kor_ime
    }
    return this.http.post<Message>(`${this.uri}/odobri`, data)
  }

  promeniIme(ime:string,kor_ime:string){
    const data={
      ime:ime,
      kor_ime:kor_ime
    }
    return this.http.post<Message>(`${this.uri}/ime`, data)
  }
  promeniPrezime(prezime:string,kor_ime:string){
    const data={
      prezime:prezime,
      kor_ime:kor_ime
    }
    return this.http.post<Message>(`${this.uri}/prezime`, data)
  }
  promeniAdresu(adresa:string,kor_ime:string){
    const data={
      adresa:adresa,
      kor_ime:kor_ime
    }
    return this.http.post<Message>(`${this.uri}/adresa`, data)
  }
  promeniMejl(mejl:string,kor_ime:string){
    const data={
      mejl:mejl,
      kor_ime:kor_ime
    }
    return this.http.post<Message>(`${this.uri}/mejl`, data)
  }
  promeniBroj(broj:string,kor_ime:string){
    const data={
      telefon:broj,
      kor_ime:kor_ime
    }
    return this.http.post<Message>(`${this.uri}/telefon`, data)
  }
  promeniKaricu(kartica:string,kor_ime:string){
    const data={
      kartica:kartica,
      kor_ime:kor_ime
    }
    return this.http.post<Message>(`${this.uri}/kartica`, data)
  }
  promeniSliku(slika:string,kor_ime:string){
    const data={
      slika:slika,
      kor_ime:kor_ime
    }
    return this.http.post<Message>(`${this.uri}/slika`, data)
  }

  proveriLozinku(kor_ime:string,lozinka:string){
    const data={
      kor_ime:kor_ime,
      lozinka:lozinka
    }
    return this.http.post<Message>(`${this.uri}/proveriLozinku`, data)
  }

  promeniLozinku(kor_ime:string,lozinka:string){
    const data={
      kor_ime:kor_ime,
      lozinka:lozinka
    }
    return this.http.post<Message>(`${this.uri}/promeniLozinku`, data)
  }
  brojVlasnika(){
    return this.http.get<Message>(`${this.uri}/brojVlasnika`)
  }
  brojTurista(){
    return this.http.get<Message>(`${this.uri}/brojTurista`)
  }
}
