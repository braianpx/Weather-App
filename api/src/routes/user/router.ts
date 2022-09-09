import { Router } from 'express';
import { CreateUser } from './controller';


const router = Router();

router.post('/create',CreateUser);


module.exports = router;