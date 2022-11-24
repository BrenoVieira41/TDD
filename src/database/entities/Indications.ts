import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'indications' })
export class Indications {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', nullable: false, unique: true })
  title: string;

  @Column({ type: 'varchar', nullable: false })
  synopsis: string;

  @Column({ type: 'numeric', nullable: false })
  avaliation: number;
}
