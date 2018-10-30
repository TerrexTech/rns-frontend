import { ViewFlashsaleComponent } from './view-flashsale/view-flashsale.component'
import { AddFlashsaleComponent } from './add-flashsale/add-flashsale.component'

export const FlashSaleRoutes = {
    viewsales: {
        path: 'view-sales',
        title: 'View Flash Sales',
        component: ViewFlashsaleComponent
    },
    addflashsales: {
        path: 'add-sales',
        title: 'Add Flash Sales',
        component: AddFlashsaleComponent
    }
}
