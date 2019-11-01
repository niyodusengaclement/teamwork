import express from 'express';
import userActivityUp from '../controllers/signup';
import userActivityIn from '../controllers/signin';
import articleActions from '../controllers/articles';
import validateToken from '../auth/auth';
import signout from '../controllers/signout';

const router = express.Router();

router.get('/auth/signout', signout);
router.post('/auth/signup', userActivityUp.signup);
router.post('/auth/signin', userActivityIn.signin);

router.route('/auth/users')
  .get(validateToken, userActivityUp.getAll);

router.route('/articles')
        .post(validateToken, articleActions.create);

router.route('/articles')
        .get(validateToken, articleActions.getAll);

router.route('/articles/:articleId')
        .get(validateToken, articleActions.getOne);

router.route('/articles/:articleId')
        .patch(validateToken, articleActions.editOne);

router.route('/articles/:articleId')
        .delete(validateToken, articleActions.deleteOne);


router.route('/articles/comments/:articleId')
        .post(validateToken, articleActions.addComment);


export default router;
