import { Router } from 'express'
import { isAuth } from '../helpers/is-auth';
import { safeThrow } from '../helpers/safe-throw';
import { LinkService } from '../services/LinkService';
const router = Router({ mergeParams: true })

import linkRouter from './linkRouter'
import userRouter from './userRouter'

router.get("/", (req, res) => {
    res.render("index");
});

/** Redirect to the original link */
router.get("/l/:hash", safeThrow(async (req, res) => {
    const { hash } = req.params;
    const originalLink = await LinkService.getOriginalLink(hash);

    return res.redirect(originalLink);
}));

router.use('/api/links', isAuth, linkRouter)
router.use('/api/users', userRouter)


export default router