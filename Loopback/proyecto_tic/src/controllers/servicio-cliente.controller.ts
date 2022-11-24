import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Servicio,
  Cliente,
} from '../models';
import {ServicioRepository} from '../repositories';

export class ServicioClienteController {
  constructor(
    @repository(ServicioRepository) protected servicioRepository: ServicioRepository,
  ) { }

  @get('/servicios/{id}/clientes', {
    responses: {
      '200': {
        description: 'Array of Servicio has many Cliente',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Cliente)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Cliente>,
  ): Promise<Cliente[]> {
    return this.servicioRepository.clientes(id).find(filter);
  }

  @post('/servicios/{id}/clientes', {
    responses: {
      '200': {
        description: 'Servicio model instance',
        content: {'application/json': {schema: getModelSchemaRef(Cliente)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Servicio.prototype.servicioid,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cliente, {
            title: 'NewClienteInServicio',
            exclude: ['clienteid'],
            optional: ['servicioId']
          }),
        },
      },
    }) cliente: Omit<Cliente, 'clienteid'>,
  ): Promise<Cliente> {
    return this.servicioRepository.clientes(id).create(cliente);
  }

  @patch('/servicios/{id}/clientes', {
    responses: {
      '200': {
        description: 'Servicio.Cliente PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cliente, {partial: true}),
        },
      },
    })
    cliente: Partial<Cliente>,
    @param.query.object('where', getWhereSchemaFor(Cliente)) where?: Where<Cliente>,
  ): Promise<Count> {
    return this.servicioRepository.clientes(id).patch(cliente, where);
  }

  @del('/servicios/{id}/clientes', {
    responses: {
      '200': {
        description: 'Servicio.Cliente DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Cliente)) where?: Where<Cliente>,
  ): Promise<Count> {
    return this.servicioRepository.clientes(id).delete(where);
  }
}
