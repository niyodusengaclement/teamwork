import express from 'express';
import userActivityUp from '../controllers/signup';
import userActivityIn from '../controllers/signin';
import Reflection from '../controllers/Reflection';//useless
import articleActions from "../controllers/articles";

const router = express.Router();


router.post('/auth/signup', userActivityUp.signup);
router.post('/auth/signin', userActivityIn.signin);
router.post('/articles', articleActions.create);
router.get('/articles', articleActions.getAll);
router.get('/articles/:articleId',articleActions.getOne);
router.post('/articles/comments/:articleId',articleActions.addComment);

//useless
router.post('/reflections', Reflection.create);
router.get('/reflections', Reflection.getAll);
router.get('/reflections/:id', Reflection.getOne);
router.put('/reflections/:id', Reflection.update);
router.delete('/reflections/:id', Reflection.delete);

export default router;
