import { Component } from '@angular/core';
import { SharedFormModule } from '@app/shared/modules/SharedFormModule';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '@app/core/auth/auth.service';

@Component({
  selector: 'app-login.component',
  imports: [
    SharedFormModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private fb = new FormBuilder();

  constructor(
    private authService: AuthService
  ){}

  public form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  })

  public onSubmit() {
    if (this.form.valid) {
      console.log('Login form data:');
      console.log(this.form.value);

      this.authService.login(this.form.value).subscribe({
        next: res => {
          console.log('Login response', res);
        }
      })
    }
  }
}
