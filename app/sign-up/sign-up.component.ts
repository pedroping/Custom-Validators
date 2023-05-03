import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { fadeInItems } from '@angular/material/menu/typings';
import { CustomValidators } from '../custom-validator';
import { FormErrorService } from '../form-error.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  public signUpForm: FormGroup;

  public formErrors = {
    name: '',
    email: '',
    password: '',
  };

  constructor(
    public form: FormBuilder,
    public formErrorService: FormErrorService
  ) {}

  public signUp() {
    // right before we submit our form to the server we check if the form is valid
    // if not, we pass the form to the validateform function again. Now with check dirty false
    // this means we check every form field independent of wether it's touched
    if (this.signUpForm.valid) {
      // do your singup logic here
    } else {
      this.formErrors = this.formErrorService.validateForm(
        this.signUpForm,
        this.formErrors,
        false
      );
    }
  }

  // build the user edit form
  public buildForm() {
    this.signUpForm = this.form.group({
      name: ['', [Validators.required, CustomValidators.validateCharacters]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });

    // on each value change we call the validateForm function
    // We only validate form controls that are dirty, meaning they are touched
    // the result is passed to the formErrors object
    this.signUpForm.valueChanges.subscribe((data) => {
      this.formErrors = this.formErrorService.validateForm(
        this.signUpForm,
        this.formErrors,
        true
      );
    });
  }

  // initiate component
  public ngOnInit() {
    this.buildForm();
  }

  getErros(a: any) {
    console.log(this.signUpForm.get('name').errors['not_allowed_characters']);

    const Erros = this.signUpForm.get('name').errors['not_allowed_characters'];

    let caracteres = '';
    if (Erros) {
      Erros.map((item) => {
        console.log(item);
        caracteres += ` ${item}`;
      });
    }

    return `Remove Isso: ${caracteres} !!!!`;
  }
}
