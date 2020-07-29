/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Icon from '@material-ui/core/Icon';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import auth from '../auth/auth-helper';
import { update, read } from './api-user';

const styles = (theme) => ({
  card: {
    maxWidth: 600,
    margin: 'auto',
    textAlign: 'center',
    marginTop: theme.spacing(5),
    paddingBottom: theme.spacing(2),
  },
  title: {
    margin: theme.spacing(2),
    color: theme.palette.protectedTitle,
  },
  error: {
    verticalAlign: 'middle',
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
  subheading: {
    marginTop: theme.spacing(2),
    color: theme.palette.openTitle,
  },
});

class EditProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      password: '',
      seller: false,
      redirectToProfile: false,
      error: '',
    };
  }

  componentDidMount = () => {
    const jwt = auth.isAuthenticated();
    read(
      {
        userId: this.props.match.params.userId,
      },
      { t: jwt.token },
    ).then((data) => {
      if (data.error) {
        this.setState({ error: data.error });
      } else {
        this.setState({
          name: data.name,
          email: data.email,
        });
      }
    });
  };

  clickSubmit = () => {
    const jwt = auth.isAuthenticated();
    const user = {
      name: this.state.name || undefined,
      email: this.state.email || undefined,
      password: this.state.password || undefined,
      seller: this.state.seller,
    };
    update(
      {
        userId: this.props.match.params.userId,
      },
      {
        t: jwt.token,
      },
      user,
    ).then((data) => {
      if (data.error) {
        this.setState({ error: data.error });
      } else {
        auth.updateUser(data, () => {
          this.setState({
            userId: data._id,
            redirectToProfile: true,
          });
        });
      }
    });
  };

  handleChange = (name) => (event) => {
    this.setState({ [name]: event.target.value });
  };

  handleCheck = (event, checked) => {
    this.setState({ seller: checked });
  };

  render() {
    const { classes } = this.props;
    if (this.state.redirectToProfile) {
      return <Redirect to={`/user/${this.state.userId}`} />;
    }

    return (
      <>
        <Card className={classes.card}>
          <CardContent>
            <Typography
              type="headline"
              component="h2"
              className={classes.title}
            >
              Edit Profile
            </Typography>
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
              id="email"
              type="email"
              label="Email"
              className={classes.textField}
              value={this.state.email}
              onChange={this.handleChange('email')}
              margin="normal"
            />
            <br />
            <TextField
              id="password"
              type="password"
              label="Password"
              className={classes.textField}
              value={this.state.password}
              onChange={this.handleChange('password')}
              margin="normal"
            />
            <br />
            <Typography
              type="subheading"
              component="h4"
              className={classes.subheading}
            >
              Seller Account
            </Typography>
            <FormControlLabel
              control={(
                <Switch
                  classes={{
                    checked: classes.checked,
                    bar: classes.bar,
                  }}
                  checked={this.state.seller}
                  onChange={this.handleCheck}
                />
              )}
              label={
                this.state.seller ? 'Active' : 'Inactive'
              }
            />
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
          </CardActions>
        </Card>
      </>
    );
  }
}

export default withStyles(styles)(withRouter(EditProfile));
