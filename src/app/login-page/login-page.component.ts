import { Component, ElementRef, OnInit, ViewChild } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { HttpClient, HttpHeaders } from '@angular/common/http'

@Component({
  selector: 'component-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})

export class LoginPageComponent implements OnInit {
  loginForm: FormGroup
  loading = false
  returnUrl: string
  error = ''
  formSubmitAttempt: boolean
  @ViewChild('response') response: Element
  showError = false

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) {
    this.http = http
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', [Validators.required, Validators.minLength(5)]]
    })

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams[''] || '/'
  }

  f(): any {
    return this.loginForm.controls
  }

  onSubmit(): void {
    this.formSubmitAttempt = true
    // this.submitted = true
    if (this.loginForm.valid) {
      console.log('form submitted')
      let resource = JSON.stringify(this.loginForm.value)
      console.log(resource)
      resource = `{
        login(username:"${this.loginForm.controls.username.value}",password:"${this.loginForm.controls.password.value}")
        {
          access_token,
          refresh_token
        }
      }`

      this.loading = true
      console.log(this.http)
      this.http.post('http://162.212.158.16:30653/api', resource)
        .toPromise()
        // .then(d => this.data)
        .then((data: any) => {
          console.log(data.data.login)
          if (data.data.login !== null) {
            localStorage.setItem('access_token', data.data.login.access_token)
            localStorage.setItem('refresh_token', data.data.login.refresh_token)
            this.router.navigate([this.returnUrl])
              .then(log => {
                console.log(log)

                return true
              })
              .catch(err => {
                console.log(err)

                return false
              })
            this.showError = false
            this.reset()

            return this.showError
          }
          else {
            this.showError = true

            return this.showError
          }
        })
        .catch(err => {
          console.log(err)

          return this.showError
        })
    }
  }

  reset(): void {
    this.loginForm.reset()
    this.formSubmitAttempt = false
  }
}
