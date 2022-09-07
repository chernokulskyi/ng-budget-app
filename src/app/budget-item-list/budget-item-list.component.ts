import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BudgetItem } from '../../shared/models/budget-item.model';
import { MatDialog } from '@angular/material/dialog';
import { EditItemModalComponent } from '../edit-item-modal/edit-item-modal.component';

export interface UpdateEvent {
  old: BudgetItem,
  new: BudgetItem
}

@Component({
  selector: 'app-budget-item-list',
  templateUrl: './budget-item-list.component.html',
  styleUrls: ['./budget-item-list.component.scss'],
})
export class BudgetItemListComponent implements OnInit {
  @Input()
    // @ts-ignore
  budgetItems: BudgetItem[];

  @Output()
  updateItem: EventEmitter<UpdateEvent> = new EventEmitter<UpdateEvent>();

  @Output()
  deleteItem: EventEmitter<BudgetItem> = new EventEmitter<BudgetItem>();

  constructor(public dialog: MatDialog) {
  }

  ngOnInit(): void {
  }

  onEditItem(item: BudgetItem) {
    const dialogRef = this.dialog.open(EditItemModalComponent, {
      width: '580px',
      data: item,
    });

    dialogRef.afterClosed().subscribe((result: BudgetItem) => {
      if (result) {
        this.updateItem.emit({ old: item, new: result });
      }
    });
  }

  onDeleteItem(item: BudgetItem) {
    this.deleteItem.emit(item);
  }
}
