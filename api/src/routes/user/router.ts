import { Router } from 'express';
import { signIn, signUp, deleteAccount, getAll } from './controller';
import passport from 'passport';

const router = Router();

router.get('', getAll);
router.post('/signUp', signUp);
router.post('/signIn', signIn);
router.delete('/delete',passport.authenticate('jwt', { session:false }) ,deleteAccount);

export default router;