import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { timeout } from 'rxjs';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public user!: User;
  public showError400: boolean = false;
  public showSuccess: boolean = false;
  constructor(public usersService: UserService, public router: Router) { }

  registerform = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(3)

    ]),
    mail: new FormControl('', [
      Validators.required,
      Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")

    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8)

    ]),
    rpassword: new FormControl('', [
      Validators.required,
      Validators.minLength(8)

    ])

  })
  ngOnInit(): void { //CAMBIA LAS VARIABLES PARA CUANDO INICIA LA APP.

  }

  sendRegisterForm() {
    let name = this.registerform.value.name!;
    let pass = this.registerform.value.password!;
    let mail = this.registerform.value.mail!;

    this.user = new User(name, pass, mail);

    console.log(this.user);

    this.usersService
      .sendRegister(this.user)
      .subscribe(
        (res: any) => {
          this.showError400 = false;
          this.showSuccess = true;
          setTimeout(() => {
            this.router.navigate(['/Login']);
          }, 3000);
        }, (error) => {
          if (error.status === 400) {
            this.showError400 = true;
            this.showSuccess = false;
          } else {

          }
        });
  }
}
