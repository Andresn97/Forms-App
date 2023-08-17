import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import * as customValidators from 'src/app/shared/validators/validators';


@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styles: [
  ]
})
export class RegisterPageComponent {

  public myForm: FormGroup = this._fb.group({
    name: [
      '', 
      [ 
        Validators.required, 
        Validators.pattern(customValidators.firstNameAndLastNamePattern)
      ]
    ],
    // email: ['', [ Validators.required, Validators.pattern( this.validatorsService.emailPattern )], [ new EmailValidator() ]],
    email: [
      '', 
      [ 
        Validators.required, 
        Validators.pattern(customValidators.emailPattern) 
      ], 
      [  ]
    ],
    username: ['', [ Validators.required, customValidators.cantBeStrider ]],
    password: ['', [ Validators.required, Validators.minLength(6) ]],
    password2: ['', [ Validators.required ]],
  }, {
    // validators: [
    //   this.validatorsService.isFieldOneEqualFieldTwo('password','password2')
    // ]
  });

  constructor( private _fb: FormBuilder ) {}

  isValidField( field: string ) {
    // return this.validatorsService.isValidField( this.myForm, field );
  }

  onSubmit() {
    this.myForm.markAllAsTouched();
  }

}
