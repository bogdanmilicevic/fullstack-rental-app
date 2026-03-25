import { Component, inject } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { KorisnikService } from '../servisi/korisnik.service';
import Korisnik from '../modeli/korisnik';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Observable, Subscriber } from 'rxjs';
import Vikendica from '../modeli/vikendica';
import { VikendicaService } from '../servisi/vikendica.service';
import { RezervacijaService } from '../servisi/rezervacija.service';
import Rezervacija from '../modeli/rezervacija';

@Component({
  selector: 'app-turista',
  standalone: true,
  imports: [FormsModule,CommonModule,RouterModule],
  templateUrl: './turista.component.html',
  styleUrl: './turista.component.css'
})
export class TuristaComponent {
  private router = inject(Router)
  private korisnikServis = inject(KorisnikService)
  private vikendiceServis = inject(VikendicaService)
  private rezervacijeServis = inject(RezervacijaService)
  ulogovan:Korisnik=new Korisnik()
  korisnici:Korisnik[]=[]
  opcija1:boolean=true;
  opcija2:boolean=false;
  opcija3:boolean=false;
  azuriranje:boolean=false;
  tip:string=""
  variabla:string=''
  sveVikendice:Vikendica[]=[]
  private diners1Regex = /^(300|301|302|303)\d{12}$/;
  private diners2Regex = /^(36|38)\d{13}$/;
  private mastercardRegex = /^(51|52|53|54|55)\d{14}$/;
  private visaRegex = /^(4539|4556|4916|4532|4929|4485|4716)\d{12}$/;
  trenutneRezervacije:Rezervacija[]=[]
  prethodneRezervacije:Rezervacija[]=[]
  sveRezervacije:Rezervacija[]=[]
  ocenjivanje:boolean=false
  oznacena:Rezervacija=new Rezervacija()
  ngOnInit(): void {
    let korisnik = localStorage.getItem('ulogovan');
    if (korisnik != null) this.ulogovan = JSON.parse(korisnik);
    
    let k = localStorage.getItem('parametarTurista');
    if (k != null){
      localStorage.removeItem('parametarTurista')
      this.opcija2 = true;
      this.opcija1 = false;
    } 
    this.vikendiceServis.sveVikendice1().subscribe((tmp)=>{
      this.sveVikendice=tmp
    })
    this.rezervacijeServis.sveRezervacije().subscribe((tmp)=>{
      this.sveRezervacije=tmp
      this.sveRezervacije.forEach((p)=>{
        if((new Date(p.datumDo).getTime()-new Date().getTime())>0 && p.naziv_turiste==this.ulogovan.kor_ime){
          this.trenutneRezervacije.push(p)
        }else if((new Date(p.datumDo).getTime()-new Date().getTime())<0 && p.naziv_turiste==this.ulogovan.kor_ime){
          this.prethodneRezervacije.push(p)
        }
      })
      this.trenutneRezervacije.forEach((p) => {
        this.sveVikendice.forEach((e) => {
        if (p.naziv_vikendice == e.naziv) {
          p.mesto_vikendice = e.mesto;
        }
      });
      
    });
    this.prethodneRezervacije.sort((a,b)=>{
      if(a.datumOd<b.datumOd){
        return 1
      }else {
        return -1
      }
    })
  })
    
  
  }
  otkazi(rezervacija:Rezervacija){
    this.rezervacijeServis.otkazi(rezervacija).subscribe((msg)=>{
      this.trenutneRezervacije=[]
      this.prethodneRezervacije=[]
      this.opcija1=false
      this.opcija2=false
      this.opcija3=true
      this.ngOnInit()
    })
  }
  proveri1(rezervacija: Rezervacija): boolean {
    const danas = new Date(); 
    const datumOd = new Date(rezervacija.datumOd);

  
    const sutra = new Date(danas);
    sutra.setDate(danas.getDate() + 1);

    return datumOd >= sutra;
  }
  oceni1(){
    this.vikendiceServis.oceni(this.oznacena).subscribe((tmp)=>{
      this.rezervacijeServis.oceni(this.oznacena).subscribe((tmp)=>{
        this.trenutneRezervacije=[]
        this.prethodneRezervacije=[]
        this.ocenjivanje=false
        this.ngOnInit()
      })
    })
  }
  oceni(rezervacija:Rezervacija){
    this.ocenjivanje=true;
    this.oznacena=rezervacija
  }
  stars = [1, 2, 3, 4, 5];
  hoverRating = 0;
  
