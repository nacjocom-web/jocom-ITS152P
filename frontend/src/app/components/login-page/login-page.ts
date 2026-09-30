import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Auth } from '../../services/auth';
import { TokenStorage } from '../../services/token-storage';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login-page.html',
  styleUrl: './login-page.css',
})
export class LoginPage implements OnInit {
  form: any = {
    username: null,
    password: null,
  };

  constructor(
    private authService: Auth,
    private tokenStorage: TokenStorage,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.authService.isLoggedIn = true;
      this.router.navigate(['/']);
    }
  }

  onSubmit(): void {
    const { username, password } = this.form;

    this.http
      .post('https://localhost:7029/api/login/login', { username, password }, { responseType: 'text' })
      .subscribe({
        next: (response: string) => {
          // If response is JSON string, parse it; otherwise treat as token string
          try {
            const data = JSON.parse(response);
            this.tokenStorage.saveToken(data.id_token || data.token || response);
            if (data.id) this.tokenStorage.saveUser(data.id);
          } catch {
            this.tokenStorage.saveToken(response);
          }

          this.authService.isLoggedIn = true;
          this.router.navigate(['/']);
        },
        error: (err) => {
          console.error('Login failed:', err);
        }
      });
  }
}