/* eslint-disable react/prop-types,jsx-a11y/label-has-associated-control,no-unused-expressions */
import React, { useEffect, useState } from 'react';
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
import { makeStyles } from '@material-ui/styles';
import MyProducts from '../product/myProducts';
import auth from '../auth/auth-helper';
import { read, update } from './api-shop';

const useStyles = makeStyles((theme) => ({
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
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
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
}));

function EditShop({ match }) {
  const classes = useStyles();
  const [values, setValues] = useState({
    name: '',
    description: '',
    image: '',
    redirect: false,
    error: '',
    id: '',
  });
  const jwt = auth.isAuthenticated();

  useEffect(() => {
    const abortController = new AbortController();
    const { signal } = abortController;
    read(
      {
        shopId: match.params.shopId,
      },
      signal,
    ).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          id: data._id,
          name: data.name,
          description: data.description,
          owner: data.owner.name,
        });
      }
    });
    return function cleanup() {
      abortController.abort();
    };
  }, []);

  const clickSubmit = () => {
    const shopData = new FormData();
    values.name && shopData.append('name', values.name);
    values.description
      && shopData.append('description', values.description);
    values.image && shopData.append('image', values.image);
    update(
      {
        shopId: match.params.shopId,
      },
      {
        t: jwt.token,
      },
      shopData,
    ).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({ ...values, redirect: true });
      }
    });
  };

  const handleChange = (name) => (event) => {
    const value = name === 'image'
      ? event.target.files[0]
      : event.target.value;
    setValues({ ...values, [name]: value });
  };

  const logoUrl = values.id
    ? `/api/shops/logo/${values.id}?${new Date().getTime()}`
    : '/api/shops/defaultphoto';

  if (values.redirect) {
    return <Redirect to="/seller/shops" />;
  }

  return (
    <div className={classes.root}>
      <Grid container spacing={8}>
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
              <br />
              <Avatar
                src={logoUrl}
                className={classes.bigAvatar}
              />
              <br />
              <input
                accept="image/*"
                onChange={handleChange('image')}
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
              </label>{' '}
              <span className={classes.filename}>
                {values.image ? values.image.name : ''}
              </span>
              <br />
              <TextField
                id="name"
                label="Name"
                className={classes.textField}
                value={values.name}
                onChange={handleChange('name')}
                margin="normal"
              />
              <br />
              <TextField
                id="multiline-flexible"
                label="Description"
                multiline
                rows="3"
                value={values.description}
                onChange={handleChange('description')}
                className={classes.textField}
                margin="normal"
              />
              <br />
              <Typography
                type="subheading"
                component="h4"
                className={classes.subheading}
              >
                Owner: {values.owner}
              </Typography>
              <br />
              {values.error && (
                <Typography component="p" color="error">
                  <Icon
                    color="error"
                    className={classes.error}
                  >
                    error
                  </Icon>
                  {values.error}
                </Typography>
              )}
            </CardContent>
            <CardActions>
              <Button
                color="primary"
                variant="contained"
                onClick={clickSubmit}
                className={classes.submit}
              >
                Update
              </Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={6} sm={6}>
          <MyProducts shopId={match.params.shopId} />
        </Grid>
      </Grid>
    </div>
  );
}

export default EditShop;
