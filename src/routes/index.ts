import { Router } from 'express';
import * as LinkController from '../controllers/LinkController';
import * as UserController from '../controllers/UserController';
import { isAuth } from '../helpers/is-auth';
import linkRouter from './linkRouter';
import userRouter from './userRouter';
const router = Router({ mergeParams: true })

/**
 * Pages routes
 */
// if authenticated redirect / to /links
router.get("/", isAuth, (req, res) => {
    return res.redirect("/links");
});

router.get("/login", UserController.renderLoginPage);
router.get("/signup", UserController.renderSingUpPage);
router.post("/logout", UserController.logout);
router.get("/links", isAuth, LinkController.renderLinksPage);


/** Redirect to the original link */
router.get("/l/:hash", LinkController.redirectShortLink);

/**
 * API routes
 */
router.use('/api/links', isAuth, linkRouter)
router.use('/api/users', userRouter)


export default router