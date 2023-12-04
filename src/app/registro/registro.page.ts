import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { UserService } from '../services/user.services';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  formReg: FormGroup;

  constructor(
    private userService: UserService,
    private router: Router
  ) {
    this.formReg = new FormGroup({
      email: new FormControl(),
      password: new FormControl()
    })


   }

  ngOnInit():void {

  }

onSubmit(){
  this.userService.register(this.formReg.value)
    .then(response =>
      {console.log(response);
        this.router.navigate(['/home']) })
    .catch(error => console.log(error))
    ;
}

onClick(){
  this.userService.loginWithGoogle()
  .then(response =>
    {console.log(response);
    this.router.navigate(['/home'])})
  .catch(error => console.log(error))
  ;
}
}
