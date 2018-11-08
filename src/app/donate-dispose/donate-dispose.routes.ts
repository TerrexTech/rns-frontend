import { DonateFoodComponent } from './donate-food/donate-food.component'
import { DisposeFoodComponent } from './dispose-food/dispose-food.component'

export const DonateDisposeRoutes = {
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
