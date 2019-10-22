import { Op } from 'sequelize';

import Plan from '../models/Plan';

class PlanController {
  async index(req, res) {
    const plans = await Plan.findAll();

    return res.json(plans);
  }

  async store(req, res) {
    const { title, duration, price } = req.body;

    const checkExistsPlan = await Plan.findAll({
      where: {
        [Op.or]: [
          {
            title,
          },
          {
            duration,
          },
        ],
      },
    });

    if (checkExistsPlan && checkExistsPlan.length > 0) {
      return res.status(400).json({
        error: 'There is already a Plan with same title or same duration.',
      });
    }

    const { id, titleCreated } = await Plan.create({ title, duration, price });

    return res.json({ id, titleCreated });
  }

  async update(req, res) {
    const { id } = req.params;
    const plan = await Plan.findByPk(id);

    const { title, duration, price } = await plan.update(req.body);

    return res.json({ title, duration, price });
  }

  async delete(req, res) {
    const { id } = req.params;

    Plan.destroy({
      where: {
        id,
      },
    });

    return res.status(204).send();
  }
}

export default new PlanController();
