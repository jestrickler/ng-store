import { Injectable } from "@angular/core";
import { ApiService } from "./api.service";
import { Observable } from "rxjs";
import { PaginationParams, Product, Products } from "../../types";

@Injectable({
	providedIn: "root"
})
export class ProductsService {
	constructor(private apiService: ApiService) {}

	url = "http://localhost:3000/clothes";

	getProducts = (params: PaginationParams): Observable<Products> =>
		this.apiService.get(this.url, { params, responseType: "json" });

	addProduct = (product: Product): Observable<Products> =>
		this.apiService.post(this.url, product, {});

	editProduct = (product: Product, id: number): Observable<Products> =>
		this.apiService.put(`${this.url}/${id}`, product, {});

	deleteProduct = (id: number): Observable<Products> =>
		this.apiService.delete(`${this.url}/${id}`, {});
}
