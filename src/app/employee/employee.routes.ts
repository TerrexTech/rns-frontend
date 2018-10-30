import { UserAddComponent } from './user-add/user-add.component'
import { UserTableComponent } from './user-table/user-table.component'

export const EmployeeRoutes = {
    add: {
        path: 'add-user',
        title: 'Add User',
        component: UserAddComponent
    },
    show: {
        path: 'view-users',
        title: 'View User',
        component: UserTableComponent
    }
}
