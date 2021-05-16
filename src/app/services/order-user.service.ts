import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { TokenStorageService } from "../auth/token-storage.service";
import { CardInfo } from "../models/CardInfo";
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

    createOrder(orderUser: OrderUser): Observable<OrderUser> {
        return this.httpclient.post<OrderUser>(environment.baseUrl + 'Order/add', orderUser);
    }

    updateOrder(orderUser: OrderUser): Observable<OrderUser> {
        return this.httpclient.put<OrderUser>(environment.baseUrl + 'Order/modif/' + orderUser.orderId, orderUser);
    }

    checkout(orderId: number): Observable<OrderUser> {
        return this.httpclient.get<OrderUser>(environment.baseUrl + 'checkout/' + orderId);
    }

    charge(id: number, card: CardInfo,ip:string): Observable<OrderUser> {
        return this.httpclient.post<OrderUser>(environment.baseUrl + 'charge/' + id + "?ipAddress=" + ip, card);
    }

}
