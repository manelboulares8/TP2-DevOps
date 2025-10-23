import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Institut } from '../model/institut.model';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-update-institut',
  templateUrl: './update-institut.component.html',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  styleUrl: './update-institut.component.css'
})
export class UpdateInstitutComponent implements OnInit{
  @Input()  institut! : Institut;
 // @Input() ajout!:any;
  @Input() ajout: boolean = true;

  @Output() categorieUpdated = new EventEmitter<Institut>();
  
  ngOnInit(): void {
    console.log("ngOnInit du composant UpdateInstitut ",this.institut);

  }


saveInstitut(){
  this.categorieUpdated.emit(this.institut);
  }
}
