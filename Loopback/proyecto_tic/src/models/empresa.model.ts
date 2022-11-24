import {Entity, model, property, hasMany} from '@loopback/repository';
import {Cliente} from './cliente.model';
import {Empleado} from './empleado.model';
import {Directivo} from './directivo.model';
import {Servicio} from './servicio.model';

@model({settings: {strict: false}})
export class Empresa extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  empresaid?: string;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @property({
    type: 'string',
    required: true,
  })
  nit: string;

  @property({
    type: 'string',
    required: true,
  })
  telefono: string;

  @property({
    type: 'string',
    required: true,
  })
  email: string;

  @property({
    type: 'string',
    required: true,
  })
  direccion: string;

  @hasMany(() => Cliente)
  clientes: Cliente[];

  @hasMany(() => Empleado)
  empleados: Empleado[];

  @hasMany(() => Directivo)
  directivos: Directivo[];

  @hasMany(() => Servicio)
  servicios: Servicio[];
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Empresa>) {
    super(data);
  }
}

export interface EmpresaRelations {
  // describe navigational properties here
}

export type EmpresaWithRelations = Empresa & EmpresaRelations;
