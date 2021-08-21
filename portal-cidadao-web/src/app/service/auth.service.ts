import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from './base.service';
import { Router } from '@angular/router';
import { IUsuarioModel } from '../models/usuario.model';

@Injectable({ providedIn: 'root' })
export class AuthService extends BaseService {
    private currentUserSubject!: BehaviorSubject<IUsuarioModel>;
    public currentUser!: Observable<IUsuarioModel>;

    constructor(public httpClient: HttpClient, private router: Router) {
        super(httpClient);
        try {
            const currentUser = localStorage.getItem('currentUser');
            if(currentUser)
                this.currentUserSubject = new BehaviorSubject<IUsuarioModel>(JSON.parse(currentUser));
            this.currentUser = this.currentUserSubject.asObservable();
        } catch {
            this.logout();
        }

    }

    public get currentUserValue(): IUsuarioModel {
        debugger
        if (this.currentUserSubject) {
            return this.currentUserSubject.value;
        }else{
            const user: IUsuarioModel = {} as IUsuarioModel;
            return user;
        }
    }

    public login(login: string, senha: string) {
        debugger
        return this.httpClient.post<any>(`${this.apiBaseUrl}/Usuario/login`, { login, senha })
            .pipe(map(user => {
                if (user.sucesso) {
                    debugger
                    localStorage.setItem('currentUser', JSON.stringify(user.dados));
                    this.currentUserSubject.next(user.dados);
                }
                return user;
            }));
    }

    public logout() {
        localStorage.removeItem('currentUser');
        if (this.currentUserSubject) {
            const user: IUsuarioModel = {} as IUsuarioModel;
            this.currentUserSubject.next(user);
        }
        
        this.router.navigate(['/login']);
    }
}