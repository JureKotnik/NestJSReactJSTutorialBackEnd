import { Injectable, BadRequestException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Permission } from 'entities/permission.entity'
import { AbstractService } from 'modules/common/abstract.service'
import { Repository } from 'typeorm'
import Logging from 'library/Logging'
import { Product } from 'entities/product.entity'
import { CreateUpdateProductDto } from './dto/create-update-product.dto'

@Injectable()
export class ProductsService extends AbstractService {
  constructor(@InjectRepository(Product) private readonly productsRepository: Repository<Permission>) {
    super(productsRepository)
  }

  async create(createProductDto: CreateUpdateProductDto): Promise<Product> {
    try {
      const product = this.productsRepository.create(createProductDto)
      return this.productsRepository.save(product)
    } catch (error) {
      Logging.error(error)
      throw new BadRequestException('Something went wrong while creating a new product')
    }
  }

  async update(roleId: string, updateRoleDto: CreateUpdateRoleDto, permissionsIds: { id: string }[]): Promise<Role> {
    const role = (await this.findById(roleId)) as Role
    try {
      role.name = updateRoleDto.name
      role.permissions = permissionsIds as Permission[]
      return this.productsRepository.save(role)
    } catch (error) {
      Logging.error(error)
      throw new InternalServerErrorException('Something went wrong while updating the role')
    }
  }
}
