import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UserType } from 'src/app/types/types';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {

  // data to be imported from parent component (form)
  @Input() usersToTable!: UserType[];
  // data to be exported out of this component
  @Output() userToForm: EventEmitter<UserType | number> = new EventEmitter<UserType | number>();

  constructor(){}

  ngOnInit(){
    
  }

  changeMode(data: UserType | number): void{   
    // emit user to the parent component to edit data (output)
    this.userToForm.emit(data);
  }
}
