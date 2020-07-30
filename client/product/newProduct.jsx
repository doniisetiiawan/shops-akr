/* eslint-disable react/prop-types,jsx-a11y/label-has-associated-control */
import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { AttachFile as FileUpload } from '@material-ui/icons';
import TextField from '@material-ui/core/TextField';
import Icon from '@material-ui/core/Icon';
import CardActions from '@material-ui/core/CardActions';
import { Link, Redirect } from 'react-router-dom';
import auth from '../auth/auth-helper';
import { create } from './api-product';

const styles = (theme) => ({
  card: {
    maxWidth: 600,
    margin: 'auto',
    textAlign: 'center',
    marginTop: theme.spacing(5),
    paddingBottom: theme.spacing(2),
  },
  error: {
    verticalAlign: 'middle',
  },
  title: {
    marginTop: theme.spacing(2),
    color: theme.palette.openTitle,
    fontSize: '1.2em',
  },
  textField: {
    marginLeft: theme.spacing(),
    marginRight: theme.spacing(),
    width: 300,
  },
  submit: {
    margin: 'auto',
    marginBottom: theme.spacing(2),
  },
  input: {
    display: 'none',
  },
  filename: {
    marginLeft: '10px',
  },
});

class NewProduct extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      description: '',
      images: [],
      category: '',
      quantity: '',
      price: '',
      redirect: false,
      error: '',
    };
  }

  componentDidMount = () => {
    this.productData = new FormData();
  };

  handleChange = (name) => (event) => {
    const value = name === 'image'
      ? event.target.files[0]
      : event.target.value;
    this.productData.set(name, value);
    this.setState({ [name]: value });
  };

  clickSubmit = () => {
    const jwt = auth.isAuthenticated();
    create(
      {
        shopId: this.props.match.params.shopId,
      },
      {
        t: jwt.token,
      },
      this.productData,
    ).then((data) => {
      if (data.error) {
        this.setState({ error: data.error });
      } else {
        this.setState({ error: '', redirect: true });
        this.productData.remove('image');
      }
    });
  };

  render() {
    if (this.state.redirect) {
      return (<Redirect to={`/seller/shop/edit/${this.props.match.params.shopId}`} />);
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
              New Product
            </Typography>
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
                Upload Photo
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
            <TextField
              id="multiline-flexible"
              label="Description"
              multiline
              rows="2"
              value={this.state.description}
              onChange={this.handleChange('description')}
              className={classes.textField}
              margin="normal"
            />
            <TextField
              id="category"
              label="Category"
              className={classes.textField}
              value={this.state.category}
              onChange={this.handleChange('category')}
              margin="normal"
            />
            <TextField
              id="quantity"
              label="Quantity"
              className={classes.textField}
              value={this.state.quantity}
              onChange={this.handleChange('quantity')}
              type="number"
              margin="normal"
            />
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
              Submit
            </Button>
            <Link
              to={`/seller/shop/edit/${this.props.match.params.shopId}`}
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

export default withStyles(styles)(NewProduct);
