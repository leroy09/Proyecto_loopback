import {Entity, model, property, hasMany, belongsTo} from '@loopback/repository';
import {Cliente} from './cliente.model';
import {Empresa} from './empresa.model';

@model({settings: {strict: false}})
export class Servicio extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  servicioid?: string;

  @property({
    type: 'string',
    required: true,
  })
  tipo_servicio: string;

  @property({
    type: 'number',
    required: true,
  })
  valor: number;

  @property({
    type: 'string',
    required: true,
  })
  fecha: string;

  @property({
    type: 'string',
    required: true,
  })
  clienteId: string;
  @hasMany(() => Cliente)
  clientes: Cliente[];

  @belongsTo(() => Empresa)
  empresaId: string;
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Servicio>) {
    super(data);
  }
}

export interface ServicioRelations {
  // describe navigational properties here
}

export type ServicioWithRelations = Servicio & ServicioRelations;
