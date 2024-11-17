
import { Component } from '@angular/core';
import { NgForm, FormsModule } from '@angular/forms';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-template-driven-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './template-driven-form.component.html',
  styleUrls: ['./template-driven-form.component.css']
})
export class TemplateDrivenFormComponent {
  user = {
    name: '',
    email: '',
    password: ''
  };

  constructor(private apiService: ApiService) {}

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.apiService.sendData(form.value).subscribe(
        (response) => {
          console.log('Respuesta exitosa:', response);
        },
        (error) => {
          console.error('Error:', error);
        }
      );
    }
  }
}