  setRating(value: number) {
    this.oznacena.ocena = value;
  }
  opcija(broj:Number){
    if(broj==1){
      this.opcija1=true
      this.opcija2=false
      this.opcija3=false
      this.azuriranje=false
    }else if(broj==2){
      this.opcija1=false
      this.opcija2=true
      this.opcija3=false
      this.azuriranje=false
    }else if(broj==3){
      this.opcija1=false
      this.opcija2=false
      this.opcija3=true
      this.azuriranje=false
    }else{
      this.opcija1=true
      this.opcija2=false
      this.opcija3=false
      this.azuriranje=true
    }
  }
  azuriraj(){
    
    if((this.tip=="ime" || this.tip=="prezime" || this.tip=="adresa" || this.tip=="mejl" || this.tip=="telefon") && (!this.variabla || this.variabla.trim() === '')){
      this.error='Polje ne sme biti prazno!'
      return
    }
    
   
    if(this.tip=="kartica" && (!this.variabla || this.variabla.trim() === '')){
      this.error='Broj kartice ne sme biti prazan!'
      return
    }
    
    if(this.tip=="ime"){
      this.korisnikServis.promeniIme(this.variabla,this.ulogovan.kor_ime).subscribe((tmp)=>{
        this.korisnikServis.dohvatiKorisnika(this.ulogovan.kor_ime).subscribe((korisnik)=>{
          this.ulogovan=korisnik
          localStorage.setItem("ulogovan",JSON.stringify(this.ulogovan))
        })
        this.tip=''
        this.variabla=''
        this.azuriranje=false
        this.error=''
      })
    }else if(this.tip=="prezime"){
      this.korisnikServis.promeniPrezime(this.variabla,this.ulogovan.kor_ime).subscribe((tmp)=>{
        this.korisnikServis.dohvatiKorisnika(this.ulogovan.kor_ime).subscribe((korisnik)=>{
          this.ulogovan=korisnik
          localStorage.setItem("ulogovan",JSON.stringify(this.ulogovan))
        })
        this.tip=''
        this.variabla=''
        this.azuriranje=false
        this.error=''
      })
    }else if(this.tip=="adresa"){
      this.korisnikServis.promeniAdresu(this.variabla,this.ulogovan.kor_ime).subscribe((tmp)=>{
        this.korisnikServis.dohvatiKorisnika(this.ulogovan.kor_ime).subscribe((korisnik)=>{
          this.ulogovan=korisnik
          localStorage.setItem("ulogovan",JSON.stringify(this.ulogovan))
        })
        this.tip=''
        this.variabla=''
        this.azuriranje=false
        this.error=''
      })
    }else if(this.tip=="mejl"){
      this.korisnikServis.promeniMejl(this.variabla,this.ulogovan.kor_ime).subscribe((tmp)=>{
        this.korisnikServis.dohvatiKorisnika(this.ulogovan.kor_ime).subscribe((korisnik)=>{
          this.ulogovan=korisnik
          localStorage.setItem("ulogovan",JSON.stringify(this.ulogovan))
        })
        this.tip=''
        this.variabla=''
        this.azuriranje=false
        this.error=''
      })
    }else if(this.tip=="telefon"){
      this.korisnikServis.promeniBroj(this.variabla,this.ulogovan.kor_ime).subscribe((tmp)=>{
        this.korisnikServis.dohvatiKorisnika(this.ulogovan.kor_ime).subscribe((korisnik)=>{
          this.ulogovan=korisnik
          localStorage.setItem("ulogovan",JSON.stringify(this.ulogovan))
        })
        this.tip=''
        this.variabla=''
        this.azuriranje=false
        this.error=''
      })
    }else if(this.tip=="kartica" && (this.diners1Regex.test(this.variabla)||this.diners2Regex.test(this.variabla)||this.mastercardRegex.test(this.variabla)||this.visaRegex.test(this.variabla) )){
      this.korisnikServis.promeniKaricu(this.variabla,this.ulogovan.kor_ime).subscribe((tmp)=>{
        this.korisnikServis.dohvatiKorisnika(this.ulogovan.kor_ime).subscribe((korisnik)=>{
          this.ulogovan=korisnik
          localStorage.setItem("ulogovan",JSON.stringify(this.ulogovan))
        })
        this.tip=''
        this.variabla=''
        this.azuriranje=false
        this.error=''
      })
    }else if(this.tip=="kartica" &&!(this.diners1Regex.test(this.variabla)||this.diners2Regex.test(this.variabla)||this.mastercardRegex.test(this.variabla)||this.visaRegex.test(this.variabla) )){
      this.error="Loš format kartice!"
      return
    }else if(this.tip=="slika"){
      if(!this.base64code || this.base64code.trim() === ''){
        this.error='Morate odabrati sliku!'
        return
      }
      this.korisnikServis.promeniSliku(this.base64code,this.ulogovan.kor_ime).subscribe((tmp)=>{
        this.korisnikServis.dohvatiKorisnika(this.ulogovan.kor_ime).subscribe((korisnik)=>{
          this.ulogovan=korisnik
          localStorage.setItem("ulogovan",JSON.stringify(this.ulogovan))
        })
        this.tip=''
        this.variabla=''
        this.azuriranje=false
        this.base64code=''
        this.error=''
      })
    }
  }
  logout(){
    localStorage.clear()
    this.router.navigate(["/login"])
  }
  base64code!:string;
  error:string=""
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
  zvezdice:string=''
  prikazZvezdica(ocena:number){
    this.zvezdice=''
    const zaokruzenaOcena = Math.round(ocena * 2) / 2;
    for (let i = 1; i <= 5; i++) {
    if (i <= zaokruzenaOcena) {
      this.zvezdice += '★'; 
    } else if (i - 0.5 <= zaokruzenaOcena) {
      this.zvezdice += '⯨'; 
    } else {
      this.zvezdice += '☆'; 
    }
  }
  }
  naziv:string=''
  mesto:string=''
  proveri(){
      this.vikendiceServis.pretrazi(this.naziv,this.mesto).subscribe((tmp)=>{
        this.sveVikendice=tmp
      })
  }

  sortirajRastucePoNazivu(){
      this.sveVikendice.sort((a,b)=>{
        if(a.naziv>=b.naziv){
          return 1
        }else{
          return -1
        }
      })
    }
    sortirajOpadajucePoNazivu(){
      this.sveVikendice.sort((a,b)=>{
        if(a.naziv<=b.naziv){
          return 1
        }else{
          return -1
        }
      })
    }
    sortirajOpadajucePoMestu(){
      this.sveVikendice.sort((a,b)=>{
        if(a.mesto<=b.mesto){
          return 1
        }else{
          return -1
        }
      })
    }
    sortirajRastucePoMestu(){
      this.sveVikendice.sort((a,b)=>{
        if(a.mesto>=b.mesto){
          return 1
        }else{
          return -1
        }
      })
    }

    promeni(vikendica:Vikendica){
      localStorage.setItem("vikendica",JSON.stringify(vikendica))
    }

    promenaLozinke(){
      localStorage.setItem('passwordChangeReturnRoute', 'turista')
      this.router.navigate(['promenaLozinke'])
    }
}
