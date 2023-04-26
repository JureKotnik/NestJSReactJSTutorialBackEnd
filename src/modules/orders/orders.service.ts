import { Injectable, BadRequestException, InternalServerErrorException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Permission } from 'entities/permission.entity'
import { AbstractService } from 'modules/common/abstract.service'
import { Repository } from 'typeorm'
import Logging from 'library/Logging'
import { Order } from 'entities/order.entity'
import { Response } from 'express'
import { Parser } from 'json2csv'

@Injectable()
export class OrdersService extends AbstractService {
  constructor(@InjectRepository(Order) private readonly ordersRepository: Repository<Order>) {
    super(ordersRepository)
  }

  async export(response: Response): Promise<any> {
    const parser = new Parser({
      fields: ['ID', 'Name', 'Email', 'Product Title', 'Price', 'Quantity'],
    })

    const json = []

    const orders: Order[] = await this.findAll(['order_items'])
    orders.forEach((o) => {
      json.push({
        ID: o.id,
        Name: o.name,
        Email: o.email,
        'Product Title': '',
        Price: '',
        Quantity: '',
      })

      o.order_items.forEach((ot) => {
        json.push({
          ID: '',
          Name: '',
          Email: '',
          'Product Title': ot.product_title,
          Price: ot.price,
          Quantity: ot.quantity,
        })
      })
    })

    const csv = parser.parse(json)
    response.setHeader('Content-Type', 'text/csv')
    response.attachment('orders.csv')
    response.send(csv)
  }
}
