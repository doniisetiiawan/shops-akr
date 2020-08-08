/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import IconButton from '@material-ui/core/IconButton';
import {
  AddShoppingCart as AddCartIcon,
  RemoveShoppingCart as DisabledCartIcon,
} from '@material-ui/icons';
import { makeStyles } from '@material-ui/styles';
import { Redirect } from 'react-router-dom';
import cart from './cart-helper';

const useStyles = makeStyles(() => ({
  iconButton: {
    width: '28px',
    height: '28px',
  },
  disabledIconButton: {
    color: '#7f7563',
    width: '28px',
    height: '28px',
  },
}));

function AddToCart(props) {
  const classes = useStyles();
  const [redirect, setRedirect] = useState(false);

  const addToCart = () => {
    cart.addItem(props.item, () => {
      setRedirect({ redirect: true });
    });
  };

  if (redirect) {
    return <Redirect to="/cart" />;
  }

  return (
    <span>
      {props.item.quantity >= 0 ? (
        <IconButton
          color="secondary"
          dense="dense"
          onClick={addToCart}
        >
          <AddCartIcon
            className={
              props.cartStyle || classes.iconButton
            }
          />
        </IconButton>
      ) : (
        <IconButton
          disabled
          color="secondary"
          dense="dense"
        >
          <DisabledCartIcon
            className={
              props.cartStyle || classes.disabledIconButton
            }
          />
        </IconButton>
      )}
    </span>
  );
}

export default AddToCart;
