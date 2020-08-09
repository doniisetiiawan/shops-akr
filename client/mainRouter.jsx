import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './core/home';
import Users from './user/users';
import Signup from './user/signup';
import Signin from './auth/signin';
import Profile from './user/profile';
import PrivateRoute from './auth/PrivateRoute';
import EditProfile from './user/editProfile';
import Menu from './core/menu';
import NewShop from './shop/newShop';
import Shops from './shop/shops';
import MyShops from './shop/myShops';
import Shop from './shop/shop';
import EditShop from './shop/editShop';
import NewProduct from './product/newProduct';
import Product from './product/product';
import EditProduct from './product/editProduct';
import Cart from './cart/cart';
import ShopOrders from './order/shopOrders';
import Order from './order/order';
import NewAuction from './auction/newAuction';
import Auction from './auction/auction';
import MyAuctions from './auction/myAuctions';
import EditAuction from './auction/editAuction';
import OpenAuctions from './auction/openAuctions';

function MainRouter() {
  return (
    <>
      <Menu />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/users" component={Users} />
        <Route path="/signup" component={Signup} />
        <Route path="/signin" component={Signin} />
        <PrivateRoute
          path="/user/edit/:userId"
          component={EditProfile}
        />
        <Route path="/user/:userId" component={Profile} />

        <Route path="/cart" component={Cart} />
        <Route
          path="/product/:productId"
          component={Product}
        />
        <Route path="/shops/all" component={Shops} />
        <Route path="/shops/:shopId" component={Shop} />

        <Route path="/order/:orderId" component={Order} />
        <PrivateRoute
          path="/seller/orders/:shop/:shopId"
          component={ShopOrders}
        />

        <PrivateRoute
          path="/seller/shops"
          component={MyShops}
        />
        <PrivateRoute
          path="/seller/shop/new"
          component={NewShop}
        />
        <PrivateRoute
          path="/seller/shop/edit/:shopId"
          component={EditShop}
        />
        <PrivateRoute
          path="/seller/:shopId/products/new"
          component={NewProduct}
        />
        <PrivateRoute
          path="/seller/:shopId/:productId/edit"
          component={EditProduct}
        />

        <PrivateRoute
          path="/myauctions"
          component={MyAuctions}
        />
        <PrivateRoute
          path="/auction/new"
          component={NewAuction}
        />
        <PrivateRoute
          path="/auction/edit/:auctionId"
          component={EditAuction}
        />
        <Route
          path="/auction/:auctionId"
          component={Auction}
        />
        <Route
          path="/auctions/all"
          component={OpenAuctions}
        />
      </Switch>
    </>
  );
}

export default MainRouter;
