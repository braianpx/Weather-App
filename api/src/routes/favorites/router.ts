import { Router } from 'express';
import { addFavorites, deleteFavorites, removeFavorites, getFavorites } from './controller';
import passport from 'passport';

const router = Router();

router.get('/', passport.authenticate('jwt', { session:false }), getFavorites)
router.put('/add', passport.authenticate('jwt', { session:false }), addFavorites)
router.put('/remove', passport.authenticate('jwt', { session:false }), removeFavorites)
router.delete('/delete', passport.authenticate('jwt', { session:false }), deleteFavorites)

module.exports = router;