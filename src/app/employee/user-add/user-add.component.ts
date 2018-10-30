import { Component, ElementRef, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { HttpClient } from '@angular/common/http'
import { AuthResponse } from '../../models/auth-response'

@Component({
  selector: 'component-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css']
})
export class UserAddComponent implements OnInit {

  // focus
  // focus1
  // focus2

  private toggleButton
  private sidebarVisible: boolean
  // private nativeElement: Node
  // public typeValidation: User

  test: Date = new Date()
  registerForm: FormGroup
  formSubmitAttempt: boolean
  error: string
  data: AuthResponse
  returnUrl: string

  selectedOption: number
  roleStatus = ['Employee', 'Manager', 'Corporate']
  model: any = {}
  message: string
  showError = false

constructor(
  private element: ElementRef,
  private formBuilder: FormBuilder,
  private route: ActivatedRoute,
  private router: Router,
  private http: HttpClient
           ) { this.http = http }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      firstname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
      lastname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
      username: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
      password: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])],
      roleSelect: ['', [Validators.required]]
    })

    this.returnUrl = this.route.snapshot.queryParams[''] || '/'
  }

  f(): any {
    return this.registerForm.controls
  }

  onSubmit(): void {
    this.formSubmitAttempt = true
    console.log('+++++++++++++++++++++++++')
    console.log(this.registerForm.controls.roleSelect.value)
    // this.registerForm.valid
    // if (this.registerForm.valid) {

    if (this.registerForm.valid) {
      console.log(this.registerForm.controls.lastname.value)
      console.log(this.registerForm.controls.roleSelect.value)

      const resource = `mutation{
          register(
            username:'${this.registerForm.controls.username.value}',
            password:'${this.registerForm.controls.password.value}',
            firstName:'${this.registerForm.controls.firstname.value}',
            lastName:'${this.registerForm.controls.lastname.value}',
            email:'${this.registerForm.controls.email.value}',
            role:'${this.registerForm.controls.roleSelect.value}'
          )
          {
            access_token,
            refresh_token
          }
        }`

      console.log(resource)
      this.http.post('http://162.212.158.16:30653/api', resource)
        .toPromise()
        .then((data: any) => {
          console.log(data)
          if (data.data.register !== null) {
            localStorage.setItem('access_token', data.data.register.access_token)
            localStorage.setItem('refresh_token', data.data.register.refresh_token)
            //   this.router.navigate([this.returnUrl])
            this.reset()
          }
          console.log(data.data)
          if (data.errors[0].message === '2: Registeration Error') {
            this.showError = true
            this.message = 'User already exists'
          } else if (data.errors[0].message === '1: Registeration Error') {
            this.message = 'Server error'
          }
        }
        )
        .catch()
    }
  }

  reset(): void {
    this.registerForm.reset()
    this.formSubmitAttempt = false
    // this.model.roleStatus = ''
  }

  // ngOnDestroy() {
  //     const body = document.getElementsByTagName('body')[0]
  //     body.classList.remove('register-page')
  // }
  sidebarToggle(): void {
    const toggleButton = this.toggleButton
    const body = document.getElementsByTagName('body')[0]
    const sidebar = document.getElementsByClassName('navbar-collapse')[0]
    if (this.sidebarVisible === false) {
      setTimeout((): void => {
        toggleButton.classList.add('toggled')
      }, 500)
      body.classList.add('nav-open')
      this.sidebarVisible = true
    } else {
      this.toggleButton.classList.remove('toggled')
      this.sidebarVisible = false
      body.classList.remove('nav-open')
    }
  }

}
