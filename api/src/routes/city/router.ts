import { Router } from 'express';
import { getCity, getCities } from './controller';

const router = Router();

router.get('/', getCity);
router.get('/all', getCities);

export default router;