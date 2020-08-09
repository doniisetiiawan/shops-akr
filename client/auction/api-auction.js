const create = async (params, credentials, auction) => {
  try {
    const response = await fetch(
      `/api/auctions/by/${params.userId}`,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${credentials.t}`,
        },
        body: auction,
      },
    );
    return response.json();
  } catch (err) {
    console.log(err);
  }
};

const listOpen = async (signal) => {
  try {
    const response = await fetch('/api/auctions', {
      method: 'GET',
      signal,
    });
    return response.json();
  } catch (err) {
    console.log(err);
  }
};

const listBySeller = async (
  params,
  credentials,
  signal,
) => {
  try {
    const response = await fetch(
      `/api/auctions/by/${params.userId}`,
      {
        method: 'GET',
        signal,
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${credentials.t}`,
        },
      },
    );
    return response.json();
  } catch (err) {
    console.log(err);
  }
};

const listByBidder = async (
  params,
  credentials,
  signal,
) => {
  try {
    const response = await fetch(
      `/api/auctions/bid/${params.userId}`,
      {
        method: 'GET',
        signal,
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${credentials.t}`,
        },
      },
    );
    return response.json();
  } catch (err) {
    console.log(err);
  }
};

const read = async (params, signal) => {
  try {
    const response = await fetch(
      `/api/auction/${params.auctionId}`,
      {
        method: 'GET',
        signal,
      },
    );
    return response.json();
  } catch (err) {
    console.log(err);
  }
};

const update = async (params, credentials, auction) => {
  try {
    const response = await fetch(
      `/api/auctions/${params.auctionId}`,
      {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${credentials.t}`,
        },
        body: auction,
      },
    );
    return response.json();
  } catch (err) {
    console.log(err);
  }
};

const remove = async (params, credentials) => {
  try {
    const response = await fetch(
      `/api/auctions/${params.auctionId}`,
      {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${credentials.t}`,
        },
      },
    );
    return response.json();
  } catch (err) {
    console.log(err);
  }
};

export {
  create,
  listOpen,
  listBySeller,
  listByBidder,
  read,
  update,
  remove,
};
