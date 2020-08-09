/* eslint-disable react/prop-types */
import React, { useState } from 'react';
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

function DeleteProduct(props) {
  const [open, setOpen] = useState(false);

  const jwt = auth.isAuthenticated();
  const clickButton = () => {
    setOpen(true);
  };

  const deleteProduct = () => {
    remove(
      {
        shopId: props.shopId,
        productId: props.product._id,
      },
      { t: jwt.token },
    ).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setOpen(false);
        props.onRemove(props.product);
      }
    });
  };

  const handleRequestClose = () => {
    setOpen(false);
  };

  return (
    <span>
      <IconButton
        aria-label="Delete"
        onClick={clickButton}
        color="secondary"
      >
        <DeleteIcon />
      </IconButton>
      <Dialog open={open} onClose={handleRequestClose}>
        <DialogTitle>{`Delete ${props.product.name}`}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Confirm to delete your product{' '}
            {props.product.name}.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleRequestClose}
            color="primary"
          >
            Cancel
          </Button>
          <Button
            onClick={deleteProduct}
            color="secondary"
            autoFocus="autoFocus"
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </span>
  );
}

export default DeleteProduct;
