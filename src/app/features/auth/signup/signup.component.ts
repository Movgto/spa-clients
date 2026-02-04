import { Component } from "@angular/core";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { CustomValidators } from "../../../shared/validators/custom-validators";
import { MatButtonModule } from "@angular/material/button";
import { AuthService } from "../../../core/auth/auth.service";

@Component({
    selector: 'app-signup',
    templateUrl: 'signup.component.html',
    styleUrl: './signup.component.css',
    imports: [
        ReactiveFormsModule,
        MatInputModule,
        MatFormFieldModule,
        MatButtonModule
    ]
})
export class SignupComponent {
    private fb = new FormBuilder();

    public form = this.fb.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required],
        passwordConfirmation: ['', [Validators.required, CustomValidators.passwordConfirmationValidator]]     
    })

    constructor(
        private authService: AuthService
    ) {}

    public onSubmit() {
        if (!this.form.valid) return;

        this.authService.signup(this.form.value).subscribe({
            next: res => {
                console.log('Signup response:', res);
            }
        });
        console.log(this.form.value);
    }
}