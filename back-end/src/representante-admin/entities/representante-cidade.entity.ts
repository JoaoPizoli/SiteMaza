import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'representante_cidade' })
@Index('IDX_REPCIDADE_UF_CIDADE', ['uf', 'cidade'])
@Index('IDX_REPCIDADE_UF_CIDADE_NOME', ['uf', 'cidade', 'nome'])
@Index('IDX_REPCIDADE_UF', ['uf'])
export class RepresentanteCidadeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'uf', type: 'char', length: 2 })
  uf: string;

  @Column({ name: 'cidade', type: 'varchar', length: 120 })
  cidade: string;

  @Column({ name: 'nome', type: 'varchar', length: 120 })
  nome: string;

  @Column({ name: 'empresa', type: 'varchar', length: 120, nullable: true })
  empresa: string | null;

  @Column({ name: 'telefone', type: 'varchar', length: 40, nullable: true })
  telefone: string | null;

  @Column({ name: 'email', type: 'varchar', length: 160, nullable: true })
  email: string | null;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;
}
