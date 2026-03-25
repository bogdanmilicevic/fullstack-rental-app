import { Component, inject } from '@angular/core';
import Rezervacija from '../modeli/rezervacija';
import Vikendica from '../modeli/vikendica';
import { Observable, Subscriber } from 'rxjs';
import Korisnik from '../modeli/korisnik';
import { RezervacijaService } from '../servisi/rezervacija.service';
import { VikendicaService } from '../servisi/vikendica.service';
import { KorisnikService } from '../servisi/korisnik.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import Slika from '../modeli/slika';
import { Chart } from 'chart.js/auto';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-vlasnik',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './vlasnik.component.html',
  styleUrl: './vlasnik.component.css'
})
export class VlasnikComponent {
  private router = inject(Router)
  private korisnikServis = inject(KorisnikService)
  private vikendiceServis = inject(VikendicaService)
  private rezervacijeServis = inject(RezervacijaService)
  
  
  Object = Object;
  ulogovan:Korisnik=new Korisnik()
  korisnici:Korisnik[]=[]
  opcija1:boolean=true;
  opcija2:boolean=false;
  opcija3:boolean=false;
  opcija4:boolean=false;
  azuriranje:boolean=false;
  azuriranje1:boolean=false;
  azuriranje2:boolean=false;
  tip:string=""
  variabla:string=''
  sveVikendice:Vikendica[]=[]
  mojeVikendice:Vikendica[]=[]
  razlogOdbijanja:string=''
  sveRezervacije:Rezervacija[]=[]
  odbijanje:boolean=false
  tip1:string=""
  variabla1:string=""
  broj:number=0
  nazivVikendice:string=""
  dodavanjeSlika:boolean=false
  mojeRezervacije:Rezervacija[]=[]
  ngOnInit(): void {
    let korisnik = localStorage.getItem('ulogovan');
    if (korisnik != null) this.ulogovan = JSON.parse(korisnik);
    
    this.vikendiceServis.sveVikendice1().subscribe((tmp)=>{
      this.sveVikendice=tmp
      this.sveVikendice.forEach((e)=>{
        if(e.vlasnik==this.ulogovan.kor_ime){
          this.mojeVikendice.push(e)
        }
      })
      this.rezervacijeServis.sveRezervacijeNeobradjene().subscribe((tmp)=>{
        this.sveRezervacije=tmp
        this.sveRezervacije.forEach((r)=>{
          this.mojeVikendice.forEach((v)=>{
            if(r.naziv_vikendice==v.naziv){
              this.mojeRezervacije.push(r)
            }
          })
        })
        this.mojeRezervacije.sort((a,b)=>{
        if(a.datumOd<=b.datumOd){
          return -1
        }else{
          return 1
        }
      })
    })

    })
    
    this.funkcija();
    this.funkcija2()
  }
  odbi(rezervacija:Rezervacija){
    if(this.razlogOdbijanja==""){
      this.error="Morate uneti razlog odbijanja!"
      return
    }
      this.rezervacijeServis.odbi(rezervacija,this.razlogOdbijanja).subscribe((msg)=>
      {
        this.mojeVikendice=[]
        this.mojeRezervacije=[]
        this.ngOnInit()
      })
  }
  prihvati(rezervacija:Rezervacija){
    this.rezervacijeServis.prihvati(rezervacija).subscribe((msg)=>
      {
        this.mojeVikendice=[]
        this.mojeRezervacije=[]
        this.ngOnInit()
      })
  }
  ukloni(base64code:string,nazivVikendice:string){
    this.vikendiceServis.ukloniSliku(base64code,nazivVikendice).subscribe((tmp)=>{
      this.mojeVikendice=[]
      this.ngOnInit()
    })
  }

