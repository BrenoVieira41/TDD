import { AppDataSource, TestDataSource } from '../../database/data-source';
import { Indications } from '../../database/entities/Indications';

class IndicationRepository {
  private repository = process.env.NODE_ENV === 'develop'
  ? AppDataSource.getRepository(Indications)
  : TestDataSource.getRepository(Indications);

  public async createIndication(indications: Indications): Promise<Indications> {
    return this.repository.save(indications);
  }

  public async updateIndication(indicationsId: string, data: any): Promise<Indications> {
    const action = await this.repository.update(indicationsId, data);
    if (action.affected <= 0) {
      throw new Error('Falha ao alterar indicação.')
    }
    return this.repository.findOne({ where: { id: indicationsId } });
  }

  public async deleteIndication(id: string) {
    const action = await this.repository.delete(id);
    if (action.affected != 1) {
      throw new Error('Falha ao apagar indicação.')
    }
  }

  public async findAllIndication(limit: number, offset: number): Promise<Indications[]> {
    return this.repository.find({
      take: limit,
      skip: offset
    });
  }

  public async findIndicationById(id: string): Promise<Indications> {
    return this.repository.findOne({ where: { id } });
  }
}

export default IndicationRepository;
