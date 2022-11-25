import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ParametrosRoutingModule } from './parametros-routing.module';
import { CrearClienteComponent } from './clientes/crear-cliente/crear-cliente.component';
import { BuscarClienteComponent } from './clientes/buscar-cliente/buscar-cliente.component';
import { ModificarClienteComponent } from './clientes/modificar-cliente/modificar-cliente.component';
import { EliminarClienteComponent } from './clientes/eliminar-cliente/eliminar-cliente.component';
import { CrearInmuebleComponent } from './inmueble/crear-inmueble/crear-inmueble.component';
import { BuscarInmuebleComponent } from './inmueble/buscar-inmueble/buscar-inmueble.component';
import { EditarInmuebleComponent } from './inmueble/editar-inmueble/editar-inmueble.component';
import { EliminarInmuebleComponent } from './inmueble/eliminar-inmueble/eliminar-inmueble.component';
import { CrearPedidoComponent } from './pedidos/crear-pedido/crear-pedido.component';
import { BuscarPedidoComponent } from './pedidos/buscar-pedido/buscar-pedido.component';
import { EditarPedidoComponent } from './pedidos/editar-pedido/editar-pedido.component';
import { EliminarPedidoComponent } from './pedidos/eliminar-pedido/eliminar-pedido.component';


@NgModule({
  declarations: [
    CrearClienteComponent,
    BuscarClienteComponent,
    ModificarClienteComponent,
    EliminarClienteComponent,
    CrearInmuebleComponent,
    BuscarInmuebleComponent,
    EditarInmuebleComponent,
    EliminarInmuebleComponent,
    CrearPedidoComponent,
    BuscarPedidoComponent,
    EditarPedidoComponent,
    EliminarPedidoComponent
  ],
  imports: [
    CommonModule,
    ParametrosRoutingModule
  ]
})
export class ParametrosModule { }
