import {
	Component,
	EventEmitter,
	Input,
	Output,
	ViewChild
} from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RatingModule } from "primeng/rating";
import { ButtonModule } from "primeng/button";
import { ConfirmationService } from "primeng/api";
import { ConfirmPopupModule } from "primeng/confirmpopup";
import { Product } from "../../../types";
import { PricePipe } from "../../pipes/price.pipe";
import { TruncateNamePipe } from "../../pipes/truncate-name.pipe";

@Component({
	selector: "app-product",
	standalone: true,
	imports: [
		FormsModule,
		RatingModule,
		ButtonModule,
		ConfirmPopupModule,
		PricePipe,
		TruncateNamePipe
	],
	providers: [ConfirmationService],
	templateUrl: "./product.component.html",
	styleUrl: "./product.component.scss"
})
export class ProductComponent {
	constructor(private confirmationService: ConfirmationService) {}

	@ViewChild("deleteButton") deleteButton: any;
	@Input() product!: Product;
	@Output() edit: EventEmitter<Product> = new EventEmitter<Product>();
	@Output() delete: EventEmitter<Product> = new EventEmitter<Product>();

	editProduct() {
		this.edit.emit(this.product);
	}

	confirmDelete() {
		this.confirmationService.confirm({
			target: this.deleteButton.nativeElement,
			message: "Are you sure that you want to delete this product?",
			accept: () => {
				this.deleteProduct();
			}
		});
	}

	deleteProduct() {
		this.delete.emit(this.product);
	}
}