  dodajSliku(){
    this.vikendiceServis.dodajSliku(this.base64code,this.nazivVikendice).subscribe((tmp)=>{
      this.nazivVikendice=""
      this.dodavanjeSlika=false;
      this.mojeVikendice=[]
      this.ngOnInit()
    })
  }
  opcija(broj:Number){
    if(broj==1){
      this.azuriranje1=false;
      this.dodavanjeSlika=false;
      this.opcija1=true
      this.opcija2=false
      this.opcija3=false
      this.opcija4=false
      this.azuriranje=false
    }else if(broj==2){
      this.azuriranje1=false;
      this.dodavanjeSlika=false;
      this.opcija1=false
      this.opcija2=true
      this.opcija3=false
      this.opcija4=false
      this.azuriranje=false
    }else if(broj==3){
      this.azuriranje1=false;
      this.dodavanjeSlika=false;
      this.opcija1=false
      this.opcija2=false
      this.opcija3=true
      this.opcija4=false
      this.azuriranje=false
    }else if(broj==4){
      this.azuriranje1=false;
      this.dodavanjeSlika=false;
      this.opcija1=false
      this.opcija2=false
      this.opcija3=false
      this.opcija4=true
      this.azuriranje=false
      
      
      this.funkcija();
      this.funkcija2();
    }else{
      this.opcija4=false
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
    
    if(this.tip=="ime"){
      this.korisnikServis.promeniIme(this.variabla,this.ulogovan.kor_ime).subscribe((tmp)=>{
        this.korisnikServis.dohvatiKorisnika(this.ulogovan.kor_ime).subscribe((korisnik)=>{
          this.ulogovan=korisnik
          localStorage.setItem("ulogovan",JSON.stringify(this.ulogovan))
        })
     
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
        
        this.variabla=''
        this.azuriranje=false
        this.error=''
      })
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
       
        this.variabla=''
        this.azuriranje=false
        this.base64code=''
        this.error=''
      })
    }
    this.tip=""
  }
  azuriraj1(){
    
    if((this.tip1=="naziv" || this.tip1=="mesto" || this.tip1=="usluge" || this.tip1=="x" || this.tip1=="y" || this.tip1=="broj") && (!this.variabla1 || this.variabla1.trim() === '')){
      this.error='Polje ne sme biti prazno!'
      return
    }
    
    
    if((this.tip1=="letnja_cena" || this.tip1=="zimska_cena" || this.tip1=="brojOsoba") && (this.broj === 0 || this.broj === null || this.broj === undefined)){
      this.error='Vrednost mora biti veća od 0!'
      return
    }
    
    if (this.tip1 == "naziv") {
      const postoji = this.mojeVikendice.some(v => v.naziv === this.variabla1);

      if (postoji) {
        this.error = "Već imate vikendicu sa takvim nazivom, unesite drugi naziv";
        return;
      }
      this.vikendiceServis.promeniNaziv(this.variabla1,this.nazivVikendice, this.ulogovan.kor_ime).subscribe((tmp) => {
        this.obrisiIresi()});
    }else if(this.tip1=="mesto"){
        this.vikendiceServis.promeniMesto(this.variabla1,this.nazivVikendice,this.ulogovan.kor_ime).subscribe((tmp)=>{
        this.obrisiIresi()
      })
    }else if(this.tip1=="usluge"){
        this.vikendiceServis.promeniUsluge(this.variabla1,this.nazivVikendice,this.ulogovan.kor_ime).subscribe((tmp)=>{
        this.obrisiIresi()
      })
    }else if(this.tip1=="letnja_cena"){
        this.vikendiceServis.promeniLetnjuCenu(this.broj,this.nazivVikendice,this.ulogovan.kor_ime).subscribe((tmp)=>{
        this.obrisiIresi()
      })
    }else if(this.tip1=="zimska_cena"){
        this.vikendiceServis.promeniZimskuCenu(this.broj,this.nazivVikendice,this.ulogovan.kor_ime).subscribe((tmp)=>{
        this.obrisiIresi()
      })
    }else if(this.tip1=="x"){
        this.vikendiceServis.promeniX(this.variabla1,this.nazivVikendice,this.ulogovan.kor_ime).subscribe((tmp)=>{
        this.obrisiIresi()
      })
    }else if(this.tip1=="y"){
        this.vikendiceServis.promeniY(this.variabla1,this.nazivVikendice,this.ulogovan.kor_ime).subscribe((tmp)=>{
        this.obrisiIresi()
      })
    }else if(this.tip1=="broj"){
        this.vikendiceServis.promeniTelefon(this.variabla1,this.nazivVikendice,this.ulogovan.kor_ime).subscribe((tmp)=>{
        this.obrisiIresi()
      })
    }else if(this.tip1=="brojOsoba"){
        this.vikendiceServis.promeniKapacitet(this.broj,this.nazivVikendice,this.ulogovan.kor_ime).subscribe((tmp)=>{
        this.obrisiIresi()
      })
    }
  }
  obrisiIresi(){
    this.tip1=''
    this.nazivVikendice=''
    this.broj=0
    this.variabla1=''
    this.azuriranje1=false
    this.mojeVikendice=[]
    this.dodavanjeSlika=false
    this.ngOnInit()
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
    this.pomoc.push(d)
    this.cnt++
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
  
  naziv:string=''
  mesto:string=''
  proveri(){
      this.vikendiceServis.pretrazi(this.naziv,this.mesto).subscribe((tmp)=>{
        this.sveVikendice=tmp
      })
  }
  slika(){
      this.slike.push({ base64code: this.base64code });
      this.obavestenje="Uspesno ste dodali sliku."
  }
  novNaziv:string=''
  novoMesto:string=''
  noveUsluge:string=''
  letnjaCena:number=0
  zimskaCena:number=0
  brojTelefona:string=''
  novoX:string=''
  novoY:string=''
  kapacitet:number=0
  slike:Slika[]=[]
  cnt:number=0;
  pomoc:string[]=[]
  indeks:number=0
  obavestenje:string=''
  zavrsi(){
    if(this.novNaziv=='' || this.novoMesto=='' || this.noveUsluge=='' || this.letnjaCena==0 || 
      this.zimskaCena==0 || this.brojTelefona=="" || this.novoX=="" || this.novoY=="" || this.kapacitet==0 || this.slike.length==0 ){
        this.obavestenje="Unesite sve podatke. Vikendica mora da ima bar jednu sliku."
        return
      }
    this.vikendiceServis.dodajVikendicu(this.novNaziv,this.ulogovan.kor_ime,this.novoMesto,this.noveUsluge,
      this.letnjaCena,this.zimskaCena,this.brojTelefona,this.novoX,this.novoY,this.slike,this.kapacitet).subscribe((tmp)=>{
      this.resetujFormu()
      this.mojeVikendice=[]
      this.ngOnInit()
    })
  }
  resetujFormu() {
    this.novNaziv = '';
    this.novoMesto = '';
    this.noveUsluge = '';
    this.letnjaCena = 0;
    this.zimskaCena = 0;
    this.brojTelefona = '';
    this.novoX = '';
    this.novoY = '';
    this.kapacitet = 0;
    this.slike = [];
    this.cnt = 0;
    this.pomoc = [];
    this.indeks = 0;
    this.obavestenje = '';
    this.base64code=''
    this.poruka=''
  }

  poruka:string=''

  ucitajJSON($event: Event): void {
  const target = $event.target as HTMLInputElement;
  const file: File = (target.files as FileList)[0];
  
  if (!file) return;
  
  const fileReader = new FileReader();
  
  fileReader.onload = (e) => {
    try {
      const jsonContent = e.target?.result as string;
      const vikendicaPodaci = JSON.parse(jsonContent);
      
      this.novNaziv = vikendicaPodaci.naziv || '';
      this.novoMesto = vikendicaPodaci.mesto || '';
      this.noveUsluge = vikendicaPodaci.opis_vikendice || '';
      this.letnjaCena = vikendicaPodaci.letnja_cena || 0;
      this.zimskaCena = vikendicaPodaci.zimska_cena || 0;
      this.brojTelefona = vikendicaPodaci.telefon || '';
      this.novoX = vikendicaPodaci.x || '';
      this.novoY = vikendicaPodaci.y || '';
      this.kapacitet = vikendicaPodaci.brojOsoba || 0;
      
      this.slike = [];
      this.poruka="Forma Vam je popunjena, dodajte slike ako zelite!"
      
     
      
    } catch (error) {

      this.error = 'Neispravan format JSON fajla';
    }
  };
  
  fileReader.onerror = () => {
    this.error = 'Greška pri čitanju fajla';
  };
  
  fileReader.readAsText(file);
  }
  obrisiVikendicu(vikendica:Vikendica){
    this.vikendiceServis.obrisiVikendicu(vikendica).subscribe((tmp)=>{
      this.mojeVikendice=[]
      this.mojeRezervacije=[]
      this.ngOnInit()
    })
  }
  // npm install chart.js 
  // npm install --save-dev @types/chart.js
  rezultati:{[naziv:string]:number[]}={}
  
  funkcija() {
  this.vikendiceServis.funkcija(this.ulogovan.kor_ime).subscribe((tmp) => {
    this.rezultati = {}; 
    for (let obj of tmp) {
      this.rezultati[obj.naziv] = obj.meseci;
    }
    console.log("Rezultati po vikendicama:", this.rezultati);

    
    this.crtajGrafikon();
  });
  } 
  chart: any;
  rezultati2: { [naziv: string]: { vikend: number; radniDani: number } } = {};

funkcija2() {
  this.vikendiceServis.funkcija2(this.ulogovan.kor_ime).subscribe((tmp) => {
    this.rezultati2 = {};

    for (let obj of tmp) {
      this.rezultati2[obj.naziv] = {
        vikend: obj.vikend,
        radniDani: obj.radniDani
      };
    }

    setTimeout(() => this.crtajPieGrafikone());
  });
}
ngAfterViewInit() {
  if (this.opcija4) {
    this.crtajGrafikon();
  }
}

ngOnChanges() {
  if (this.opcija4) {
    this.crtajGrafikon();
  }
}

crtajGrafikon() {
  
  const ctx = document.getElementById('barChart') as HTMLCanvasElement;
  if (!ctx) return;

  const labels = [
    'Januar', 'Februar', 'Mart', 'April', 'Maj', 'Jun',
    'Jul', 'Avgust', 'Septembar', 'Oktobar', 'Novembar', 'Decembar'
  ];

  const datasets = Object.keys(this.rezultati).map(naziv => ({
    label: naziv,
    data: this.rezultati[naziv],
    backgroundColor: this.randomColor()
  }));

  this.chart = new Chart(ctx, {
    type: 'bar',
    data: { labels, datasets },
    options: {
      responsive: true,
      scales: {
        x: { title: { display: true, text: 'Meseci' } },
        y: { title: { display: true, text: 'Broj rezervacija' }, beginAtZero: true }
      }
    }
  });
}

randomColor(): string {
  const r = Math.floor(Math.random() * 255);
  const g = Math.floor(Math.random() * 255);
  const b = Math.floor(Math.random() * 255);
  return `rgba(${r}, ${g}, ${b}, 0.6)`;
}
crtajPieGrafikone() {
  Object.keys(this.rezultati2).forEach((naziv) => {
    const id = `pieChart-${naziv}`;
    
    const ctx = document.getElementById(id) as HTMLCanvasElement;
    if (!ctx) return;

    const data = this.rezultati2[naziv];
    const dataset = [data.vikend, data.radniDani];

    new Chart(ctx, {
      type: 'pie',
      data: {
        labels: ['Vikend', 'Radni dani'],
        datasets: [{
          data: dataset,
          backgroundColor: ['#FF6384', '#36A2EB']
        }]
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: `Vikend vs Radni dani - ${naziv}`
          }
        }
      }
    });
  });
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
  promenaLozinke(){
    localStorage.setItem('passwordChangeReturnRoute', 'vlasnik')
    this.router.navigate(['promenaLozinke'])
  }
  azurirajVikendicu(vikendica:Vikendica){
    this.nazivVikendice=vikendica.naziv
    this.azuriranje1=true
    this.tip1=''
    this.variabla1=''
    this.broj=0
    this.error=''
  }

  zatvoriAzuriranje(){
    this.azuriranje1=false
    this.nazivVikendice=''
    this.tip1=''
    this.variabla1=''
    this.broj=0
    this.error=''
  }
}
