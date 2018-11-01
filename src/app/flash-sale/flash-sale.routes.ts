import { ViewFlashsaleComponent } from './view-flashsale/view-flashsale.component'
import { DonateFoodComponent } from './donate-food/donate-food.component'
import { DisposeFoodComponent } from './dispose-food/dispose-food.component'

export const FlashSaleRoutes = {
    viewsales: {
        path: 'view-sales',
        title: 'View Flash Sales',
        component: ViewFlashsaleComponent
    },
    disposefood: {
        path: 'dispose-food',
        title: 'Dispose Food',
        component: DisposeFoodComponent
    },
    donatefood: {
        path: 'donate-food',
        title: 'Donate Food',
        component: DonateFoodComponent
    }
}
