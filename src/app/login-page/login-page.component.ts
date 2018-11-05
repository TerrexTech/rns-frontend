import { Component, ElementRef, OnInit, ViewChild } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { AuthenticationService } from '../_Auth/auth.service'

@Component({
  selector: 'component-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})

export class LoginPageComponent implements OnInit {
  loginForm: FormGroup
  loading = false
  returnUrl: string
  // error = ''
  formSubmitAttempt: boolean
  @ViewChild('response') response: Element
  showError = false

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private authenticationService: AuthenticationService
  ) {
    this.http = http
    this.authenticationService = authenticationService
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      rememberCheck: ['']
    })

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams[''] || '/'
  }

  f(): any {
    return this.loginForm.controls
  }

  onSubmit(): void {
    let lStorage: boolean
    this.formSubmitAttempt = true
    // this.submitted = true
    if (this.loginForm.valid) {
      let resource = JSON.stringify(this.loginForm.value)
      console.log(resource)
      resource = `{
        login(username:"${this.loginForm.controls.username.value}",password:"${this.loginForm.controls.password.value}")
        {
          access_token,
          refresh_token
        }
      }`

      if (this.loginForm.controls.rememberCheck.value === true) {
        lStorage = true
      }

      this.showError = this.authenticationService.login(resource, lStorage)

      console.log(`${this.showError} %%%%%%%%%%%%%`)
      this.reset()
    }
  }

  reset(): void {
    this.loginForm.reset()
    this.formSubmitAttempt = false
  }
}
