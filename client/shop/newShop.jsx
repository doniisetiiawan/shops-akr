/* eslint-disable react/prop-types,jsx-a11y/label-has-associated-control */
import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { AttachFile as FileUpload } from '@material-ui/icons';
import TextField from '@material-ui/core/TextField';
import { Link, Redirect } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';
import CardActions from '@material-ui/core/CardActions';
import auth from '../auth/auth-helper';
import { create } from './api-shop';

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
    fontSize: '1em',
  },
  textField: {
    marginLeft: theme.spacing(),
    marginRight: theme.spacing(),
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

class NewShop extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      description: '',
      image: '',
      redirect: false,
      error: '',
    };
  }

  componentDidMount = () => {
    this.shopData = new FormData();
  };

  handleChange = (name) => (event) => {
    const value = name === 'image'
      ? event.target.files[0]
      : event.target.value;
    this.shopData.set(name, value);
    this.setState({ [name]: value });
  };

  clickSubmit = () => {
    const jwt = auth.isAuthenticated();
    create(
      {
        userId: jwt.user._id,
      },
      {
        t: jwt.token,
      },
      this.shopData,
    ).then((data) => {
      if (data.error) {
        this.setState({ error: data.error });
      } else {
        this.setState({ error: '', redirect: true });
      }
    });
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to="/seller/shops" />;
    }
    const { classes } = this.props;

    return (
      <>
        <Card className={classes.card}>
          <CardContent>
            <Typography
              type="headline"
              component="h2"
              className={classes.title}
            >
              New Shop
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
                raised
                color="secondary"
                component="span"
              >
                Upload Logo <FileUpload />
              </Button>
            </label>
            <span>
              {this.state.image
                ? this.state.image.name
                : ''}
            </span>
            <br />
            <TextField
              id="name"
              label="Name"
              value={this.state.name}
              onChange={this.handleChange('name')}
            />
            <br />
            <TextField
              id="multiline-flexible"
              label="Description"
              multiline
              rows="2"
              value={this.state.description}
              onChange={this.handleChange('description')}
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
              to="/seller/shops"
              className={classes.submit}
            >
              <Button variant="contained">Cancel</Button>
            </Link>
          </CardActions>
        </Card>
      </>
    );
  }
}

export default withStyles(styles)(NewShop);
