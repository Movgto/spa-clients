import { HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { AuthService } from "./auth.service";
import { catchError, switchMap, throwError } from "rxjs";

export const authInterceptor: HttpInterceptorFn = (req, next) => {
    const authService = inject(AuthService);

    const token = authService.getToken();

    if (!!token) {
        req = req.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`
            },
            withCredentials: true
        })
    }

    return next(req).pipe(
        catchError((err) => {
            if (err.status === 401 && !req.url.includes('/refresh')) {
                authService.refreshToken().pipe(
                    switchMap(res => {
                        const reqClone = req.clone({
                            setHeaders: {
                                Authorization: 'Bearer ' + res.token
                            }                            
                        })

                        return next(reqClone);
                    }),
                    catchError(err => {
                        authService.logout();

                        return throwError(() => err)
                    })
                )
            }

            return throwError(() => err)
        })
    )
}