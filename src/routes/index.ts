import { Router } from 'express';
import { isAuth } from '../helpers/is-auth';
import { safeThrow } from '../helpers/safe-throw';
import { LinkService } from '../services/LinkService';
import linkRouter from './linkRouter';
import userRouter from './userRouter';
const router = Router({ mergeParams: true })

/**
 * Pages routes
 */
router.get("/", isAuth, (req, res, next) => {
    return res.redirect("/links");
});

router.get("/login", (req, res) => {
    const banner = req.session['banner']
    if (banner) {
        delete req.session['banner']
    }
    res.render("login", { banner });
});

router.get("/signup", (req, res) => {
    res.render("signup");
});

router.post("/logout", (req, res) => {
    req.session.destroy(err => {
        res.redirect('/')
    })
});

router.get("/links", isAuth, (req, res) => {
    res.render("links", { user: req.session['user']});
});

/** Redirect to the original link */
router.get("/l/:hash", safeThrow(async (req, res) => {
    const { hash } = req.params;
    const originalLink = await LinkService.getOriginalLink(hash);

    return res.redirect(originalLink);
}));

/**
 * API routes
 */
router.use('/api/links', isAuth, linkRouter)
router.use('/api/users', userRouter)


export default router