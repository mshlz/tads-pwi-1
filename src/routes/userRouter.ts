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
  const result = await UserService.deleteUser(parseInt(id));

  return res.json(result);
}));

/** Create a new user */
router.post("/", safeThrow(async (req, res) => {
  const { email, password, name } = req.body;

  try {
    const errors = {}

    if (!name) errors['name'] = 'Name field is required'
    if (!email) errors['email'] = 'Email field is required'
    if (!password) errors['password'] = 'Password field is required'

    if (Object.keys(errors).length) {
      throw new ValidationError("Validation Error", errors);
    }

    const result = await UserService.createUser(email, password, name, 'user');
    delete result.password

    if (req.headers['content-type'] === 'application/json') {
      return res.json(result);
    }

    req.session['banner'] = 'Account created, please login'
    return res.redirect('/login')
  } catch (e) {
    if (req.headers['content-type'] === 'application/json') {
      throw e
    }

    return res.render('signup', { errors: e.errors || { message: e.message }, form: { email, name } })
  }
}));

/** Authenticate user */
router.post("/login", safeThrow(async (req, res) => {
  const { email, password } = req.body;

  try {
    const errors = {}
    if (!email) errors['email'] = 'Email field is required'
    if (!password) errors['password'] = 'Password field is required'

    if (Object.keys(errors).length) {
      throw new ValidationError("Validation Error", errors);
    }

    const token = await UserService.authenticate(email, password);
    req.session['token'] = token

    if (req.headers['content-type'] === 'application/json') {
      return res.json({ token })
    }

    return res.redirect('/links')

  } catch (e) {
    if (req.headers['content-type'] === 'application/json') {
      throw e
    }

    return res.render('login', { errors: e.errors || { message: e.message }, form: { email } })
  }
}));

export default router