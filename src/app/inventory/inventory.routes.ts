import { AddComponent } from './add/add.component'
import { ShowComponent } from './show/show.component'
import { HistoryComponent } from './history/history.component'
import { SaleComponent } from './sale/sale.component'

export const InventoryRoutes = {
  add: {
    path: 'add',
    title: 'Add',
    component: AddComponent
  },
  view: {
    path: 'view',
    title: 'View',
    component: ShowComponent
  },
  sale: {
    path: 'sale',
    title: 'Sale',
    component: SaleComponent
  },
  history: {
    path: 'history',
    title: 'History',
    component: HistoryComponent
  }
}
