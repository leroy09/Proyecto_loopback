import {Entity, model, property, hasMany, belongsTo} from '@loopback/repository';
import {Directivo} from './directivo.model';
import {Empresa} from './empresa.model';

@model({settings: {strict: false}})
export class Empleado extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  empleadoid?: string;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @property({
    type: 'string',
    required: true,
  })
  apellidos: string;

  @property({
    type: 'string',
    required: true,
  })
  documento: string;

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

  @property({
    type: 'string',
    required: true,
  })
  directivoId: string;
  @hasMany(() => Directivo)
  directivos: Directivo[];

  @belongsTo(() => Empresa)
  empresaId: string;
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Empleado>) {
    super(data);
  }
}

export interface EmpleadoRelations {
  // describe navigational properties here
}

export type EmpleadoWithRelations = Empleado & EmpleadoRelations;
