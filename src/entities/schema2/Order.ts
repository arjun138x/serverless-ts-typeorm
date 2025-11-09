import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: "orders" })
export class Order {
  @PrimaryGeneratedColumn()
  id!: number;

  // explicit column type to avoid relying on emitDecoratorMetadata at runtime
  @Column("int")
  userId!: number;

  @Column("decimal")
  amount!: number;
}
