import { Component, OnInit } from '@angular/core';
import { BudgetItem } from '../../shared/models/budget-item.model';
import { UpdateEvent } from '../budget-item-list/budget-item-list.component';
import { LsService } from '../ls.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit {
  budgetItems: BudgetItem[] = [];
  totalBudget: number = 0;

  constructor(private localStore: LsService) {
  }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.budgetItems = this.localStore.getData();
    this.budgetItems.forEach((item) => {
      this.totalBudget += item.amount || 0;
    });
  }

  updateStore() {
    this.localStore.saveData(this.budgetItems);
  }

  addItem(newItem: BudgetItem) {
    this.budgetItems.push(newItem);
    this.totalBudget += newItem.amount || 0;
    this.updateStore();
  }

  updateItem(updateEvent: UpdateEvent) {
    this.budgetItems[this.budgetItems.indexOf(updateEvent.old)]
      = updateEvent.new;

    this.totalBudget -= updateEvent.old.amount || 0;
    this.totalBudget += updateEvent.new.amount || 0;
    this.updateStore();

  }

  deleteItem(item: BudgetItem) {
    const index = this.budgetItems.indexOf(item);
    this.budgetItems.splice(index, 1);
    this.totalBudget -= item.amount || 0;
    this.updateStore();
  }
}
