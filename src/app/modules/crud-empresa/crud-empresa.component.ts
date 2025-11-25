import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ModalEmpresaComponent } from "@components/modal-empresa/modal-empresa.component";

@Component({
  selector: 'app-crud-empresa',
  imports: [CommonModule, ModalEmpresaComponent],
  templateUrl: './crud-empresa.component.html',
  styleUrl: './crud-empresa.component.scss'
})
export class CrudEmpresaComponent implements OnInit {

  empresasArray: any[] = [];
  dataEditar: any;
  mostrarModal: boolean = false;
  tituloModal: string = '';

  ngOnInit(): void {
    this.listEmpresas()
  }

  listEmpresas(){
    const sessionData = sessionStorage.getItem('empresasList');
    if(sessionData){
      this.empresasArray = JSON.parse(sessionData);
    }else{
    sessionStorage.setItem('empresasList', JSON.stringify(EMPRESAS));
    this.empresasArray = EMPRESAS;
    }
  }

  crear() {
    this.dataEditar = null;
    this.tituloModal = 'Crear Empresa';
    this.mostrarModal = true;
  }

  modificar(data: any) {
    this.dataEditar = data;
    this.tituloModal = 'Modificar Empresa';
    this.mostrarModal = true;
  }

  delete(id: number) {
  const dataSession = sessionStorage.getItem('empresasList');
  if (!dataSession) return;

  const lista = JSON.parse(dataSession);

  const nuevaLista = lista.filter((empresa: any) => empresa.id !== id);
  sessionStorage.setItem('empresasList', JSON.stringify(nuevaLista));
  window.location.reload()
}


  closeModal(){
    this.mostrarModal=false;
    this.empresasArray=[];
    this.listEmpresas();
    window.location.reload();
  }

}

export const EMPRESAS = [
  {
    "id": 1,
    "nombre": "TecnoVision",
    "nit": "A123_X",
    "fechaFundacion": 915148800000,
    "direccion": "Av. Central 123, Ciudad"
  },
  {
    "id": 2,
    "nombre": "Soluciones Digitales",
    "nit": "B9Tech",
    "fechaFundacion": 1020124800000,
    "direccion": "Calle Real 45, Zona Norte"
  },
  {
    "id": 3,
    "nombre": "Industrias Nova",
    "nit": "C_Nova88",
    "fechaFundacion": 1104537600000,
    "direccion": "Boulevard Industrial 890"
  },
  {
    "id": 4,
    "nombre": "AgroCampo",
    "nit": "DAgro_2024",
    "fechaFundacion": 978307200000,
    "direccion": "Ruta 7, Km 25"
  },
  {
    "id": 5,
    "nombre": "Energia Plus",
    "nit": "EPlus_01",
    "fechaFundacion": 946684800000,
    "direccion": "Calle El Sol 22"
  },
  {
    "id": 6,
    "nombre": "Mundo Hogar",
    "nit": "FHogar77",
    "fechaFundacion": 1009843200000,
    "direccion": "Colonia Miraflores, Casa 14"
  },
  {
    "id": 7,
    "nombre": "TransLogix",
    "nit": "GTrans_55",
    "fechaFundacion": 1136073600000,
    "direccion": "Carretera Panamericana 12"
  },
  {
    "id": 8,
    "nombre": "Comercial Rivera",
    "nit": "HRivera12",
    "fechaFundacion": 1041379200000,
    "direccion": "Mercado Central Local 18"
  },
  {
    "id": 9,
    "nombre": "InnovaSoft",
    "nit": "Isoft_999",
    "fechaFundacion": 1230768000000,
    "direccion": "Torre Empresarial Piso 5"
  },
  {
    "id": 10,
    "nombre": "MegaConstrucciones",
    "nit": "JMC_2020",
    "fechaFundacion": 1109894400000,
    "direccion": "Residencial Los Robles Block C"
  }
]

