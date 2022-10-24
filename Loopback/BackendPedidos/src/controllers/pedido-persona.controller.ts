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
  Pedido,
  Persona,
} from '../models';
import {PedidoRepository} from '../repositories';

export class PedidoPersonaController {
  constructor(
    @repository(PedidoRepository) protected pedidoRepository: PedidoRepository,
  ) { }

  @get('/pedidos/{id}/persona', {
    responses: {
      '200': {
        description: 'Pedido has one Persona',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Persona),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Persona>,
  ): Promise<Persona> {
    return this.pedidoRepository.persona(id).get(filter);
  }

  @post('/pedidos/{id}/persona', {
    responses: {
      '200': {
        description: 'Pedido model instance',
        content: {'application/json': {schema: getModelSchemaRef(Persona)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Pedido.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Persona, {
            title: 'NewPersonaInPedido',
            exclude: ['id'],
            optional: ['pedidoId']
          }),
        },
      },
    }) persona: Omit<Persona, 'id'>,
  ): Promise<Persona> {
    return this.pedidoRepository.persona(id).create(persona);
  }

  @patch('/pedidos/{id}/persona', {
    responses: {
      '200': {
        description: 'Pedido.Persona PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Persona, {partial: true}),
        },
      },
    })
    persona: Partial<Persona>,
    @param.query.object('where', getWhereSchemaFor(Persona)) where?: Where<Persona>,
  ): Promise<Count> {
    return this.pedidoRepository.persona(id).patch(persona, where);
  }

  @del('/pedidos/{id}/persona', {
    responses: {
      '200': {
        description: 'Pedido.Persona DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Persona)) where?: Where<Persona>,
  ): Promise<Count> {
    return this.pedidoRepository.persona(id).delete(where);
  }
}
