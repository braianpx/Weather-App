import { Router } from 'express';
import { addFavorites, deleteFavorites, removeFavorites, getFavorites } from './controller';

const router = Router();
 
router.get('/', getFavorites)
router.put('/add', addFavorites)
router.put('/remove', removeFavorites)
router.delete('/delete', deleteFavorites)

module.exports = router;