import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit, OnDestroy {
  isLoggedIn: boolean = false;
  userType: string = '';
  username: string = '';
  private storageListener: any;

  ngOnInit() {
    this.checkLoginStatus();
    // Listen for storage changes (when user logs in/out in another tab)
    this.storageListener = window.addEventListener('storage', (e) => {
      if (e.key === 'ulogovan') {
        this.checkLoginStatus();
      }
    });
    
    // Also check periodically for changes
    setInterval(() => {
      this.checkLoginStatus();
    }, 1000);
  }

  ngOnDestroy() {
    if (this.storageListener) {
      window.removeEventListener('storage', this.storageListener);
    }
  }

  checkLoginStatus() {
    const loggedUser = localStorage.getItem('ulogovan');
    if (loggedUser) {
      this.isLoggedIn = true;
      const user = JSON.parse(loggedUser);
      this.username = user.kor_ime;
      this.userType = user.tip || 'admin';
    } else {
      this.isLoggedIn = false;
      this.username = '';
      this.userType = '';
    }
  }

  logout() {
    localStorage.clear();
    window.location.href = '/login';
  }
}
