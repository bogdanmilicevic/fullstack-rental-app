import { Component, inject } from '@angular/core';
import { KorisnikService } from '../servisi/korisnik.service';
import Korisnik from '../modeli/korisnik';
import { Router } from '@angular/router';
import { Observable, Subscriber } from 'rxjs';
import { FormsModule } from '@angular/forms';
import Vikendica from '../modeli/vikendica';
import { VikendicaService } from '../servisi/vikendica.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-administrator',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './administrator.component.html',
  styleUrl: './administrator.component.css'
})
export class AdministratorComponent {
  private router = inject(Router)
  private korisnikServis = inject(KorisnikService)
  private vikendicaServis = inject(VikendicaService)
  ulogovan:Korisnik=new Korisnik()
  korisnici:Korisnik[]=[]
  sveVikendice:Vikendica[]=[]
  ngOnInit(): void {
    let korisnik = localStorage.getItem('ulogovan');
    if (korisnik != null) this.ulogovan = JSON.parse(korisnik);
    this.korisnikServis.sviKorisnici().subscribe((tmp)=>{
      this.korisnici=tmp
    })
    this.vikendicaServis.sveVikendice1().subscribe((vikendice)=>{
      this.sveVikendice=vikendice
      this.sveVikendice.forEach((v)=>{
         let i=0
         let cnt=1;
        
         v.recenzije.forEach((r)=>{
           if(cnt>v.broj_recenzija-3){
             if(Number(r.ocena)<2){
               i++
             }
             cnt++
           }else{
             cnt++
           }
         })
         
         // Provera da li je prošlo 48 sati od datuma blokiranja
         let proslo48sati = true; // default true ako nema datum blokiranja
         if (v.datumBlokiranja && v.datumBlokiranja !== "") {
           const sada = new Date();
           // Datum se čuva u formatu sa dvotačkama, tako da možemo direktno da ga parsirati
           const datumBlokiranja = new Date(v.datumBlokiranja);
           const razlikaUSatima = (sada.getTime() - datumBlokiranja.getTime()) / (1000 * 60 * 60);
           proslo48sati = razlikaUSatima > 48;
           
           // Debug log
           console.log(`Vikendica: ${v.naziv}, Datum blokiranja: ${v.datumBlokiranja}, Parsiran datum: ${datumBlokiranja}, Razlika u satima: ${razlikaUSatima}, Proslo 48h: ${proslo48sati}`);
         }
         
         if(i==3){
           v.ima3LoseOcene = true;
           v.boja = (v.datumBlokiranja === "" || proslo48sati);
         }else{
           v.ima3LoseOcene = false;
           v.boja=false
         }
      })
    })
    
  }
  blokiraj(vikendica:Vikendica){
    this.vikendicaServis.blokiraj(vikendica).subscribe((tmp)=>{
      // Osveži podatke nakon blokiranja
      this.ngOnInit();
    })
  }
  odobri(korisnik:Korisnik){
    this.korisnikServis.odobri(korisnik).subscribe((tmp)=>{
      this.ngOnInit()
    })
  }

  odbi(korisnik:Korisnik){
    this.korisnikServis.odbi(korisnik).subscribe((tmp)=>{
      this.ngOnInit()
    })
  }
  deaktiviraj(korisnik:Korisnik){
    this.korisnikServis.deaktiviraj(korisnik).subscribe((tmp)=>{
      this.ngOnInit()
    })
  }
  logout(){
    localStorage.clear()
    this.router.navigate(["/login"])
  }
  tip:string=''
  variabla:string=''
  azuriranje:boolean=false
  base64code:string=""
  korisnik:Korisnik=new Korisnik()
  azur(korisnik:Korisnik){
    this.azuriranje=true
    this.korisnik=korisnik
  }
  omotac(){
    this.azuriraj(this.korisnik)
  }
  azuriraj(korisnik:Korisnik){
    if(this.tip=="ime"){
      this.korisnikServis.promeniIme(this.variabla,korisnik.kor_ime).subscribe((tmp)=>{
        this.korisnikServis.dohvatiKorisnika(korisnik.kor_ime).subscribe((korisnik)=>{
          this.ulogovan=korisnik
          localStorage.setItem("ulogovan",JSON.stringify(this.ulogovan))
          this.ngOnInit()
        })
        
        this.variabla=''
        this.azuriranje=false
      })
    }else if(this.tip=="prezime"){
      this.korisnikServis.promeniPrezime(this.variabla,korisnik.kor_ime).subscribe((tmp)=>{
        this.korisnikServis.dohvatiKorisnika(korisnik.kor_ime).subscribe((korisnik)=>{
          this.ulogovan=korisnik
          localStorage.setItem("ulogovan",JSON.stringify(this.ulogovan))
          this.ngOnInit()
        })
        
        this.variabla=''
        this.azuriranje=false
      })
    }else if(this.tip=="adresa"){
      this.korisnikServis.promeniAdresu(this.variabla,korisnik.kor_ime).subscribe((tmp)=>{
        this.korisnikServis.dohvatiKorisnika(korisnik.kor_ime).subscribe((korisnik)=>{
          this.ulogovan=korisnik
          localStorage.setItem("ulogovan",JSON.stringify(this.ulogovan))
          this.ngOnInit()
        })

        this.variabla=''
        this.azuriranje=false
      })
    }else if(this.tip=="mejl"){
      this.korisnikServis.promeniMejl(this.variabla,korisnik.kor_ime).subscribe((tmp)=>{
        this.korisnikServis.dohvatiKorisnika(korisnik.kor_ime).subscribe((korisnik)=>{
          this.ulogovan=korisnik
          localStorage.setItem("ulogovan",JSON.stringify(this.ulogovan))
          this.ngOnInit()
        })
        
        this.variabla=''
        this.azuriranje=false
      })
    }else if(this.tip=="telefon"){
      this.korisnikServis.promeniBroj(this.variabla,korisnik.kor_ime).subscribe((tmp)=>{
        this.korisnikServis.dohvatiKorisnika(korisnik.kor_ime).subscribe((korisnik)=>{
          this.ulogovan=korisnik
          localStorage.setItem("ulogovan",JSON.stringify(this.ulogovan))
          this.ngOnInit()
        })
        
        this.variabla=''
        this.azuriranje=false
      })
    }else if(this.tip=="slika"){
      this.korisnikServis.promeniSliku(this.base64code,korisnik.kor_ime).subscribe((tmp)=>{
        this.korisnikServis.dohvatiKorisnika(korisnik.kor_ime).subscribe((korisnik)=>{
          this.ulogovan=korisnik
          localStorage.setItem("ulogovan",JSON.stringify(this.ulogovan))
          this.ngOnInit()
        })
       
        this.variabla=''
        this.azuriranje=false
      })
    }
    
    this.tip=""
    this.error=''
    }
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
}
