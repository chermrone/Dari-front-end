import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { TokenStorageService } from "../auth/token-storage.service";
import { OrderUser } from "../models/OrderUser";
import { User } from "../models/user";
import { UserService } from "./user.service";


@Injectable({
    providedIn: 'root'
})
export class OrderUserService {
    shoppingCart = new BehaviorSubject(null);
    username = sessionStorage.getItem("AuthUsername");
    user: User = new User();

    constructor(
        private httpclient: HttpClient,
        private tokenStorageService: TokenStorageService,
        private userService: UserService
    ) {

    }

    createOrder(orderUser: OrderUser): Observable<OrderUser>{
        return this.httpclient.post<OrderUser>(environment.baseUrl + 'Order/add/', orderUser);
    }

    checkout(orderUser: OrderUser): Observable<OrderUser>{
        return this.httpclient.get<OrderUser>(environment.baseUrl + 'api/checkout/'+orderUser.orderId);
    }

    charge(id: number): Observable<OrderUser>{
        return this.httpclient.get<OrderUser>(environment.baseUrl + 'api/charge/'+id);
    }

}
