import { injectable, /* inject, */ BindingScope } from '@loopback/core';
import { repository } from '@loopback/repository';
import { Cliente, Credenciales } from '../models';
import { ClienteRepository } from '../repositories';
import { Keys } from '../config/keys';

const generator = require('generate-password');
const cryptoJs = require('crypto-js');
const JWT = require('jsonwebtoken')

@injectable({ scope: BindingScope.TRANSIENT })
export class AutenticacionService {
  constructor(@repository(ClienteRepository)
  public clienteRepositorio: ClienteRepository,
  ) {

  }

  /*
   * Add service methods here
   */

  GenerarClave() {
    let pass = generator.generate({
      length: 8,
      Number: true
    });
    return pass;
  }

  CifrarClave(pass: string) {
    let passCifrada = cryptoJs.MD5(pass).toString();
    return passCifrada;
  }

  IdentificarPersona(credenciales: Credenciales) {
    try {
      let p = this.clienteRepositorio.findOne({ //findOne arreglar
        where: {
          email: credenciales.user,
          clave: credenciales.password
        }
      })
      return p;
    } catch {
      return false;

    }
  }

  GenerarToken(cliente: Cliente) {
    let token = JWT.sign({
      data: {
        id: cliente.clienteid,
        correo: cliente.email,
        nombre: cliente.nombre + " " + cliente.apellidos
      }

    },
      Keys.firmaJWT);
    return token;
  }

  ValidacionToken(token: string) {
    try {
      let datos = JWT.verify(token, Keys.firmaJWT)
      return datos;
    } catch {
      return false;
    }
  }
}

