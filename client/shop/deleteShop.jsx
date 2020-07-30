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
import { remove } from './api-shop';

class DeleteShop extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
    };
  }

  clickButton = () => {
    this.setState({ open: true });
  }

  deleteShop = () => {
    const jwt = auth.isAuthenticated();
    remove(
      {
        shopId: this.props.shop._id,
      },
      { t: jwt.token },
    ).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        this.setState({ open: false }, () => {
          this.props.onRemove(this.props.shop);
        });
      }
    });
  };

  handleRequestClose = () => {
    this.setState({ open: false });
  }

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
            onRequestClose={this.handleRequestClose}
          >
            <DialogTitle>
              {`Delete ${this.props.shop.name}`}
            </DialogTitle>
            <DialogContent>
              <DialogContentText>
                Confirm to delete your shop{' '}
                {this.props.shop.name}.
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
                onClick={this.deleteShop}
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

export default DeleteShop;
