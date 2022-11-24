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
  Cliente,
  Servicio,
} from '../models';
import {ClienteRepository} from '../repositories';

export class ClienteServicioController {
  constructor(
    @repository(ClienteRepository) protected clienteRepository: ClienteRepository,
  ) { }

  @get('/clientes/{id}/servicios', {
    responses: {
      '200': {
        description: 'Array of Cliente has many Servicio',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Servicio)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Servicio>,
  ): Promise<Servicio[]> {
    return this.clienteRepository.servicios(id).find(filter);
  }

  @post('/clientes/{id}/servicios', {
    responses: {
      '200': {
        description: 'Cliente model instance',
        content: {'application/json': {schema: getModelSchemaRef(Servicio)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Cliente.prototype.clienteid,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Servicio, {
            title: 'NewServicioInCliente',
            exclude: ['servicioid'],
            optional: ['clienteId']
          }),
        },
      },
    }) servicio: Omit<Servicio, 'servicioid'>,
  ): Promise<Servicio> {
    return this.clienteRepository.servicios(id).create(servicio);
  }

  @patch('/clientes/{id}/servicios', {
    responses: {
      '200': {
        description: 'Cliente.Servicio PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Servicio, {partial: true}),
        },
      },
    })
    servicio: Partial<Servicio>,
    @param.query.object('where', getWhereSchemaFor(Servicio)) where?: Where<Servicio>,
  ): Promise<Count> {
    return this.clienteRepository.servicios(id).patch(servicio, where);
  }

  @del('/clientes/{id}/servicios', {
    responses: {
      '200': {
        description: 'Cliente.Servicio DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Servicio)) where?: Where<Servicio>,
  ): Promise<Count> {
    return this.clienteRepository.servicios(id).delete(where);
  }
}
