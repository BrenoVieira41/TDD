import { Type } from './IndicationInterface';
import IndicationService from './IndicationService';

const indication = {
  title: 'test',
  synopsis: 'e apenas um test',
  avaliation: 3
};

describe('Indication', () => {

  it('Should validate if the indication has a valid title', () => {
    const validateTitle = IndicationService.validateTitle('testing');
    expect(validateTitle).toBeUndefined();
  });

  it('Should validate if the indication has a valid synopsis', () => {
    const validateSynopsis = IndicationService.validateSynopsis('testing synopsis');
    expect(validateSynopsis).toBeUndefined();
  });

  it('Should validate if the indication has a valid avaliation', () => {
    const validateAvaliation = IndicationService.validateAvaliation(8);
    expect(validateAvaliation).toBeUndefined();
  });

  it('Should validate if all data was received when creating', () => {
    const validateFields = IndicationService.validateFields(Type.CREATE, indication);
    expect(validateFields).toBeUndefined();
  });

  it('Should validate if any data has changed when updating', () => {
    const validateFields = IndicationService.validateFields(Type.UPDATE, { title: indication.title })
    expect(validateFields).toBeUndefined();
  });
});
