const create = async (params, credentials, shop) => {
  try {
    const response = await fetch(
      `/api/shops/by/${params.userId}`,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${credentials.t}`,
        },
        body: shop,
      },
    );
    return response.json();
  } catch (err) {
    console.log(err);
  }
};

const list = async (signal) => {
  try {
    const response = await fetch('/api/shops', {
      method: 'GET',
      signal,
    });
    return response.json();
  } catch (err) {
    console.log(err);
  }
};

const listByOwner = async (params, credentials, signal) => {
  try {
    const response = await fetch(
      `/api/shops/by/${params.userId}`,
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
      `/api/shop/${params.shopId}`,
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

const update = async (params, credentials, shop) => {
  try {
    const response = await fetch(
      `/api/shops/${params.shopId}`,
      {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${credentials.t}`,
        },
        body: shop,
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
      `/api/shops/${params.shopId}`,
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
  create, list, listByOwner, read, update, remove,
};
