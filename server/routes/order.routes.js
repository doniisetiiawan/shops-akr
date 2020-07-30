import express from 'express';
import authCtrl from '../controllers/auth.controller';
import userCtrl from '../controllers/user.controller';
import productCtrl from '../controllers/product.controller';
import orderCtrl from '../controllers/order.controller';

const router = express.Router();

router
  .route('/api/orders/:userId')
  .post(
    authCtrl.requireSignin,
    productCtrl.decreaseQuantity,
    orderCtrl.create,
  );

router.param('userId', userCtrl.userByID);

export default router;
