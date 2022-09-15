import { Router } from 'express';
import { signIn, signUp, deleteAccount } from './controller';
import passport from 'passport';

const router = Router();

router.post('/sigUp', signUp);
router.post('/sigIn', signIn)
router.delete('/delete',passport.authenticate('jwt', { session:false }) ,deleteAccount)

module.exports = router;