import { Router } from 'express';
import { addFavorites, createFavorite, deleteFavorites, removeFavorites, getFavorites } from './controller';

const router = Router();
 
router.get('/', getFavorites)
router.post('/create',createFavorite)
router.put('/add', addFavorites)
router.put('/remove', removeFavorites)
router.delete('/delete', deleteFavorites)

module.exports = router;