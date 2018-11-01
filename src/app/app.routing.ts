import { NgModule } from '@angular/core'
import { Route, RouterModule } from '@angular/router'

import { AdminLayoutComponent } from './layouts/admin/admin-layout.component'
import { AuthLayoutComponent } from './layouts/auth/auth-layout.component'
import { AuthGuard } from './_Auth/auth.guard'
import { AppRoutes } from './app.routes'

function createModuleRoutes(routeDef: any): any {
  return Object.keys(routeDef)
    .reduce((routes: any, routeName: any): Route[] => {
      const route = routeDef[routeName]

      const hasChildren = route.children &&
        Object.keys(route.children).length > 0
      if (hasChildren) {
        const newRoute = {
          path: route.path,
          component: route.component,
          canActivate: route.isPublic ? undefined : [AuthGuard],
          children: createModuleRoutes(route.children)
        }

        return routes.concat(newRoute)
      }

      return routes.concat({
        path: route.path,
        component: route.component,
        canActivate: route.isPublic ? undefined : [AuthGuard]
      })
    },
    []
  )
}

@NgModule({
    imports: [RouterModule.forRoot(
      [
        {
          path: '',
          component: AdminLayoutComponent,
          children: createModuleRoutes(AppRoutes)
        }
      ]
    )],
    exports: [RouterModule]
})

export class AppRoutingModule { }
