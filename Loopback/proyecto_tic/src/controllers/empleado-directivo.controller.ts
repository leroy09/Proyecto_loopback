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
  Empleado,
  Directivo,
} from '../models';
import {EmpleadoRepository} from '../repositories';

export class EmpleadoDirectivoController {
  constructor(
    @repository(EmpleadoRepository) protected empleadoRepository: EmpleadoRepository,
  ) { }

  @get('/empleados/{id}/directivos', {
    responses: {
      '200': {
        description: 'Array of Empleado has many Directivo',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Directivo)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Directivo>,
  ): Promise<Directivo[]> {
    return this.empleadoRepository.directivos(id).find(filter);
  }

  @post('/empleados/{id}/directivos', {
    responses: {
      '200': {
        description: 'Empleado model instance',
        content: {'application/json': {schema: getModelSchemaRef(Directivo)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Empleado.prototype.empleadoid,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Directivo, {
            title: 'NewDirectivoInEmpleado',
            exclude: ['directivoid'],
            optional: ['empleadoId']
          }),
        },
      },
    }) directivo: Omit<Directivo, 'directivoid'>,
  ): Promise<Directivo> {
    return this.empleadoRepository.directivos(id).create(directivo);
  }

  @patch('/empleados/{id}/directivos', {
    responses: {
      '200': {
        description: 'Empleado.Directivo PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Directivo, {partial: true}),
        },
      },
    })
    directivo: Partial<Directivo>,
    @param.query.object('where', getWhereSchemaFor(Directivo)) where?: Where<Directivo>,
  ): Promise<Count> {
    return this.empleadoRepository.directivos(id).patch(directivo, where);
  }

  @del('/empleados/{id}/directivos', {
    responses: {
      '200': {
        description: 'Empleado.Directivo DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Directivo)) where?: Where<Directivo>,
  ): Promise<Count> {
    return this.empleadoRepository.directivos(id).delete(where);
  }
}
