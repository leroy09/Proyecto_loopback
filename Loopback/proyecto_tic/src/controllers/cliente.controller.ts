import { service } from '@loopback/core';
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
  HttpErrors,
} from '@loopback/rest';
import { Keys } from '../config/keys';
import {Cliente, Credenciales} from '../models';
import {ClienteRepository} from '../repositories';
import { AutenticacionService } from '../services';
const fetch=require('node-fetch');
/*import { RequestInfo, RequestInit } from 'node-fetch';

const fetch = (url: RequestInfo, init?: RequestInit) =>
  import('node-fetch').then(({ default: fetch }) => fetch(url, init));*/

export class ClienteController {
  constructor(
    @repository(ClienteRepository)
    public clienteRepository : ClienteRepository,
    @service(AutenticacionService)
    public servicioAutenticacion : AutenticacionService
  ) {}

  @post('/registrocliente')
  @response(200, {
    description: 'Cliente model instance',
    content: {'application/json': {schema: getModelSchemaRef(Cliente)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cliente, {
            title: 'NewCliente',
            exclude: ['clienteid'],
          }),
        },
      },
    })
    cliente: Omit<Cliente, 'clienteid'>,
  ): Promise<Cliente> {
    
    let clave=this.servicioAutenticacion.GenerarClave();
    let claveCifrada=this.servicioAutenticacion.CifrarClave(clave);
    cliente.clave=claveCifrada;

    let client=await this.clienteRepository.create(cliente); //create
    //notificar usuario
    let destino = cliente.email;
    let asunto = 'Registro en la app';
    let contenido = `Hola, ${cliente.nombre}, su usuario es: ${cliente.correo} y su clave es ${clave}`;
    fetch(`${Keys.urlNotificaciones}/e-mail?email-destino=${destino}&asunto=${asunto}&mensaje=${contenido}`)
    .then((data:any)=>{
      console.log(data)
    })

    return client;
  }

  @get('/clientes/count')
  @response(200, {
    description: 'Cliente model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Cliente) where?: Where<Cliente>,
  ): Promise<Count> {
    return this.clienteRepository.count(where);
  }

  @get('/clientes')
  @response(200, {
    description: 'Array of Cliente model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Cliente, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Cliente) filter?: Filter<Cliente>,
  ): Promise<Cliente[]> {
    return this.clienteRepository.find(filter);
  }

  @patch('/clientes')
  @response(200, {
    description: 'Cliente PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cliente, {partial: true}),
        },
      },
    })
    cliente: Cliente,
    @param.where(Cliente) where?: Where<Cliente>,
  ): Promise<Count> {
    return this.clienteRepository.updateAll(cliente, where);
  }

  @get('/clientes/{id}')
  @response(200, {
    description: 'Cliente model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Cliente, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Cliente, {exclude: 'where'}) filter?: FilterExcludingWhere<Cliente>
  ): Promise<Cliente> {
    return this.clienteRepository.findById(id, filter);
  }

  @patch('/clientes/{id}')
  @response(204, {
    description: 'Cliente PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cliente, {partial: true}),
        },
      },
    })
    cliente: Cliente,
  ): Promise<void> {
    await this.clienteRepository.updateById(id, cliente);
  }

  @put('/clientes/{id}')
  @response(204, {
    description: 'Cliente PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() cliente: Cliente,
  ): Promise<void> {
    await this.clienteRepository.replaceById(id, cliente);
  }

  @del('/clientes/{id}')
  @response(204, {
    description: 'Cliente DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.clienteRepository.deleteById(id);
  }
      /* METODOS PROPIOS */

  @post('/Login') //para probar crear usuario con registrarcliente y luego probar login
    @response(200, {description: 'Identificacion de usuarios'})
  async identificar(
    @requestBody() credenciales:Credenciales 
  ):Promise<Cliente | null>{
    let cliente=await this.clienteRepository.findOne({ //findOne error no aparece en el repositorio
      where:{
        correo:credenciales.user,
        clave:credenciales.password
      }
  });
  return cliente;
}

  @post('/LoginToken')
  @response(200, {
    description: 'Identificacion personas con token'
  })
  async identificarConToken(
    @requestBody()credenciales:Credenciales
  ){
    credenciales.password=this.servicioAutenticacion.CifrarClave(credenciales.password)
    let p= await this.servicioAutenticacion.IdentificarPersona(credenciales)
    if (p) {
      let token=this.servicioAutenticacion.GenerarToken(p);
      return{
        datos:{
          nombre: p.nombre,
          correo: p.email,
          id: p.clienteid,
          clave: p.clave
        },
        tk:token
      }
    }else{
      throw new HttpErrors[401]("Datos invalidos");
    }
  }
}
