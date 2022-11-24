import IndicationRepository from './IndicationRepository';
import { Indications } from '../../database/entities/Indications';
import { InterfaceIndication, Type } from './IndicationInterface';

class IndicationService {
  private readonly indicationRepository: IndicationRepository;

  constructor() {
    this.indicationRepository = new IndicationRepository();
  }

  public async createIndication(indication: Indications): Promise<any> {
    try {
      const { title, synopsis, avaliation } = indication;

      this.validateFields(Type.CREATE, {title, synopsis, avaliation});
      this.validateTitle(title);
      this.validateSynopsis(synopsis);
      this.validateAvaliation(avaliation);

      return await this.indicationRepository.createIndication(indication);
    } catch (err) {
      throw new Error(err);
    }
  }

  public async updateIndication(indicationsId: string, indication: Indications): Promise<Indications> {
    try {
      const { title, synopsis, avaliation } = indication;

      this.validateFields(Type.UPDATE, {title, synopsis, avaliation});
      if(!!title) this.validateTitle(title);
      if(!!synopsis) this.validateSynopsis(synopsis);
      if(!!avaliation) this.validateAvaliation(avaliation);

      return await this.indicationRepository.updateIndication(indicationsId, indication);
    } catch (err) {
      throw new Error(err);
    }
  }

  public async deleteIndication(indicationsId: string): Promise<string> {
    try {
      await this.indicationRepository.deleteIndication(indicationsId);
      return 'Indicação deletada com sucesso.'
    } catch (err) {
      throw new Error(err);
    }
  }

  public async findIndication(limit?: any, offset?: any): Promise<Indications[]> {
    try {
      offset = offset ? Number(offset) : 0;
      limit = limit ? Number(limit) : 10;

      return await this.indicationRepository.findAllIndication(limit, offset);
    } catch (err) {
      throw new Error(err);
    }
  }

  public async findIndicationById(id: string): Promise<Indications> {
    try {
      return this.indicationRepository.findIndicationById(id);
    } catch (err) {
      throw new Error(err);
    }
  }

  public validateFields(type: Type, fields: InterfaceIndication) {
    const validate = currentValue => currentValue !== undefined;
    const validateCreate = Object.values(fields).every(validate);
    const validateUpdate = Object.values(fields).some(validate);

    if(type === Type.CREATE && !validateCreate) {
      throw new Error('Necessário passar todos os campos (title, synopsis, avaliation).');
    }

    if(type === Type.UPDATE && !validateUpdate ) {
      throw new Error('Necessário passar ao menos um desses campos (title, synopsis, avaliation).');
    }
  }

  public validateTitle(title: string) {
    if (!this.validateBetween(title.length, 3, 100)) {
      throw new Error('Título precisa de no mínimo 3 caracteres e no máximo 100.');
    }
  }

  public validateSynopsis(synopsis: string) {
    if (!this.validateBetween(synopsis.length, 10, 5000)) {
      throw new Error('Sinopse precisa de no mínimo 10 caracteres e no máximo 5000.');
    }
  }

  public validateAvaliation(avaliation: number) {
    if (!this.validateBetween(avaliation, 1, 10)) {
      throw new Error('Esperado uma avaliação de 1 a 10.');
    }
  }

  private validateBetween(value: number, min: number, max: number) {
    if ((value < min) || (value > max)) {
      return false;
    } else {
      return true;
    }
  }
}

export default new IndicationService();
