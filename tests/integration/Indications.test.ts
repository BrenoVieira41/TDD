import { TestDataSource } from '../../src/database/data-source';
import { testServer } from '../jest.setup';

const indications = {
  id: '2ddc55c8-5569-49f3-867f-2a4c791b3a23',
  title: 'testing',
  synopsis: 'somente um test',
  avaliation: 7
};

beforeAll(async () => {
  await TestDataSource.initialize();
});

describe('Create - Indication', () => {
  it('Create sucesso', async () => {
    const res = await testServer.post('/indications/create').send(indications);
    expect(res.statusCode).toBe(200);
  });

  it('When an invalid title is submitted', async () => {
    const newIndication = { ...indications };

    newIndication.title = 't';

    const res = await testServer.post('/indications/create').send(newIndication);
    expect(res.text).toEqual('Error: Título precisa de no mínimo 3 caracteres e no máximo 100.');
  });

  it('When a wrong synopsis is sent', async () => {
    const newIndication = { ...indications };
    newIndication.synopsis = 't';

    const res = await testServer.post('/indications/create').send(newIndication);
    expect(res.text).toEqual('Error: Sinopse precisa de no mínimo 10 caracteres e no máximo 5000.');
  });

  it('When a wrong avaliation is submitted', async () => {
    const newIndication = indications;
    newIndication.avaliation = 999;

    const res = await testServer.post('/indications/create').send(newIndication);
    expect(res.text).toEqual('Error: Esperado uma avaliação de 1 a 10.');
  });

  it('When specific data is not sent', async () => {
    const res = await testServer.post('/indications/create').send();
    expect(res.text).toEqual('Error: Necessário passar todos os campos (title, synopsis, avaliation).');
  });
});

describe('Update - Indication', () => {
  const route = `/indications/update/${indications.id}`;

  it('Update sucesso', async () => {
    const res = await testServer.post(route).send({ title: 'Testado' });
    expect(res.statusCode).toBe(200);
  });

  it('When an invalid title is submitted', async () => {
    const res = await testServer.post(route).send({ title: 't' });
    expect(res.text).toEqual('Error: Título precisa de no mínimo 3 caracteres e no máximo 100.');
  });

  it('When a wrong synopsis is sent', async () => {
    const res = await testServer.post(route).send({ synopsis: 's' });
    expect(res.text).toEqual('Error: Sinopse precisa de no mínimo 10 caracteres e no máximo 5000.');
  });

  it('When a wrong avaliation is submitted', async () => {
    const res = await testServer.post(route).send({ avaliation: 300 });
    expect(res.text).toEqual('Error: Esperado uma avaliação de 1 a 10.');
  });

  it('When no data is passed', async () => {
    const res = await testServer.post(route).send();
    expect(res.text).toEqual('Error: Necessário passar ao menos um desses campos (title, synopsis, avaliation).');
  });
});

describe('Get - Indication', () => {
  const route = `/indications/find/${indications.id}`;

  it('Success while find', async () => {
    const res = await testServer.get(route);

    expect(res.statusCode).toBe(200);
  });

  it('While find not finding the user sentr', async () => {
    const res = await testServer.get('/indications/find/9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d');
    expect(res.body).toEqual({});
  });
});

describe('Find - Indication', () => {
  it('Find sucesso', async () => {
    const res = await testServer.get('/indications/find');

    expect(res.statusCode).toBe(200);
  });
});

describe('Delete - Indication', () => {
  const route = `/indications/delete/${indications.id}`;

  it('Delete sucesso', async () => {
    const res = await testServer.delete(route);

    expect(res.statusCode).toBe(200);
  });

  it('When trying to delete not finding the indication', async () => {
    const res = await testServer.delete(route);

    expect(res.text).toEqual('Error: Falha ao apagar indicação.');
  });
});
