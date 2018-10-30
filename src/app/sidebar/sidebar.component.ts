import { Component, OnInit } from '@angular/core'

import { AppRoutes } from '../../app/app.routes'
import { JWTService } from '../../app/_Auth/jwt.service'
import { User } from '../../app/_Auth/User.model'

@Component({
  selector: 'component-sidebar-cmp',
  templateUrl: 'sidebar.component.html',
  styleUrls: ['sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  private jwt: JWTService
  public user: User

  public routes: any
  public menuItems: any
  public routeIconDef = [
    {
      route: AppRoutes.dashboard,
      icon: 'nc-icon nc-bank'
    },
    {
      route: AppRoutes.employee,
      icon: 'nc-icon nc-user-run',
      children: [
        {
          route: AppRoutes.employee.children.add,
          ab: 'AD'
        },
        {
          route: AppRoutes.employee.children.show,
          ab: 'SHS'
        }
      ]
    },
    {
      route: AppRoutes.inventory,
      icon: 'nc-icon nc-box-2',
      children: [
        {
          route: AppRoutes.inventory.children.add,
          ab: 'AD'
        },
        {
          route: AppRoutes.inventory.children.view,
          ab: 'V'
        }
      ]
    },
    {
      route: AppRoutes.reports,
      icon: 'nc-icon nc-box-2',
      children: [
        {
          route: AppRoutes.reports.children.ethylene,
          ab: 'ET'
        },
        {
          route: AppRoutes.reports.children.flashsale,
          ab: 'FS'
        },
        {
          route: AppRoutes.reports.children.inventory,
          ab: 'IN'
        },
        {
          route: AppRoutes.reports.children.savings,
          ab: 'SA'
        },
        {
          route: AppRoutes.reports.children.sensor,
          ab: 'SE'
        },
        {
          route: AppRoutes.reports.children.temphumid,
          ab: 'TE'
        },
        {
          route: AppRoutes.reports.children.waste,
          ab: 'WA'
        }
      ]
    },
    {
      route: AppRoutes.monitoring,
      icon: 'nc-icon nc-box-2',
      children: [
        {
          route: AppRoutes.monitoring.children.carbon,
          ab: 'CA'
        },
        {
          route: AppRoutes.monitoring.children.ethylene,
          ab: 'ET'
        },
        {
          route: AppRoutes.monitoring.children.sensor,
          ab: 'SE'
        },
        {
          route: AppRoutes.monitoring.children.temperature,
          ab: 'TH'
        }
      ]
    },
    {
      route: AppRoutes.flashsale,
      icon: 'nc-icon nc-box-2',
      children: [
        {
          route: AppRoutes.flashsale.children.viewsales,
          ab: 'FS'
        },
        {
          route: AppRoutes.flashsale.children.addflashsales,
          ab: 'AF'
        }
      ]
    },
    {
      route: AppRoutes.warning,
      icon: 'nc-icon nc-box-2',
      children: [
        {
          route: AppRoutes.warning,
          ab: 'WA'
        }
      ]
    }
  ]

  constructor(jwt: JWTService) {
    this.jwt = jwt
  }

  upperFirstLetter = (word: string): string => {
    return word.charAt(0)
               .toUpperCase() + word.slice(1)
  }

  ngOnInit(): void {
    this.routes = AppRoutes

    const token = this.jwt.getAccessToken()
    console.log('AccessToken:', token)

    const fName = this.upperFirstLetter(token.first_name)
    const lName = this.upperFirstLetter(token.last_name)
    const role = this.upperFirstLetter(token.role)
    this.user = {
      firstName: fName,
      lastName: lName,
      role
    }
  }
}
