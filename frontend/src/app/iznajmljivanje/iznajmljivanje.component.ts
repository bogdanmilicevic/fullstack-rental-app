import { Component, inject } from '@angular/core';
import Vikendica from '../modeli/vikendica';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Time } from '@angular/common';
import Korisnik from '../modeli/korisnik';
import { RezervacijaService } from '../servisi/rezervacija.service';
import Rezervacija from '../modeli/rezervacija';

@Component({
  selector: 'app-iznajmljivanje',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './iznajmljivanje.component.html',
  styleUrl: './iznajmljivanje.component.css'
})
export class IznajmljivanjeComponent {
    private rezervacijeServis = inject(RezervacijaService)
    danasnjiDatum: string = '';
    brojOsoba:number=0
    error:string=''
    private router = inject(Router)
    vikendica:Vikendica=new Vikendica()
    korak1:boolean=true;
    korak2:boolean=false;
    pocetakDatum:string=''
    pocetakVreme:string=''
    krajDatum:string=''
    krajVreme:string=''
    ulogovan:Korisnik=new Korisnik()
    cena:number=0;
    sveRezervacije:Rezervacija[]=[]
    datumPocetka:string=''
    datumKraja:string=''
    dodatniZahtevi:string=''
    ngOnInit():void{ 
      const danas = new Date();
      this.danasnjiDatum = danas.toISOString().split('T')[0];
      let vikendica = localStorage.getItem('vikendica');
      if (vikendica != null) this.vikendica = JSON.parse(vikendica);
       this.korak1=true
      let korisnik = localStorage.getItem('ulogovan');
      if (korisnik != null) this.ulogovan = JSON.parse(korisnik);
      this.rezervacijeServis.sveRezervacije().subscribe((tmp)=>{
        this.sveRezervacije=tmp
      })
      
    }
    dalje(){
      if (!this.pocetakDatum || !this.krajDatum) {
        this.error = 'Unesite datume početka i kraja.';
        return;
      }

      if (this.brojOsoba <= 0) {
        this.error = 'Broj osoba mora biti veći od 0.';
        return;
      }

      if (this.vikendica.datumBlokiranja && this.vikendica.datumBlokiranja !== '') {
        const datumBlokiranja = new Date(this.vikendica.datumBlokiranja);
        const krajBlokiranja = new Date(datumBlokiranja.getTime() + 48 * 60 * 60 * 1000); // +48 sati
        const pocetakRezervacije = new Date(this.pocetakDatum);
        
        if (pocetakRezervacije >= datumBlokiranja && pocetakRezervacije <= krajBlokiranja) {
          this.error = 'Vikendica ne radi u tom periodu. Molimo odaberite drugi datum.';
          return;
        }
      }

      const pocetak = new Date(this.pocetakDatum);
      const kraj = new Date(this.krajDatum);

      if (kraj <= pocetak) {
        this.error = 'Datum kraja mora biti posle datuma početka.';
        return;
      }
      if(this.pocetakVreme<"14:00"){
        this.error = 'Moze se uci tek posle 14h.';
        return;
      }
      if(this.krajVreme>"10:00"){
        this.error = 'Mora se izaci do 10h.';
        return;
      }
      if(this.brojOsoba>this.vikendica.brojOsoba){
        this.error = 'Vikendica nije tolikog kapaciteta';
        return;
      }
      let ukupnaCena = 0;
      let trenutni = new Date(pocetak);

      while (trenutni < kraj) {
        const mesec = trenutni.getMonth() + 1; 
        const jeLetnji = [5, 6, 7, 8].includes(mesec); 
        ukupnaCena += jeLetnji
          ? Number(this.vikendica.letnja_cena)
          : Number(this.vikendica.zimska_cena);

        trenutni.setDate(trenutni.getDate() + 1);
      }
      this.datumPocetka=this.pocetakDatum+'T'+this.pocetakVreme+":00"
      this.datumKraja=this.krajDatum+'T'+this.krajVreme+":00"
      const datumPoc = new Date(this.datumPocetka).getTime();
      const datumKraj = new Date(this.datumKraja).getTime();

      for (let r of this.sveRezervacije) {
        const datumOd = new Date(r.datumOd).getTime();
        const datumDo = new Date(r.datumDo).getTime();
        if (this.vikendica.naziv === r.naziv_vikendice && r.status === "prihvacena" && datumPoc < datumDo && datumKraj > datumOd)
         {
          this.error = 'Vikendica je rezervisana za taj datum.';
          return;
        }
      }
      if(this.vikendica.brojOsoba<this.brojOsoba){
        this.error = 'Vikendica nije tolikog kapaciteta.';
          return;
      }
      this.cena = ukupnaCena;
      this.korak2 = true;
      this.korak1 = false;
      this.error = '';
    }
    nazad(){
      this.korak2=false;
      this.korak1=true;
      this.error=''
      this.router.navigate(["vikendica"])
    }
    nazad1(){
      let k=1
      localStorage.setItem("parametarTurista",JSON.stringify(1))
      this.router.navigate(["vikendica"])
    }
    obavestenje:string=""
    plati(){
      let datum=new Date()
      const godina = datum.getFullYear();
      const mesec = String(datum.getMonth() + 1).padStart(2, '0');
      const dan = String(datum.getDate()).padStart(2, '0');
      const sati = String(datum.getHours()).padStart(2, '0');
      const minuti = String(datum.getMinutes()).padStart(2, '0');
      const sekunde = String(datum.getSeconds()).padStart(2, '0');
      this.danasnjiDatum=`${godina}-${mesec}-${dan}T${sati}:${minuti}:${sekunde}`;
      this.rezervacijeServis.dodajRezervaciju(this.vikendica.naziv,this.ulogovan.kor_ime,this.datumPocetka,
      this.datumKraja,this.danasnjiDatum,this.brojOsoba,this.dodatniZahtevi).subscribe((tmp)=>{
        this.cena=0
        this.pocetakDatum=''
        this.pocetakVreme=''
        this.krajDatum=''
        this.brojOsoba=0
        this.krajVreme=''
        this.obavestenje = 'Vasa rezervacija je zabelezena.';
        this.korak2=true;
        this.korak1=false;
      })
      
    }
}
