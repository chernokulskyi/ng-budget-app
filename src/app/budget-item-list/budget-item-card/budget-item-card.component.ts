import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BudgetItem } from '../../../shared/models/budget-item.model';

@Component({
  selector: 'app-budget-item-card',
  templateUrl: './budget-item-card.component.html',
  styleUrls: ['./budget-item-card.component.scss'],
})
export class BudgetItemCardComponent implements OnInit {
  @Input()
    // @ts-ignore
  item: BudgetItem;

  @Output()
  editItem: EventEmitter<void> = new EventEmitter<void>();

  @Output()
  deleteItem: EventEmitter<void> = new EventEmitter<void>();

  constructor() {
  }

  ngOnInit(): void {
  }

  onCardClick() {
    this.editItem.emit();
  }

  onDelete() {
    this.deleteItem.emit();
  }
}
