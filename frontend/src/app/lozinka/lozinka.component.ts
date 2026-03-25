import { Component, inject } from '@angular/core';
import Korisnik from '../modeli/korisnik';
import { KorisnikService } from '../servisi/korisnik.service';
import { Router } from '@angular/router';
import { FormsModule, FormSubmittedEvent } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-lozinka',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './lozinka.component.html',
  styleUrl: './lozinka.component.css'
})
export class LozinkaComponent {
  ulogovan:Korisnik=new Korisnik()
  private korisnikServis = inject(KorisnikService)
  private router=inject(Router)
  staraLozinka:string=''
  novaLozinka1:string=''
  novaLozinka2:string=''
  error:string=''
  private lozinkaRegex = /^[A-Za-z](?=.*[A-Z])(?=(?:.*[a-z]){3,})(?=.*\d)(?=.*[^A-Za-z0-9]).{5,9}$/;
  private returnRoute: string = 'turista'; // Default route
  
  ngOnInit(): void {
    let korisnik = localStorage.getItem('ulogovan');
    if (korisnik != null) this.ulogovan = JSON.parse(korisnik);
    
    // Check if there's a stored return route
    const storedRoute = localStorage.getItem('passwordChangeReturnRoute');
    if (storedRoute) {
      this.returnRoute = storedRoute;
    }
  }

  azuriraj(){
    this.korisnikServis.proveriLozinku(this.ulogovan.kor_ime,this.staraLozinka).subscribe((msg)=>{ 
      if(msg.msg=="OK"){
        if(!this.lozinkaRegex.test(this.novaLozinka1)){
          this.error='Nova lozinka nije u dobrom formatu.'
          return
        }
        if(this.novaLozinka1==this.novaLozinka2 && this.staraLozinka!=this.novaLozinka1){
          this.korisnikServis.promeniLozinku(this.ulogovan.kor_ime,this.novaLozinka1).subscribe((msg)=>{
            localStorage.removeItem("ulogovan") // Fixed typo: was "ulgovan"
            localStorage.removeItem("passwordChangeReturnRoute") // Clean up stored route
            this.router.navigate(['login'])
          })
        } else if(this.novaLozinka1!=this.novaLozinka2) {
          this.error='Nove lozinke se ne poklapaju!'
        } else if(this.staraLozinka==this.novaLozinka1) {
          this.error='Nova lozinka mora biti drugačija od stare!'
        }
      }else{
        this.error='Stara lozinka nije validna!'
      }}
    )
  }
  nazad(){
    this.router.navigate([this.returnRoute])
  }

}
