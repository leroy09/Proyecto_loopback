import {Entity, model, property, hasMany} from '@loopback/repository';
import {Roles} from './roles.model';
import {RolUsuario} from './rol-usuario.model';

@model()
export class Usuario extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @property({
    type: 'string',
    required: true,
  })
  correo: string;

  @property({
    type: 'string',
  })
  celular?: string;

  @property({
    type: 'string',
  })
  clave?: string;

  @hasMany(() => Roles, {through: {model: () => RolUsuario}})
  roles: Roles[];

  constructor(data?: Partial<Usuario>) {
    super(data);
  }
}

export interface UsuarioRelations {
  // describe navigational properties here
}

export type UsuarioWithRelations = Usuario & UsuarioRelations;
