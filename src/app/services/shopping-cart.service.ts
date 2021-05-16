import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { TokenStorageService } from "../auth/token-storage.service";
import { ShoppingCart } from "../models/ShoppingCart";
import { User } from "../models/user";
import { UserService } from "./user.service";


@Injectable({
    providedIn: 'root'
})
export class ShoppingCartService {

    // shoppingCart: ShoppingCart = null;

    shoppingCart = new BehaviorSubject(null);
    username =  sessionStorage.getItem("AuthUsername");
    user: User = new User();

    constructor(
        private httpclient: HttpClient, 
        private tokenStorageService: TokenStorageService,
        private userService: UserService
        ) { 
            this.userService.getUserByUserName(this.username).subscribe(
                (user) => {
                    this.user = user;
                    let shoppingCart = new ShoppingCart()
                    shoppingCart.us = new User()
                    shoppingCart.us.userName = user.userName
                    shoppingCart.us.idUser = user.idUser
                    shoppingCart.fournitureAds = []
                    this.shoppingCart.next(shoppingCart)
                }
            )
        }

    createCart(shoppingCart: ShoppingCart): Observable<ShoppingCart> {    
        this.updateValue(this.username,shoppingCart);
        return this.httpclient.post<ShoppingCart>(environment.baseUrl + 'ShoppingCart/add', shoppingCart);
    }

    updateCart(shoppingCart: ShoppingCart): Observable<ShoppingCart> {    
        this.updateValue(this.username,shoppingCart);
        return this.httpclient.put<ShoppingCart>(environment.baseUrl + 'ShoppingCart/modif/'+shoppingCart.shoppingCartId, shoppingCart);
    }

    getShoppingCart(id: number): Observable<ShoppingCart> {        
        const observable = this.httpclient.get<ShoppingCart>(environment.baseUrl + 'ShoppingCart/all/' + id);
        observable.subscribe(
            (data) =>{
                this.updateValue(this.username,data);
            }
        )
        return observable;
    }    

    getShoppingCartByUsername(username: string): Observable<ShoppingCart>{

        const observable = this.httpclient.get<ShoppingCart>(environment.baseUrl + 'ShoppingCart/byUsername/' + username);
        observable.subscribe(
            (data:ShoppingCart) =>{
                this.updateValue(username,data);
            }
        )

        return observable;
    }

    updateValue(username: string,shoppingCart: ShoppingCart){
        shoppingCart.us = new User()
        shoppingCart.us.userName = username
        shoppingCart.us.idUser = this.user.idUser
        // console.log("updated shopping cart:"+JSON.stringify(shoppingCart));
        this.shoppingCart.next(shoppingCart);
    }
}
