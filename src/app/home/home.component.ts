import { Component, ViewChild } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Paginator, PaginatorModule } from "primeng/paginator";
import { ButtonModule } from "primeng/button";
import { ProductsService } from "../services/products.service";
import { Product, Products } from "../../types";
import { ProductComponent } from "../components/product/product.component";
import { EditDialogComponent } from "../components/edit-dialog/edit-dialog.component";

@Component({
	selector: "app-home",
	standalone: true,
	imports: [
		CommonModule,
		PaginatorModule,
		ButtonModule,
		ProductComponent,
		EditDialogComponent
	],
	templateUrl: "./home.component.html",
	styleUrl: "./home.component.scss"
})
export class HomeComponent {
	constructor(private productsService: ProductsService) {}

	@ViewChild("paginator") paginator: Paginator | undefined;
	products: Product[] = [];
	totalRecords: number = 0;
	rows: number = 5;

	isAddDialogVisible: boolean = false;
	isEditDialogVisible: boolean = false;

	selectedProduct: Product = {
		id: 0,
		name: "",
		image: "",
		price: "",
		rating: 0
	};

	showAddDialog() {
		this.isAddDialogVisible = true;
	}

	showEditDialog(product: Product) {
		this.selectedProduct = product;
		this.isEditDialogVisible = true;
	}

	showDeleteDialog(product: Product) {
		if (!product.id) {
			return;
		}

		this.deleteProduct(product.id);
	}

	onConfirmAdd(product: Product) {
		this.addProduct(product);
		this.isAddDialogVisible = false;
	}

	onConfirmEdit(product: Product) {
		if (!this.selectedProduct.id) {
			return;
		}

		this.editProduct(product, this.selectedProduct.id);
		this.isEditDialogVisible = false;
	}

	onPageChange(event: any) {
		this.getProducts(event.page, event.rows);
	}

	getProducts(page: number, perPage: number) {
		this.productsService.getProducts({ page, perPage }).subscribe({
			next: (data: Products) => {
				this.products = data.items;
				this.totalRecords = data.total;
			},
			error: error => console.log(error)
		});
	}

	addProduct(product: Product) {
		this.productsService.addProduct(product).subscribe({
			next: data => console.log(data),
			error: error => console.log(error)
		});
	}

	editProduct(product: Product, id: number) {
		this.productsService.editProduct(product, id).subscribe({
			next: data => console.log(data),
			error: error => console.log(error)
		});
	}

	deleteProduct(id: number) {
		this.productsService.deleteProduct(id).subscribe({
			next: data => console.log(data),
			error: error => console.log(error)
		});
	}

	ngOnInit() {
		this.getProducts(0, this.rows);
	}
}
