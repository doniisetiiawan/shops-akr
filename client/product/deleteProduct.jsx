/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import IconButton from '@material-ui/core/IconButton';
import { Delete as DeleteIcon } from '@material-ui/icons';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import auth from '../auth/auth-helper';
import { remove } from './api-product';

class DeleteProduct extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
    };
  }

  clickButton = () => {
    this.setState({ open: true });
  };

  deleteProduct = () => {
    const jwt = auth.isAuthenticated();
    remove(
      {
        shopId: this.props.shopId,
        productId: this.props.product._id,
      },
      { t: jwt.token },
    ).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        this.setState({ open: false }, () => {
          this.props.onRemove(this.props.product);
        });
      }
    });
  };

  handleRequestClose = () => {
    this.setState({ open: false });
  };

  render() {
    return (
      <>
        <span>
          <IconButton
            aria-label="Delete"
            onClick={this.clickButton}
            color="secondary"
          >
            <DeleteIcon />
          </IconButton>
          <Dialog
            open={this.state.open}
            onClose={this.handleRequestClose}
          >
            <DialogTitle>{`Delete ${this.props.product.name}`}</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Confirm to delete your product{' '}
                {this.props.product.name}.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={this.handleRequestClose}
                color="primary"
              >
                Cancel
              </Button>
              <Button
                onClick={this.deleteProduct}
                color="secondary"
                autoFocus="autoFocus"
              >
                Confirm
              </Button>
            </DialogActions>
          </Dialog>
        </span>
      </>
    );
  }
}

export default DeleteProduct;
