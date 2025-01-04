import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { RatingModule } from 'primeng/rating';
import { Product } from '../../../types';

@Component({
  selector: 'app-product-form-dialog',
  imports: [DialogModule, ButtonModule, FormsModule, RatingModule],
  standalone: true,
  templateUrl: './product-form-dialog.component.html',
})
export class ProductDialogFormComponent {
  @Input() visible: boolean = false;
  @Output() confirm = new EventEmitter<Product>();
  @Output() cancel = new EventEmitter<void>();

  showDialog() {
    this.visible = true;
  }

  @Input() product: Product = {
    name: '',
    image: '',
    price: '',
    rating: 0,
  };

  onConfirm() {
    this.confirm.emit(this.product);
  }

  onCancel() {
    this.cancel.emit();
  }
}
