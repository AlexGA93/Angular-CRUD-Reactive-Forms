import { Component, OnInit } from '@angular/core';
import { 
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { UsersService } from 'src/app/services/users.service';
import { UserType } from 'src/app/types/types';



@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})

export class FormComponent implements OnInit {

  users!: UserType[];

  addMode: boolean = true;

  myForm: FormGroup = this._fb.group({
    username: ['', [Validators.required]],
    name    : ['', [Validators.required]],
    email   : ['', [Validators.required, Validators.email]]
  });

  constructor(
    private _fb: FormBuilder,
    private _us: UsersService
  ){}

  ngOnInit(): void {
    // call service
    this.getUsersFromDDBB();
  }

  getUsersFromDDBB(): void{
    // call service and update component users information
    this._us.getAllUsers().subscribe((usersResponse: UserType[]) => {
      this.users = usersResponse;
    })
  }

  dealWithChildData(payload: UserType | number): void{    
    // We want to check if payload is a user (to update) or a number/id (to delete)
    if(typeof(payload) === 'object'){
      // update mode
      this.addMode = false;

      // isolate form values
      const { id, username, name, email } = payload;

      // apply data to the form template
      this.myForm = this._fb.group({
        id      : [id],
        username: [username,  [Validators.required]],
        name    : [name,      [Validators.required]],
        email   : [email,     [Validators.required, Validators.email]]
      });

    }else{
      // delete mode - calling service injection
      this._us
          .deleteUserById(payload)
          .subscribe({
            next: () => {
              this.getUsersFromDDBB();
              this.myForm.reset();
            },
            error: (err) => {
              console.error(err);
              this.myForm.reset();
            }
          });
    }
  }

  submitForm(): void{
    // check for mode
    if(this.addMode){
      // calling post new user service
      this._us
          .postNewUser(this.myForm.value)
          .subscribe({
            next: () => {
              // update local data tosend to the table
              this.getUsersFromDDBB();
              // reset form value
              this.myForm.reset();
            },
            error: (error) => {
              console.log('ERROR');
              
              console.error(error);
              // reset form
              this.myForm.reset();
              // reset form mode
              this.addMode = true;
            }
          });
    }else{
      // edit mode - calling update service method      
      this._us
          .updateUser(this.myForm.value)
          .subscribe({
            next: (response) => {
              console.log(response); // user as response
              
              // update local data tosend to the table
              this.getUsersFromDDBB();
              // reset form value
              this.myForm.reset();
            },
            error: (error) => {
              console.error(error);
              // only reset form
              this.myForm.reset();
              // reset form mode
              this.addMode = true;
            }
          });
    }
  }
}
