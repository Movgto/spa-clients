import { ValidatorFn } from "@angular/forms";

export class CustomValidators {
    public static passwordConfirmationValidator: ValidatorFn = (control) => {
        const password = control.get('password');

        const passwordConfirmation = control.get('passwordConfirmation');

        if (!!password || !!passwordConfirmation) return { passwordConfirmation: 'Password has not been set' }

        return password === passwordConfirmation ? null : { passwordConfirmation: "Passwords don't match." }
    }
}