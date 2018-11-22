import { Component, OnInit } from '@angular/core'

import { AppRoutes } from '../../app/app.routes'
import { TokenService } from '../../app/_Auth/token.service'
import { User } from '../../app/_Auth/user-model'
import { AuthenticationService } from '../_Auth/auth.service'

@Component({
  selector: 'component-sidebar-cmp',
  templateUrl: 'sidebar.component.html',
  styleUrls: ['sidebar.component.css'],
  providers: [AuthenticationService]
})
export class SidebarComponent implements OnInit {
  private jwt: TokenService
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
        },
        {
          route: AppRoutes.inventory.children.sale,
          ab: 'SA'
        },
        {
          route: AppRoutes.inventory.children.history,
          ab: 'HI'
        }
      ]
    },
    {
      route: AppRoutes.flashsale,
      icon: 'nc-icon nc-box-2'
    },
    {
      route: AppRoutes.donatedispose,
      icon: 'nc-icon nc-box-2',
      children: [
        {
          route: AppRoutes.donatedispose.children.donatefood,
          ab: 'DF'
        },
        {
          route: AppRoutes.donatedispose.children.disposefood,
          ab: 'DF'
        }
      ]
    },
    {
      route: AppRoutes.monitoring,
      icon: 'nc-icon nc-box-2'
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
    },
    {
      route: AppRoutes.reports,
      icon: 'nc-icon nc-box-2',
      children: [
        {
          route: AppRoutes.reports.children.donate,
          ab: 'DO'
        },
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
          route: AppRoutes.reports.children.revenue,
          ab: 'RE'
        },
        {
          route: AppRoutes.reports.children.savings,
          ab: 'SA'
        },
        {
          route: AppRoutes.reports.children.waste,
          ab: 'WA'
        }
      ]
    }
  ]
  public routerIconDef2 = this.routeIconDef

  constructor(jwt: TokenService, public auth: AuthenticationService) {
    this.jwt = jwt
  }

  upperFirstLetter = (word: string): string => {
    return word.charAt(0)
               .toUpperCase() + word.slice(1)
  }

  logout(): void {
    this.jwt.decodedAccessToken = undefined
    this.auth.logout()
  }

  ngOnInit(): void {
    console.log()
    this.routes = AppRoutes

    const token = this.jwt.getAccessToken()

    if (token !== undefined) {
      const fName = this.upperFirstLetter(token.first_name)
      const lName = this.upperFirstLetter(token.last_name)
      const role = this.upperFirstLetter(token.role)
      this.user = {
        firstName: fName,
        lastName: lName,
        role
      }
      console.log(token.role)
    }

    if (token.role === 'Employee' || token.role === 'employee') {
      this.routeIconDef.pop()
      console.log(this.routeIconDef)
    }
  }
}
