import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register-page.html',
  styleUrl: './register-page.css',
})
export class RegisterPage implements OnInit {
  form: any = {
    username: null,
    password: null,
    firstName: null,
    lastName: null,
  };

  constructor(
    private http: HttpClient,
    private route: Router
  ) {}

  ngOnInit(): void {}

  onSubmit(): void {
    const { username, password, firstName, lastName } = this.form;

    console.log(this.form);

    this.http
      .post('https://localhost:7029/api/login/register', this.form, {
        responseType: 'text',
      })
      .subscribe((data) => {
        this.route.navigate(['/login']);
      });
  }
}