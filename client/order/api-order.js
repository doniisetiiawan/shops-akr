const create = async (
  params,
  credentials,
  order,
  token,
) => {
  try {
    const response = await fetch(
      `/api/orders/${params.userId}`,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${credentials.t}`,
        },
        body: JSON.stringify({ order, token }),
      },
    );
    return response.json();
  } catch (err) {
    console.log(err);
  }
};

const listByShop = async (params, credentials, signal) => {
  try {
    const response = await fetch(
      `/api/orders/shop/${params.shopId}`,
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

const update = async (params, credentials, product) => {
  try {
    const response = await fetch(
      `/api/order/status/${params.shopId}`,
      {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${credentials.t}`,
        },
        body: JSON.stringify(product),
      },
    );
    return response.json();
  } catch (err) {
    console.log(err);
  }
};

const cancelProduct = async (
  params,
  credentials,
  product,
) => {
  try {
    const response = await fetch(
      `/api/order/${params.shopId}/cancel/${params.productId}`,
      {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${credentials.t}`,
        },
        body: JSON.stringify(product),
      },
    );
    return response.json();
  } catch (err) {
    console.log(err);
  }
};

const processCharge = async (
  params,
  credentials,
  product,
) => {
  try {
    const response = await fetch(
      `/api/order/${params.orderId}/charge/${params.userId}/${params.shopId}`,
      {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${credentials.t}`,
        },
        body: JSON.stringify(product),
      },
    );
    return response.json();
  } catch (err) {
    console.log(err);
  }
};

const getStatusValues = async (signal) => {
  try {
    const response = await fetch(
      '/api/order/status_values',
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

const listByUser = async (params, credentials, signal) => {
  try {
    const response = await fetch(
      `/api/orders/user/${params.userId}`,
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

const read = async (params, credentials, signal) => {
  try {
    const response = await fetch(
      `/api/order/${params.orderId}`,
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

export {
  listByShop,
  getStatusValues,
  update,
  cancelProduct,
  processCharge,
  read,
  create,
  listByUser,
};
