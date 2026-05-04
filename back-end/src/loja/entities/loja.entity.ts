import {
  Column,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export type Coordinates = {
  lat: number;
  lng: number;
};

@Entity({ name: 'loja' })
@Index('IDX_LOJA_CODCLI', ['codcli'], { unique: true })
@Index('IDX_LOJA_COORDS', ['latitude', 'longitude'])
export class LojaEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'codcli', type: 'varchar', length: 8 })
  codcli: string;

  @Column({ name: 'nomcli', type: 'varchar', length: 60 })
  name: string;

  @Column({ name: 'status', type: 'varchar', length: 7, nullable: true })
  status: string | null;

  @Column({ name: 'endere', type: 'varchar', length: 60, nullable: true })
  address: string | null;

  @Column({ name: 'bairro', type: 'varchar', length: 60, nullable: true })
  neighborhood: string | null;

  @Column({ name: 'cidade', type: 'varchar', length: 40, nullable: true })
  city: string | null;

  @Column({ name: 'uf', type: 'char', length: 2, nullable: true })
  state: string | null;

  @Column({ name: 'c_e_p_', type: 'varchar', length: 9, nullable: true })
  zipCode: string | null;

  @Column({ name: 'email_', type: 'varchar', length: 255, nullable: true })
  email: string | null;

  @Column({ name: 'codrep', type: 'char', length: 3, nullable: true })
  representativeCode: string | null;

  @Column({ name: 'nomrep', type: 'varchar', length: 30, nullable: true })
  representativeName: string | null;

  @Column({ name: 'latitude', type: 'double precision', nullable: true })
  latitude: number | null;

  @Column({ name: 'longitude', type: 'double precision', nullable: true })
  longitude: number | null;

  @Column({ name: 'geocoded_at', type: 'timestamptz', nullable: true })
  geocodedAt: Date | null;

  @Column({
    name: 'geocode_error',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  geocodeError: string | null;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;
}
