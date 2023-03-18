import { Router } from 'express';
import { signIn, signUp, deleteAccount } from './controller';
import passport from 'passport';

const router = Router();

router.post('/signUp', signUp);
router.post('/signIn', signIn);
router.delete('/delete',passport.authenticate('jwt', { session:false }) ,deleteAccount);

export default router;