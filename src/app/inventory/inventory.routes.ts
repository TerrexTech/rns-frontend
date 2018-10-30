import { AddComponent } from './add/add.component'
import { ShowComponent } from './show/show.component'

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
  }
}
