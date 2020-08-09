import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Redirect } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { listOpen } from './api-auction';
import Auctions from './auctions';

const useStyles = makeStyles((theme) => ({
  root: theme.mixins.gutters({
    maxWidth: 600,
    margin: 'auto',
    padding: theme.spacing(3),
    marginTop: theme.spacing(5),
  }),
  title: {
    margin: `${theme.spacing(1)}px 0 4px ${theme.spacing(
      1,
    )}px`,
    color: theme.palette.protectedTitle,
    fontSize: '1.2em',
  },
  addButton: {
    float: 'right',
  },
  leftIcon: {
    marginRight: '8px',
  },
}));

function OpenAuctions() {
  const classes = useStyles();
  const [auctions, setAuctions] = useState([]);
  const [redirectToSignin, setRedirectToSignin] = useState(
    false,
  );

  useEffect(() => {
    const abortController = new AbortController();
    const { signal } = abortController;
    listOpen(signal).then((data) => {
      if (data.error) {
        setRedirectToSignin(true);
      } else {
        setAuctions(data);
      }
    });
    return function cleanup() {
      abortController.abort();
    };
  }, []);

  const removeAuction = (auction) => {
    const updatedAuctions = [...auctions];
    const index = updatedAuctions.indexOf(auction);
    updatedAuctions.splice(index, 1);
    setAuctions(updatedAuctions);
  };

  if (redirectToSignin) {
    return <Redirect to="/signin" />;
  }

  return (
    <div>
      <Paper className={classes.root} elevation={4}>
        <Typography type="title" className={classes.title}>
          All Auctions
        </Typography>
        <Auctions
          auctions={auctions}
          removeAuction={removeAuction}
        />
      </Paper>
    </div>
  );
}

export default OpenAuctions;
