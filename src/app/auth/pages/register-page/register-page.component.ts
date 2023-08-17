import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmailValidatorService } from 'src/app/shared/service/email-validator.service';

import { ValidatorsService } from 'src/app/shared/service/validators.service';


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
        Validators.pattern(this._validatorsService.firstNameAndLastNamePattern)
      ]
    ],
    // email: ['', [ Validators.required, Validators.pattern( this.validatorsService.emailPattern )], [ new EmailValidator() ]],
    email: [
      '', 
      [ 
        Validators.required, 
        Validators.pattern(this._validatorsService.emailPattern) 
      ], 
      [ this._emailValidatorService ]
    ],
    username: ['', [ Validators.required, this._validatorsService.cantBeStrider ]],
    password: ['', [ Validators.required, Validators.minLength(6) ]],
    password2: ['', [ Validators.required ]],
  }, {
    validators: [
      this._validatorsService.isFieldOneEqualFieldTwo('password', 'password2')
    ]
  });

  constructor( 
    private _fb: FormBuilder,
    private _validatorsService: ValidatorsService,
    private _emailValidatorService: EmailValidatorService,
  ) {}

  isValidField( field: string ) {
    return this._validatorsService.isValidField( this.myForm, field );
  }

  onSubmit() {
    this.myForm.markAllAsTouched();
  }

}
