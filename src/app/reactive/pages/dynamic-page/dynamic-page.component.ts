import { Component } from '@angular/core';
import { 
  FormArray, 
  FormBuilder, 
  FormControl, 
  FormGroup, 
  Validators 
} from '@angular/forms';


@Component({
  templateUrl: './dynamic-page.component.html',
  styles: [
  ]
})
export class DynamicPageComponent {
  
  public myForm: FormGroup = this._fb.group({
    name: ['', [
      Validators.required,
      Validators.minLength(3),
    ]],
    favoriteGames: this._fb.array([
      ['Metal Gear', Validators.required],
      ['Goku', Validators.required],
    ]),
  });

  public newFavorite: FormControl = new FormControl('', Validators.required );
  
  constructor( private _fb: FormBuilder ) {}
  
  get favoriteGamesControls(): FormArray {
    return this.myForm.controls['favoriteGames'] as FormArray;
  }
  
  isValidField( field: string ): boolean | null {
    return this.myForm.controls[field].errors 
    && this.myForm.controls[field].touched
  }
  
  isValidFieldInArray( formArray: FormArray, index: number ) {
    return formArray.controls[index].errors
      && formArray.controls[index].touched;
  }

  getFieldError( field: string ): string | null {
    if ( !this.myForm.controls[field] ) return null;

    const errors = this.myForm.controls[field].errors || {};

    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'Este campo es requerido';

        case 'minlength':
          return `Mínimo ${errors['minlength'].requiredLength} caracteres`;
      
        default:
          return '';
      }
    }

    return null;
  }

  onDeleteFavorite( index: number ): void {
    this.favoriteGamesControls.removeAt(index);
  }

  onAddFavorites(): void {
    if ( this.newFavorite.invalid ) return;

    const newGame = this.newFavorite.value;

    this.favoriteGamesControls.push(
      this._fb.control( newGame, Validators.required )
    );

    this.newFavorite.reset();
  }

  onSubmit(): void {

    if ( this.myForm.invalid ) {
      this.myForm.markAllAsTouched();
      return;
    }

    (this.myForm.controls['favoriteGames'] as FormArray ) = this._fb.array([]);
    this.myForm.reset();

  }

}
