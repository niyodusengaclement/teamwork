import express from 'express';
import userActivityUp from '../controllers/signup';
import userActivityIn from '../controllers/signin';
import Reflection from '../controllers/Reflection';//useless
import articleActions from "../controllers/articles";
import validateToken from '../auth/auth';

const router = express.Router();


router.post('/auth/signup', userActivityUp.signup);
router.post('/auth/signin', userActivityIn.signin);

router.route('/auth/users')
        .get(validateToken,userActivityUp.getAll);

router.route('/articles')
      .post(validateToken,articleActions.create);

router.route('/articles')
        .get(validateToken,articleActions.getAll);

router.route('/articles/:articleId')
        .get(validateToken,articleActions.getOne);

router.route('/articles/:articleId')
        .patch(validateToken,articleActions.editOne);

router.route('/articles/:articleId')
        .delete(validateToken,articleActions.deleteOne);


router.route('/articles/comments/:articleId')
        .post(validateToken,articleActions.addComment);


//useless
router.post('/reflections', Reflection.create);
router.get('/reflections', Reflection.getAll);
router.get('/reflections/:id', Reflection.getOne);
router.put('/reflections/:id', Reflection.update);
router.delete('/reflections/:id', Reflection.delete);

export default router;
