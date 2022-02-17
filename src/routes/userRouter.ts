import { Router } from 'express';
import { ValidationError } from "../helpers/http";
import { isAuth } from '../helpers/is-auth';
import { safeThrow } from "../helpers/safe-throw";
import { UserService } from "../services/UserService";

const router = Router({ mergeParams: true });

/**
 * User shortener routes
 */

/** List all users */
router.get("/", isAuth, safeThrow(async (req, res) => {
  const result = await UserService.getAllUsers();

  return res.json(result);
}));


/** Delete user */
router.delete("/:id", isAuth, safeThrow(async (req, res) => {
  const { id } = req.params;
  const result = await UserService.deleteUser(id);

  return res.json(result);
}));

/** Create a new user */
router.post("/", safeThrow(async (req, res) => {
  const { email, password, name } = req.body;

  const errors = {}

  if (!name) errors['name'] = 'Name field is required'
  if (!email) errors['email'] = 'Email field is required'
  if (!password) errors['password'] = 'Password field is required'

  if (Object.keys(errors).length) {
    throw new ValidationError("Validation Error", errors);
  }

  const result = await UserService.createUser(email, password, name, 'user');
  delete result.password

  return res.json(result);
}));

/** Authenticate user */
router.post("/login", safeThrow(async (req, res) => {
  const { email, password } = req.body;

  const errors = {}

  if (!email) errors['email'] = 'Email field is required'
  if (!password) errors['password'] = 'Password field is required'

  if (Object.keys(errors).length) {
    throw new ValidationError("Validation Error", errors);
  }

  const token = await UserService.authenticate(email, password);

  return res.json({ token });
}));

export default router