/* eslint-disable react/prop-types */
import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Link, withRouter } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import {
  Home as HomeIcon,
  ShoppingCart as CartIcon,
} from '@material-ui/icons';
import Button from '@material-ui/core/Button';
import Badge from '@material-ui/core/Badge';
import auth from '../auth/auth-helper';

const isActive = (history, path) => {
  if (history.location.pathname === path) return { color: '#bef67a' };
  return { color: '#ffffff' };
};

const isPartActive = (history, path) => {
  if (history.location.pathname.includes(path)) return { color: '#bef67a' };
  return { color: '#ffffff' };
};

function Menu(props) {
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography type="title" color="inherit">
            MERN Marketplace
          </Typography>
          <Link to="/">
            <IconButton
              aria-label="Home"
              style={isActive(props.history, '/')}
            >
              <HomeIcon />
            </IconButton>
          </Link>
          <Link to="/shops/all">
            <Button
              style={isActive(props.history, '/shops/all')}
            >
              All Shops
            </Button>
          </Link>
          <Link to="/cart">
            <Button
              style={isActive(props.history, '/cart')}
            >
              Cart
              <Badge
                color="secondary"
                badgeContent={7}
                style={{ marginLeft: '7px' }}
              >
                <CartIcon />
              </Badge>
            </Button>
          </Link>

          <div
            style={{ position: 'absolute', right: '10px' }}
          >
            <span style={{ float: 'right' }}>
              {!auth.isAuthenticated() && (
                <span>
                  <Link to="/signup">
                    <Button
                      style={isActive(
                        props.history,
                        '/signup',
                      )}
                    >
                      Sign Up
                    </Button>
                  </Link>
                  <Link to="/signin">
                    <Button
                      style={isActive(
                        props.history,
                        '/signin',
                      )}
                    >
                      Sign In
                    </Button>
                  </Link>
                </span>
              )}

              {auth.isAuthenticated() && (
                <span>
                  {auth.isAuthenticated().user.seller && (
                    <Link to="/seller/shops">
                      <Button
                        style={isPartActive(
                          props.history,
                          '/seller/',
                        )}
                      >
                        My Shops
                      </Button>
                    </Link>
                  )}
                  <Link
                    to={`/user/${
                      auth.isAuthenticated().user._id
                    }`}
                  >
                    <Button
                      style={isActive(
                        props.history,
                        `/user/${
                          auth.isAuthenticated().user._id
                        }`,
                      )}
                    >
                      My Profile
                    </Button>
                  </Link>
                  <Button
                    color="inherit"
                    onClick={() => {
                      auth.signout(() => props.history.push('/'));
                    }}
                  >
                    Sign out
                  </Button>
                </span>
              )}
            </span>
          </div>
        </Toolbar>
      </AppBar>
    </>
  );
}

export default withRouter(Menu);
