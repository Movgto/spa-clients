import { ValidatorFn } from "@angular/forms";

export class CustomValidators {
    public static passwordConfirmationValidator: ValidatorFn = (control) => {
        const password = control.get('password');

        const passwordConfirmation = control.get('passwordConfirmation');    

        if (!password || !passwordConfirmation) return null;

        console.log('Comparing passwords...');
        console.log(password.value + ' = ' + passwordConfirmation.value);

        const isMatch = password.value === passwordConfirmation.value;

        if (!isMatch) {
            passwordConfirmation.setErrors({
                passwordMismatch: true
            });
        }

        return isMatch ? null : { passwordMismatch: true };
    }
}