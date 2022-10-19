import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormArray, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
})
export class FormComponent implements OnInit {
  form: FormGroup;
  emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$';

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      newUser: this.fb.array([]),
    });
  }

  ngOnInit(): void { }

  get users() {
    return this.form.controls['newUser'] as FormArray;
  }

  addUser() {
    const userForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
    });

    this.users.push(userForm);
  }

  deleteUser(index: number) {
    this.users.removeAt(index);
  }
}
