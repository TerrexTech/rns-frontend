import { ViewFlashsaleComponent } from './view-flashsale/view-flashsale.component'
import { FlashsaleHistoryComponent } from './flashsale-history/flashsale-history.component'

export const FlashSaleRoutes = {
    viewsales: {
        path: 'view-sales',
        title: 'View Flash Sales',
        component: ViewFlashsaleComponent
    },
    flashhistory: {
        path: 'flash-history',
        title: 'Flash Sale History',
        component: FlashsaleHistoryComponent
    }
}
