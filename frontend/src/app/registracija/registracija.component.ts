import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { KorisnikService } from '../servisi/korisnik.service';
import { FormsModule } from '@angular/forms';
import { Observable, Subscriber } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registracija',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './registracija.component.html',
  styleUrl: './registracija.component.css'
})
export class RegistracijaComponent {
  private router = inject(Router)
  private korisnikServis = inject(KorisnikService)

  tip: string = ''
  username: string = ''
  password: string = ''
  ime: string = ''
  prezime: string = ''
  pol: string = ''
  adresa: string = ''
  telefon: string = ''
  mejl: string = ''
  slika: string = ''
  broj_kartice: string = ''
  error: string = ''
  vrstaKartice:string=''
  obavestenje:string=''
  indikatorZaSliku:boolean=false;
  private lozinkaRegex = /^[A-Za-z](?=.*[A-Z])(?=(?:.*[a-z]){3,})(?=.*\d)(?=.*[^A-Za-z0-9]).{5,9}$/;
  private diners1Regex = /^(300|301|302|303)\d{12}$/;
  private diners2Regex = /^(36|38)\d{13}$/;
  private mastercardRegex = /^(51|52|53|54|55)\d{14}$/;
  private visaRegex = /^(4539|4556|4916|4532|4929|4485|4716)\d{12}$/;
  private telefonRegex = /^(\+381|0)[1-9]\d{1,2}[-\s]?\d{6,7}$/; // Format: +381 ili 0, pa 2-3 cifre, opciono - ili razmak, pa 6-7 cifara
  private imeRegex = /^[A-ZĆČŽŠĐ][a-zćčžšđ]+$/;
  private prezimeRegex = /^[A-ZĆČŽŠĐ][a-zćčžšđ]+$/;
  private emailRegex = /^[a-zA-Z0-9][a-zA-Z0-9._-]*[a-zA-Z0-9]@gmail\.com$|^[a-zA-Z0-9][a-zA-Z0-9._-]*@[a-zA-Z0-9]+\.[a-zA-Z]{2,}$/; // Dozvoljava gmail.com ili bilo koji validan email format
  private adresaRegex = /^[A-ZĆČŽŠĐ][A-Za-zćčžšđ\s\d.,]+$/;
  
  registracija() {
    this.error=""
    if (this.username == "" || this.password == "" || this.tip == "" || this.ime == "" ||
      this.prezime == "" || this.pol == "" || this.adresa == "" || this.telefon == "" ||
      this.mejl == "" || this.broj_kartice == "") {
      this.error = "Niste uneli sve podatke!";
      return;
    }

    this.korisnikServis.proveriKorIme(this.username).subscribe((message) => {
      if (message.msg == "Postoji") {
        this.error = "Korisnicko ime vec postoji";
        return;
      }
      
      
      this.korisnikServis.proveriMejl(this.mejl).subscribe((messageMejl) => {
        if (messageMejl.msg != "OK") {
          this.error = "Mejl vec postoji";
          return;
        }
        
        
        if (!this.lozinkaRegex.test(this.password)) {
          this.error = "Lozinka nije u ispravnom formatu! Potrebno je 6-10 karatkera, pocinje slovom, najmanje 1 veliko slovo, 3 mala, 1 broj i 1 specijalni znak";
          return;
        }
        if (!this.imeRegex.test(this.ime)) {
          this.error = "Ime mora poceti velikim slovom, a nastaviti se malim slovima.";
          return;
        } 
        if (!this.prezimeRegex.test(this.prezime)) {
          this.error = "Prezime mora poceti velikim slovom,, a nastaviti se malim slovima.";
          return;
        }
        if (!this.adresaRegex.test(this.adresa)) {
          this.error = "Adresa mora poceti velikim slovom.";
          return;
        }
        if (!this.emailRegex.test(this.mejl)) {
          this.error = "Email nije u ispravnom formatu! Format: ime@gmail.com ili ime@domen.com";
          return;
        }
        
        if (!this.telefonRegex.test(this.telefon)) {
          this.error = "Broj telefona nije u ispravnom formatu! Format: +381XXXXXXXX ili 0XXXXXXXXX (sa ili bez crtice/razmaka)";
          return;
        }
        
        if (!(this.diners1Regex.test(this.broj_kartice) || this.diners2Regex.test(this.broj_kartice) ||this.mastercardRegex.test(this.broj_kartice) || this.visaRegex.test(this.broj_kartice))) {
          
          this.error = "Broj kartice nije ispravan";
          return;
        }
        if(this.error!=""){
          return;
        }
        
        if(!this.base64code ){
          this.base64code="data:image/png;base64,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"
        }
       
        this.error = "";
        this.korisnikServis.registruj(this.username,this.password,this.ime,this.prezime,this.pol,this.adresa,this.telefon,this.mejl,this.base64code,this.broj_kartice,this.tip,"na cekanju").subscribe((e)=>{
          this.obavestenje="Uspesno ste izvrsili registraciju, postacete aktivan clan kada administrator odobri Vas nalog!"
          this.tip = '';
          this.username = '';
          this.password = '';
          this.ime = '';
          this.prezime = '';
          this.pol = '';
          this.adresa = '';
          this.telefon = '';
          this.mejl = '';
          this.slika = '';
          this.broj_kartice = '';
          this.error = '';
          this.vrstaKartice = '';
          this.obavestenje = '';
          this.base64code=''
        })
      });
    });
  }
  login(){
    this.router.navigate(['/login']);
  }
  proveriKarticu(){
    if (this.diners1Regex.test(this.broj_kartice) || this.diners2Regex.test(this.broj_kartice)) {
      if(this.broj_kartice.length==15){
        this.vrstaKartice='Dina'
      }
    }else if(this.mastercardRegex.test(this.broj_kartice)){
      if(this.broj_kartice.length==16){
        this.vrstaKartice='Master'
      }
    }else if(this.visaRegex.test(this.broj_kartice)) {
      if(this.broj_kartice.length==16){ 
        this.vrstaKartice='Visa'
      }
    }else{
        this.vrstaKartice=''
    }

  }
  
 
  base64code!:string;

  izabranFile($event: Event): void {
    const target = $event.target as HTMLInputElement;
    const file:File = (target.files as FileList)[0];
     
    this.konvertuj(file)

  }
  konvertuj(file:File){
    const observable=new Observable((subscriber:Subscriber<any>)=>{
      this.readFile(file,subscriber)
    })
    observable.subscribe((d)=>{
    
    this.base64code=d
    var img = new Image();
    img.src = this.base64code;

    img.onload = () => {
      const width = img.width;
      const height = img.height;
      if (width < 100 || height < 100 || width > 300 || height > 300) {
        this.error = "Slika mora biti između 100x100 i 300x300 piksela";
        this.base64code = '';
        return;
      }
    
      this.error=""
  }})
  }

  readFile(file:File,subscriber:Subscriber<any>){
    const filereader=new FileReader();

    filereader.readAsDataURL(file)

    filereader.onload=()=>{
      subscriber.next(filereader.result)
      subscriber.complete()
    }
    filereader.onerror=()=>{
      subscriber.error()
      subscriber.complete()
    }
  }
}