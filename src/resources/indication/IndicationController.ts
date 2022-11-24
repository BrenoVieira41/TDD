import { Request, Response } from 'express';
import { Indications } from 'src/database/entities/Indications';
import IndicationService from './IndicationService';

class IndicationController {
  async createIndication(req: Request, res: Response): Promise<Response> {
    try {
      const indication: Indications = req.body;

      const newIndication = await IndicationService.createIndication(indication);
      return res.status(200).send(newIndication);
    } catch (err) {
      return res.status(400).send(err.message);
    }
  }

  async updateIndication(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const indication = req.body;

      const newIndication = await IndicationService.updateIndication(id, indication);
      return res.status(200).send(newIndication);
    } catch (err) {
      return res.status(400).send(err.message);
    }
  }

  async deleteIndication(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;

      const deleteIndication = await IndicationService.deleteIndication(id);
      return res.status(200).send(deleteIndication);
    } catch (err) {
      return res.status(400).send(err.message);
    }
  }

  async getIndicationById(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;

      const user = await IndicationService.findIndicationById(id);
      return res.status(200).send(user);
    } catch (err) {
      return res.status(400).send(err.message);
    }
  }

  async findIndication(req: Request, res: Response): Promise<Response> {
    try {
      const { limit, offset } = req.query;

      const indications = await IndicationService.findIndication(limit, offset);
      return res.status(200).send(indications);
    } catch (err) {
      return res.status(400).send(err.message);
    }
  }
}

export default new IndicationController();
