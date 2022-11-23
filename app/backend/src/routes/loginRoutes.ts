import { Router } from 'express';
import * as userLog from '../controllers/loginController';
import * as validUser from '../middlewares/validUserLogin';

const router = Router();

router.post('/', validUser.validUserLogin, userLog.userLogin);
router.get('/validate', validUser.validUserLoged, userLog.validUserLoged);

export default router;
