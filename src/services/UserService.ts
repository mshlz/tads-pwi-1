import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import { JWT_SKEY } from "../config/env";
import { BadRequestError, NotFoundError } from "../helpers/http";
import { User } from "../models/User";

export class UserService {

  static async authenticate(email: string, password: string) {

    const user = await this.getUserByEmail(email)

    if (!bcrypt.compareSync(password, user.password)) {
      throw new BadRequestError("Password don't match");
    }

    const payload = {
      userId: user.id,
      name: user.name,
    }

    const token = jwt.sign(payload, JWT_SKEY, { expiresIn: '1h' })

    return token
  }

  static async changePassword(id: number, currentPassword: string, newPassword: string) {
    const user = await this.getUserById(id)

    if (!user) {
      throw new NotFoundError("User not found");
    }

    if (!bcrypt.compareSync(currentPassword, user.password)) {
      throw new BadRequestError("Password don't match");
    }

    user.password = await this.hashPassword(newPassword)
    await user.save()

    return true
  }

  static async createUser(email: string, password: string, name: string, role: 'admin' | 'user') {
    const emailSanitized = email.toLowerCase().trim()
    const userCount = await User.count({ where: { email: emailSanitized } })

    if (userCount !== 0) {
      throw new BadRequestError('User already exists')
    }

    const user = User.create({
      email: emailSanitized,
      password: await this.hashPassword(password),
      name,
      role
    });

    await user.save();
    await user.reload();

    return user;
  }

  static async getUserByEmail(email: string) {
    const user = await User.findOne({ where: { email: email.toLowerCase().trim() } });

    if (!user) {
      throw new NotFoundError("User not found");
    }

    return user;
  }

  static async getUserById(id: number) {
    const user = await User.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundError("User not found");
    }

    return user;
  }

  static async deleteUser(id: number) {
    const user = await this.getUserById(id)

    const result = await user.remove()

    return { success: !!result };
  }

  static async getAllUsers() {
    return User.find();
  }

  static async hashPassword(password: string) {
    return bcrypt.hash(password, 10)
  }
}
