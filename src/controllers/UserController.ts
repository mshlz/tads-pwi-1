import { ValidationError } from "../helpers/http";
import { safeThrow } from "../helpers/safe-throw";
import { UserService } from "../services/UserService";

// ---------------------------------------------------------------------------------
// API actions
// ---------------------------------------------------------------------------------

/** List all users */
export const getAll = safeThrow(async (req, res) => {
  const result = await UserService.getAllUsers();

  return res.json(result);
});


/** Delete user */
export const deleteById = safeThrow(async (req, res) => {
  const { id } = req.params;
  const result = await UserService.deleteUser(parseInt(id));

  return res.json(result);
});

/** Create a new user */
export const create = safeThrow(async (req, res) => {
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
});

/** Authenticate user */
export const login = safeThrow(async (req, res) => {
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
});


// ---------------------------------------------------------------------------------
// Page actions
// ---------------------------------------------------------------------------------

/** Render login page  */
export const renderLoginPage = (req, res) => {
  const banner = req.session['banner']
  if (banner) {
      delete req.session['banner']
  }
  res.render("login", { banner });
}

/** Render sign up page  */
export const renderSingUpPage = (req, res) => {
  res.render("signup");
}

/** Destroy session & redirect to /  */
export const logout = (req, res) => {
  req.session.destroy(err => {
      res.redirect('/')
  })
}