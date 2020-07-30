/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import {
  AddShoppingCart as AddCartIcon,
  RemoveShoppingCart as DisabledCartIcon,
} from '@material-ui/icons';
import cart from './cart-helper';

const styles = () => ({
  iconButton: {
    width: '28px',
    height: '28px',
  },
  disabledIconButton: {
    color: '#7f7563',
    width: '28px',
    height: '28px',
  },
});

class AddToCart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: false,
    };
  }

  addToCart = () => {
    cart.addItem(this.props.item, () => {
      this.setState({ redirect: true });
    });
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to="/cart" />;
    }
    const { classes } = this.props;

    return (
      <>
        <span>
          {this.props.item.quantity >= 0 ? (
            <IconButton
              color="secondary"
              dense="dense"
              onClick={this.addToCart}
            >
              <AddCartIcon
                className={
                  this.props.cartStyle || classes.iconButton
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
                  this.props.cartStyle
                  || classes.disabledIconButton
                }
              />
            </IconButton>
          )}
        </span>
      </>
    );
  }
}

export default withStyles(styles)(AddToCart);
