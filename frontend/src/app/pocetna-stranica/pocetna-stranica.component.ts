import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { VikendicaService } from '../servisi/vikendica.service';
import Vikendica from '../modeli/vikendica';
import { FormsModule } from '@angular/forms';
import { RezervacijaService } from '../servisi/rezervacija.service';
import Rezervacija from '../modeli/rezervacija';
import { KorisnikService } from '../servisi/korisnik.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pocetna-stranica',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './pocetna-stranica.component.html',
  styleUrl: './pocetna-stranica.component.css'
})
export class PocetnaStranicaComponent {
    private router = inject(Router)
    private vikendicaServis = inject(VikendicaService)
    private rezervacijaServis = inject(RezervacijaService)
    private korisnikServis = inject(KorisnikService)
    sveVikendice:Vikendica[]=[]
    naziv:string=''
    mesto:string=''
    broj7:number=0
    broj30:number=0
    broj24:number=0
    brojVikendica:number=0
    sveRezervacije:Rezervacija[]=[]
    ind:string=''
    brojVlasnika:number=0
    brojTurista:number=0
    ngOnInit():void{
      this.vikendicaServis.sveVikendice1().subscribe((tmp)=>{
        this.sveVikendice=tmp
      })
      this.rezervacijaServis.sveRezervacije().subscribe((tmp)=>{
        this.sveRezervacije=tmp
        this.izracunaj24()
        this.izracunaj7()
        this.izracunaj30()
      })
      this.korisnikServis.brojVlasnika().subscribe((tmp)=>{
        this.brojVlasnika=Number(tmp.msg)
      })
      this.korisnikServis.brojTurista().subscribe((tmp)=>{
        this.brojTurista=Number(tmp.msg)
      })
      this.vikendicaServis.brojVikendica().subscribe((tmp)=>{
        this.brojVikendica=Number(tmp.msg)
      })
    }
    izracunaj24(){
        let cnt=0
        let sada1=new Date()
        let sada=new Date(sada1.getTime() - 24 * 60 * 60* 1000)
        let godina = sada.getFullYear();
        let mesec = String(sada.getMonth() + 1).padStart(2, "0"); 
        let dan = String(sada.getDate()).padStart(2, "0");
        let sati = String(sada.getHours()).padStart(2, "0");
        let minuti = String(sada.getMinutes()).padStart(2, "0");
        let sekunde = String(sada.getSeconds()).padStart(2, "0");

        let datumString = `${godina}-${mesec}-${dan}T${sati}-${minuti}-${sekunde}`;
        
        this.sveRezervacije.forEach((p)=>{
          if(p.datumRezervacije>datumString){
            cnt=cnt+1
          }
        })
        this.broj24=cnt
    }
    izracunaj7(){
        let cnt=0
        let sada1=new Date()
        let sada=new Date(sada1.getTime() - 7 * 24 * 60 * 60* 1000)
        let godina = sada.getFullYear();
        let mesec = String(sada.getMonth() + 1).padStart(2, "0"); 
        let dan = String(sada.getDate()).padStart(2, "0");
        let sati = String(sada.getHours()).padStart(2, "0");
        let minuti = String(sada.getMinutes()).padStart(2, "0");
        let sekunde = String(sada.getSeconds()).padStart(2, "0");

        let datumString = `${godina}-${mesec}-${dan}T${sati}-${minuti}-${sekunde}`;
        
        this.sveRezervacije.forEach((p)=>{
          if(p.datumRezervacije>datumString){
            cnt=cnt+1
          }
        })
        this.broj7=cnt
    }
    izracunaj30(){
        let cnt=0
        let sada1=new Date()
        let sada=new Date(sada1.getTime() - 30 * 24 * 60 * 60* 1000)
        let godina = sada.getFullYear();
        let mesec = String(sada.getMonth() + 1).padStart(2, "0"); 
        let dan = String(sada.getDate()).padStart(2, "0");
        let sati = String(sada.getHours()).padStart(2, "0");
        let minuti = String(sada.getMinutes()).padStart(2, "0");
        let sekunde = String(sada.getSeconds()).padStart(2, "0");

        let datumString = `${godina}-${mesec}-${dan}T${sati}-${minuti}-${sekunde}`;
        
        this.sveRezervacije.forEach((p)=>{
          if(p.datumRezervacije>datumString){
            cnt=cnt+1
          }
        })
        this.broj30=cnt
    }
    proveri(){
      this.vikendicaServis.pretrazi(this.naziv,this.mesto).subscribe((tmp)=>{
        this.sveVikendice=tmp
      })
    }
    login(){
      this.router.navigate(["login"])
    }
    registracija(){
      this.router.navigate(["registracija"])
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
}
