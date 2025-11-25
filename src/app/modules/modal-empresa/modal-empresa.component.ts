import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-modal-empresa',
  imports: [ReactiveFormsModule],
  templateUrl: './modal-empresa.component.html',
  styleUrl: './modal-empresa.component.scss'
})
export class ModalEmpresaComponent implements OnChanges {
  @Input() visible = false;
  @Input() title = 'Modal';
  @Input() data!: any;

  @Output() closed = new EventEmitter<void>();

  form!: FormGroup;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['data']) {
      this.crearFormulario();
    }
  }
  
  crearFormulario() {
    this.form = new FormGroup({
      id: new FormControl(this.data ? this.data.id : '', [Validators.required]),
      nombre: new FormControl(this.data ? this.data.nombre : '', [Validators.required]),
      nit: new FormControl(this.data ? this.data.nit : '', [Validators.required]),
      fecha: new FormControl(this.data ? this.convertirTimestampAFecha(this.data.fechaFundacion) : '', [Validators.required]),
      direccion: new FormControl(this.data ? this.data.direccion : '', [Validators.required])
    })

    if (this.data) {
      this.form.controls['id'].disable();
    }
  }

  update() {
  const dataSession = sessionStorage.getItem('empresasList');
  if (!dataSession) return;

  let lista = JSON.parse(dataSession);
  const index = lista.findIndex((i: any) => i.id === this.data.id);

  const fechaTimestamp = new Date(this.form.get('fecha')?.value).getTime();

  const item =   {
    "id": this.data.id,
    "nombre": this.form.get('nombre')?.value,
    "nit": this.form.get('nit')?.value,
    "fechaFundacion": fechaTimestamp,
    "direccion": this.form.get('direccion')?.value
  }

  if (index !== -1) {
    lista[index] = item;
    sessionStorage.setItem('empresasList', JSON.stringify(lista));
  }
  this.close();
}

create() {
  const dataSession = sessionStorage.getItem('empresasList');

  let lista = dataSession ? JSON.parse(dataSession) : [];

  const empresa = {
    id: this.form.get('id')?.value,
    nombre: this.form.get('nombre')?.value,
    nit: this.form.get('nit')?.value,
    fechaFundacion: new Date(this.form.get('fecha')?.value).getTime(),
    direccion: this.form.get('direccion')?.value
  };

  lista.push(empresa);

  sessionStorage.setItem('empresasList', JSON.stringify(lista));

  this.close();
}




  close() {
    this.closed.emit();
  }

  convertirTimestampAFecha(timestamp: number): string {
  if (!timestamp) return '';
  const fecha = new Date(timestamp);
  return fecha.toISOString().substring(0, 10);
}


}
