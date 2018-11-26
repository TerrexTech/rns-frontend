import { Component, ElementRef, Inject, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { MAT_DIALOG_DATA } from '@angular/material'

@Component({
  selector: 'component-dialog-data-dialog',
  templateUrl: 'dialog-data-dialog.html'
})
export class DialogDataDialogComponent implements OnInit {

  private toggleButton
  private sidebarVisible: boolean

  test: Date = new Date()
  registerForm: FormGroup
  curField: any
  formSubmitAttempt: boolean
  error: string
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
    @Inject(MAT_DIALOG_DATA) public data: any,
    private http: HttpClient) {
    this.http = http
  }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      firstname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
      lastname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
      username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      password: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])],
      role: ['', [Validators.required]]
    })
    this.curField = this.data
    console.log(this.curField)
    this.registerForm.get('firstname')
                     .setValue(this.curField.data.first_name)
    this.registerForm.get('lastname')
                     .setValue(this.curField.data.last_name)
    this.registerForm.get('username')
                     .setValue(this.curField.data.username)
    this.registerForm.get('email')
                     .setValue(this.curField.data.email)
    this.registerForm.get('role')
                     .setValue(this.curField.data.role)

    this.returnUrl = this.route.snapshot.queryParams[''] || '/'
  }

  f(): any {
    console.log(this.registerForm.controls.email.errors)

    return this.registerForm.controls
  }

  onSubmit(): void {
    this.formSubmitAttempt = true
    console.log(this.registerForm.controls.roleSelect.value)

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
            accessToken,
            refreshToken
          }
        }`

      console.log(resource)
      this.http.post('http://142.55.32.86:50281/api1', resource)
        .toPromise()
        .then((updateConfirmationData: any) => {
          console.log(updateConfirmationData)
          if (updateConfirmationData.data.register !== null) {
            localStorage.setItem('accessToken', updateConfirmationData.data.register.accessToken)
            localStorage.setItem('refreshToken', updateConfirmationData.data.register.refreshToken)
            this.reset()
          }
          console.log(updateConfirmationData.data)
          if (updateConfirmationData.errors[0].message === '2: Registeration Error') {
            this.showError = true
            this.message = 'User already exists'
          } else if (updateConfirmationData.errors[0].message === '1: Registeration Error') {
            this.message = 'Server error'
          }
        }
        )
        .catch(updateErr => {
          swal(updateErr)
              .catch((err: any) => {
                console.log(err)
              })
        })
    }
  }

  reset(): void {
    this.registerForm.reset()
    this.formSubmitAttempt = false
  }
}
