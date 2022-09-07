import { Injectable } from '@angular/core';
import { BudgetItem } from '../shared/models/budget-item.model';

@Injectable({
  providedIn: 'root',
})
export class LsService {
  constructor() {
  }

  public getData() {
    const data = localStorage.getItem('data');
    return data ? JSON.parse(data) : [];
  }

  public saveData(data: BudgetItem[]) {
    localStorage.setItem('data', JSON.stringify(data));
  }
}
