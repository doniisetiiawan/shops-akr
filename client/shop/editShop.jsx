/* eslint-disable react/prop-types,jsx-a11y/label-has-associated-control */
import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import { AttachFile as FileUpload } from '@material-ui/icons';
import TextField from '@material-ui/core/TextField';
import Icon from '@material-ui/core/Icon';
import CardActions from '@material-ui/core/CardActions';
import { Redirect } from 'react-router-dom';
import auth from '../auth/auth-helper';
import { read, update } from './api-shop';
import MyProducts from '../product/myProducts';

const styles = (theme) => ({
  root: {
    flexGrow: 1,
    margin: 30,
  },
  card: {
    textAlign: 'center',
    paddingBottom: theme.spacing(2),
  },
  title: {
    margin: theme.spacing(2),
    color: theme.palette.protectedTitle,
    fontSize: '1.2em',
  },
  subheading: {
    marginTop: theme.spacing(2),
    color: theme.palette.openTitle,
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

class EditShop extends Component {
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
    const jwt = auth.isAuthenticated();
    read(
      {
        shopId: this.props.match.params.shopId,
      },
      { t: jwt.token },
    ).then((data) => {
      if (data.error) {
        this.setState({ error: data.error });
      } else {
        this.setState({
          id: data._id,
          name: data.name,
          description: data.description,
          owner: data.owner.name,
        });
      }
    });
  };

  clickSubmit = () => {
    const jwt = auth.isAuthenticated();
    update(
      {
        shopId: this.props.match.params.shopId,
      },
      {
        t: jwt.token,
      },
      this.shopData,
    ).then((data) => {
      if (data.error) {
        this.setState({ error: data.error });
      } else {
        this.setState({ redirect: true });
        this.shopData.remove('image');
      }
    });
  };

  handleChange = (name) => (event) => {
    const value = name === 'image'
      ? event.target.files[0]
      : event.target.value;
    this.shopData.set(name, value);
    this.setState({ [name]: value });
  };

  render() {
    const logoUrl = this.state.id
      ? `/api/shops/logo/${
        this.state.id
      }?${new Date().getTime()}`
      : '/api/shops/defaultphoto';
    if (this.state.redirect) {
      return <Redirect to="/seller/shops" />;
    }
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Grid container spacing={1}>
          <Grid item xs={6} sm={6}>
            <Card className={classes.card}>
              <CardContent>
                <Typography
                  type="headline"
                  component="h2"
                  className={classes.title}
                >
                  Edit Shop
                </Typography>
                <Avatar
                  src={logoUrl}
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
                    color="default"
                    component="span"
                  >
                    Change Logo
                    <FileUpload />
                  </Button>
                </label>
                <span className={classes.filename}>
                  {this.state.image
                    ? this.state.image.name
                    : ''}
                </span>
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
                  rows="3"
                  value={this.state.description}
                  onChange={this.handleChange(
                    'description',
                  )}
                  className={classes.textField}
                  margin="normal"
                />
                <Typography
                  type="subheading"
                  component="h4"
                  className={classes.subheading}
                >
                  Owner: {this.state.owner}
                </Typography>
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
              </CardActions>
            </Card>
          </Grid>
          <Grid item xs={6} sm={6}>
            <MyProducts
              shopId={this.props.match.params.shopId}
            />
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(EditShop);
