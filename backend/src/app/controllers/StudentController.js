import Student from '../models/Student';

class StudentController {
  async store(req, res) {
    const studentExists = await Student.findOne({
      where: { email: req.body.email },
    });

    if (studentExists) {
      return res.status(400).json({
        error: `There is already a student with this email: ${studentExists.email}`,
      });
    }

    const studentCreated = await Student.create(req.body);

    return res.json(studentCreated);
  }

  async update(req, res) {
    const { id } = req.params;
    const student = await Student.findByPk(id);

    if (!student) {
      return res.status(400).json({ error: 'Student not found.' });
    }

    const emailAlreadyInUse = Student.findOne({
      where: { email: req.body.email },
    });

    if (emailAlreadyInUse) {
      return res.status(400).json({
        error: `There is already a user with this email: ${emailAlreadyInUse.email}`,
      });
    }

    const { name, email, age, weight, height } = await Student.update(
      student,
      req.body
    );

    return res.json({ name, email, age, weight, height });
  }
}

export default new StudentController();
