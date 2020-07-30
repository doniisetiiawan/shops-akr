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

class MainRouter extends React.Component {
  componentDidMount = () => {
    const jssStyles = document.getElementById(
      'jss-server-side',
    );
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  };

  render() {
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

          <Route path="/shops/all" component={Shops} />
          <Route path="/shops/:shopId" component={Shop} />

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
        </Switch>
      </>
    );
  }
}

export default MainRouter;
