import { Component, EventEmitter, Input, Output } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DialogModule } from "primeng/dialog";
import {
	FormBuilder,
	FormsModule,
	ReactiveFormsModule,
	ValidatorFn,
	Validators
} from "@angular/forms";
import { ButtonDirective } from "primeng/button";
import { Product } from "../../../types";
import { RatingModule } from "primeng/rating";

@Component({
	selector: "app-edit-dialog",
	standalone: true,
	imports: [
		CommonModule,
		DialogModule,
		FormsModule,
		ButtonDirective,
		RatingModule,
		ReactiveFormsModule
	],
	templateUrl: "./edit-dialog.component.html",
	styleUrl: "./edit-dialog.component.scss"
})
export class EditDialogComponent {
	constructor(private formBuilder: FormBuilder) {}

	@Input() visible: boolean = false;
	@Output() visibleChange = new EventEmitter<boolean>();

	@Input() header!: string;
	@Input() product: Product = {
		name: "",
		image: "",
		price: "",
		rating: 0
	};

	@Output() confirm = new EventEmitter<Product>();

	specialCharacterValidator(): ValidatorFn {
		return control => {
			const hasSpecialCharacter = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(
				control.value
			);

			return hasSpecialCharacter ? { hasSpecialCharacter: true } : null;
		};
	}

	productForm = this.formBuilder.group({
		name: ["", [Validators.required, this.specialCharacterValidator()]],
		image: [""],
		price: ["", [Validators.required]],
		rating: [0]
	});

	ngOnChanges() {
		this.productForm.patchValue(this.product);
	}

	onConfirm() {
		const { name, image, price, rating } = this.productForm.value;

		this.confirm.emit({
			name: name || "",
			image: image || "",
			price: price || "",
			rating: rating || 0
		});

		this.visible = false;
		this.visibleChange.emit(this.visible);
	}

	onCancel() {
		this.visible = false;
		this.visibleChange.emit(this.visible);
	}
}
