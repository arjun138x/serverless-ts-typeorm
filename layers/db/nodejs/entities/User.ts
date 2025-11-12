import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: "users" })
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column("varchar") // 👈 Explicit type
  name!: string;

  @Column("varchar") // 👈 Explicit type
  email!: string;
}
