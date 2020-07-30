/* eslint-disable react/prop-types,jsx-a11y/label-has-associated-control */
import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import { AttachFile as FileUpload } from '@material-ui/icons';
import TextField from '@material-ui/core/TextField';
import Icon from '@material-ui/core/Icon';
import CardActions from '@material-ui/core/CardActions';
import { Link, Redirect } from 'react-router-dom';
import { read, update } from './api-product';
import auth from '../auth/auth-helper';

const styles = (theme) => ({
  card: {
    margin: 'auto',
    textAlign: 'center',
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(2),
    maxWidth: 500,
    paddingBottom: theme.spacing(2),
  },
  title: {
    margin: theme.spacing(2),
    color: theme.palette.protectedTitle,
    fontSize: '1.2em',
  },
  error: {
    verticalAlign: 'middle',
  },
  textField: {
    marginLeft: theme.spacing(),
    marginRight: theme.spacing(),
    width: 400,
  },
  submit: {
    margin: 'auto',
    marginBottom: theme.spacing(2),
  },
  bigAvatar: {
    width: 60,
    height: 60,
    margin: 'auto',
  },
  input: {
    display: 'none',
  },
  filename: {
    marginLeft: '10px',
  },
});

class EditProduct extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = () => {
    this.productData = new FormData();
    read({
      productId: this.props.match.params.productId,
    }).then((data) => {
      if (data.error) {
        this.setState({ error: data.error });
      } else {
        this.setState({
          id: data._id,
          name: data.name,
          description: data.description,
          category: data.category,
          quantity: data.quantity,
          price: data.price,
        });
      }
    });
  };

  clickSubmit = () => {
    const jwt = auth.isAuthenticated();
    update(
      {
        shopId: this.props.match.params.shopId,
        productId: this.props.match.params.productId,
      },
      {
        t: jwt.token,
      },
      this.productData,
    ).then((data) => {
      if (data.error) {
        this.setState({ error: data.error });
      } else {
        this.setState({ redirect: true });
        this.productData.remove('image');
      }
    });
  };

  handleChange = (name) => (event) => {
    const value = name === 'image'
      ? event.target.files[0]
      : event.target.value;
    this.productData.set(name, value);
    this.setState({ [name]: value });
  };

  render() {
    const imageUrl = this.state.id
      ? `/api/product/image/${
        this.state.id
      }?${new Date().getTime()}`
      : '/api/product/defaultphoto';
    if (this.state.redirect) {
      return (
        <Redirect
          to={`/seller/shop/edit/${this.props.match.params.shopId}`}
        />
      );
    }
    const { classes } = this.props;

    return (
      <div>
        <Card className={classes.card}>
          <CardContent>
            <Typography
              type="headline"
              component="h2"
              className={classes.title}
            >
              Edit Product
            </Typography>
            <br />
            <Avatar
              src={imageUrl}
              className={classes.bigAvatar}
            />
            <br />
            <input
              accept="image/*"
              onChange={this.handleChange('image')}
              className={classes.input}
              id="icon-button-file"
              type="file"
            />
            <label htmlFor="icon-button-file">
              <Button
                variant="contained"
                color="secondary"
                component="span"
              >
                Change Image
                <FileUpload />
              </Button>
            </label>
            <span className={classes.filename}>
              {this.state.image
                ? this.state.image.name
                : ''}
            </span>
            <br />
            <TextField
              id="name"
              label="Name"
              className={classes.textField}
              value={this.state.name}
              onChange={this.handleChange('name')}
              margin="normal"
            />
            <br />
            <TextField
              id="multiline-flexible"
              label="Description"
              multiline
              rows="3"
              value={this.state.description}
              onChange={this.handleChange('description')}
              className={classes.textField}
              margin="normal"
            />
            <br />
            <TextField
              id="category"
              label="Category"
              className={classes.textField}
              value={this.state.category}
              onChange={this.handleChange('category')}
              margin="normal"
            />
            <br />
            <TextField
              id="quantity"
              label="Quantity"
              className={classes.textField}
              value={this.state.quantity}
              onChange={this.handleChange('quantity')}
              type="number"
              margin="normal"
            />
            <br />
            <TextField
              id="price"
              label="Price"
              className={classes.textField}
              value={this.state.price}
              onChange={this.handleChange('price')}
              type="number"
              margin="normal"
            />
            <br />
            {this.state.error && (
              <Typography component="p" color="error">
                <Icon
                  color="error"
                  className={classes.error}
                >
                  error
                </Icon>
                {this.state.error}
              </Typography>
            )}
          </CardContent>
          <CardActions>
            <Button
              color="primary"
              variant="contained"
              onClick={this.clickSubmit}
              className={classes.submit}
            >
              Update
            </Button>
            <Link
              to={`/seller/shops/edit/${this.props.match.params.shopId}`}
              className={classes.submit}
            >
              <Button variant="contained">Cancel</Button>
            </Link>
          </CardActions>
        </Card>
      </div>
    );
  }
}

export default withStyles(styles)(EditProduct);
