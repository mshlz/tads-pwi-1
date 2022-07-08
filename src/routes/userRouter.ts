import { Router } from 'express';
import * as UserController from "../controllers/UserController";
import { isAuth } from '../helpers/is-auth';

const router = Router({ mergeParams: true });

/**
 * User shortener routes
 */

/** List all users */
router.get("/", isAuth, UserController.getAll);

/** Delete user */
router.delete("/:id", isAuth, UserController.deleteById);

/** Create a new user */
router.post("/", UserController.create);

/** Authenticate user */
router.post("/login", UserController.login);

export default router