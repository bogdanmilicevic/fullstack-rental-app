import { Component, inject, AfterViewInit } from '@angular/core';
import Vikendica from '../modeli/vikendica';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import * as L from 'leaflet'
import 'leaflet/dist/leaflet.css';
import { Router } from '@angular/router';
@Component({
  selector: 'app-vikendica',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './vikendica.component.html',
  styleUrl: './vikendica.component.css'
})
export class VikendicaComponent implements AfterViewInit {
  private router = inject(Router)
  vikendica:Vikendica=new Vikendica()
  
  ngOnInit():void{ 
    //npm install leaflet
    //npm install --save-dev @types/leaflet
    let vikendica = localStorage.getItem('vikendica');
    if (vikendica != null) this.vikendica = JSON.parse(vikendica);
  }
  
  ngAfterViewInit(): void {
    setTimeout(() => {
      this.configMap();
    }, 100);
  }
 
  trenutniIndex = 0;

  nextSlika() {
    if (this.vikendica.slike && this.vikendica.slike.length > 0) {
      this.trenutniIndex = (this.trenutniIndex + 1) % this.vikendica.slike.length;
    }
  }

  prevSlika() {
    if (this.vikendica.slike && this.vikendica.slike.length > 0) {
      this.trenutniIndex =
        (this.trenutniIndex - 1 + this.vikendica.slike.length) %
        this.vikendica.slike.length;
    }
  }
  map:any
  configMap(){
    this.map=L.map('map',{
      center:[Number(this.vikendica.x),Number(this.vikendica.y)],
      zoom:15
    })
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
    }).addTo(this.map);
    const center = this.map.getCenter();

    L.marker(center)
    .addTo(this.map)
    .bindPopup('Lokacija vikendice');}

  nazad(){
    localStorage.removeItem("vikendica")
    localStorage.setItem("parametarTurista", "true")
    this.router.navigate(["turista"])
  }
  iznajmi(){
    
    this.router.navigate(["iznajmljivanje"])
  }

  getStars(rating: number): string[] {
    
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(i <= rating ? 'filled' : 'empty');
    }
    return stars;
  }
}
