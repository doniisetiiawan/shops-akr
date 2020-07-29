import express from 'express';
import authCtrl from '../controllers/auth.controller';
import userCtrl from '../controllers/user.controller';
import shopCtrl from '../controllers/shop.controller';

const router = express.Router();

router.route('/api/shops').get(shopCtrl.list);

router
  .route('/api/shops/by/:userId')
  .get(
    authCtrl.requireSignin,
    authCtrl.hasAuthorization,
    shopCtrl.listByOwner,
  );

router
  .route('/api/shops/by/:userId')
  .post(
    authCtrl.requireSignin,
    authCtrl.hasAuthorization,
    userCtrl.isSeller,
    shopCtrl.create,
  );

router.param('userId', userCtrl.userByID);

export default router;
