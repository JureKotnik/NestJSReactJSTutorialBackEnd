import { IsUUID } from 'class-validator'
import { Expose } from 'class-transformer'
import { CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

export class Base {
  @PrimaryGeneratedColumn('uuid')
  @IsUUID()
  @Expose()
  id: string

  @CreateDateColumn()
  @Expose()
  created_at: Date

  @UpdateDateColumn()
  @Expose()
  updated_at: Date
}
