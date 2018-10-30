import { Component, ElementRef, OnInit, Renderer, ViewChild } from '@angular/core'
import { NavigationEnd, NavigationStart, Router } from '@angular/router'
import { Location } from '@angular/common'
import { Subscription } from 'rxjs/Subscription'

const misc: any = {
    navbar_menu_visible: 0,
    active_collapse: true,
    disabled_collapse_init: 0
}

@Component({
    selector: 'component-navbar-cmp',
    templateUrl: 'navbar.component.html'
})

export class NavbarComponent implements OnInit {
    private listTitles: any[]
    location: Location
    private nativeElement: Node
    private toggleButton
    private sidebarVisible: boolean
    private _router: Subscription

    @ViewChild('navbar-cmp') button

    constructor(location: Location, private renderer: Renderer, private element: ElementRef, private router: Router) {
        this.location = location
        this.nativeElement = element.nativeElement
        this.sidebarVisible = false
    }

    ngOnInit(): void {
        const navbar: HTMLElement = this.element.nativeElement
        const body = document.getElementsByTagName('body')[0]
        this.toggleButton = navbar.getElementsByClassName('navbar-toggler')[0]
        if (body.classList.contains('sidebar-mini')) {
            misc.sidebar_mini_active = true
        }
        this._router = this.router.events.filter(event => event instanceof NavigationEnd)
                                         .subscribe((event: NavigationEnd) => {
          const $layer = document.getElementsByClassName('close-layer')[0]
          if ($layer) {
            $layer.remove()
          }
        })
    }

    minimizeSidebar(): void {
      const body = document.getElementsByTagName('body')[0]

      if (misc.sidebar_mini_active === true) {
          body.classList.remove('sidebar-mini')
          misc.sidebar_mini_active = false

      } else {
          setTimeout(() => {
              body.classList.add('sidebar-mini')

              misc.sidebar_mini_active = true
          }, 300)
      }

      // we simulate the window Resize so the charts will get updated in realtime.
      const simulateWindowResize = setInterval(() => {
          window.dispatchEvent(new Event('resize'))
      }, 180)

      // we stop the simulation of Window Resize after the animations are completed
      setTimeout(() => {
          clearInterval(simulateWindowResize)
      }, 1000)
    }

    isMobileMenu(): boolean {
        if (window.outerWidth < 991) {

            return false
        }

        return true
    }

    sidebarOpen(): void {
        const toggleButton = this.toggleButton
        const html = document.getElementsByTagName('html')[0]
        setTimeout(() => {
            toggleButton.classList.add('toggled')
        }, 500)
        const mainPanel: HTMLElement = document.querySelector('.main-panel')[0]
        if (window.innerWidth < 991) {
          mainPanel.style.position = 'fixed'
        }
        html.classList.add('nav-open')
        this.sidebarVisible = true
    }
    sidebarClose(): void {
        const html = document.getElementsByTagName('html')[0]
        this.toggleButton.classList.remove('toggled')
        this.sidebarVisible = false
        html.classList.remove('nav-open')
        const mainPanel: HTMLElement = document.querySelector('.main-panel')[0]

        if (window.innerWidth < 991) {
          setTimeout(() => {
            mainPanel.style.position = ''
          }, 500)
        }
    }
    sidebarToggle(): void {
        if (this.sidebarVisible === false) {
            this.sidebarOpen()
        } else {
            this.sidebarClose()
        }
    }

    getTitle(): any {
      if (!this.listTitles || this.listTitles.length === 0) {

        return 'Dashboard'
      }

      let title = this.location.prepareExternalUrl(this.location.path())
      if (title.startsWith('#')) {
        title = title.slice(2)
      }

      this.listTitles.forEach(parent => {
        if (parent.path === title) {

          return parent.title
        }
        else if (parent.children) {
          const children_from_url = title.split('/')[2]
          parent.children.forEach(child => {
            if (child.path === children_from_url) {

              return child.title
            }
          })
        }
      })
    }

    getPath(): any {
      return this.location.prepareExternalUrl(this.location.path())
    }
}
