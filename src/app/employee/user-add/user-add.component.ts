import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { EmployeeService } from '../employee.service'

@Component({
  selector: 'component-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css']
})
export class UserAddComponent implements OnInit {

  registerForm: FormGroup
  formSubmitAttempt: boolean
  returnUrl: string

  selectedOption: number
  roleStatus = ['Employee', 'Manager', 'Corporate']
  model: any = {}
  message: string
  showError = false

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    public empServ: EmployeeService
            ) { }

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
    if (this.registerForm.valid) {
      this.empServ.registerEmployee(this.registerForm.value)
                  .toPromise()
                  .then((data: any) => {
                    console.log(data)
                    if (data.data.authRegister) {
                      localStorage.setItem('accessToken', data.data.authRegister.accessToken)
                      localStorage.setItem('refreshToken', data.data.authRegister.refreshToken)
                      this.reset()
                    }
                    else {
                      console.log('User not registered.')
                    }
                    console.log(data.data)
                  }
                  )
                  .catch(() => {
                    swal('User not registered.')
                        .catch(err => {
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
