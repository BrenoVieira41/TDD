import { Router } from 'express';
import IndicationController from './resources/indication/IndicationController';

const routes = Router();

routes.post('/indications/create', IndicationController.createIndication);
routes.post('/indications/update/:id', IndicationController.updateIndication);
routes.delete('/indications/delete/:id', IndicationController.deleteIndication);
routes.get('/indications/find/:id', IndicationController.getIndicationById);
routes.get('/indications/find', IndicationController.findIndication);

export { routes };
