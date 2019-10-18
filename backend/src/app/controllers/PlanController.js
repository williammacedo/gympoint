import Plan from '../models/Plan';

class PlanController {
  async index(req, res) {
    return res.json([{ title: 'Start', duration: 1, price: 129 }]);
  }

  async store(req, res) {
    return res.json({ id: 1, title: 'Start' });
  }

  async delete(req, res) {
    const { id } = req.params;
    return res.status(204).send();
  }
}

export default new PlanController();
