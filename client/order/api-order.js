const create = (params, credentials, order, token) => fetch(`/api/orders/${params.userId}`, {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `Bearer ${credentials.t}`,
  },
  body: JSON.stringify({ order, token }),
})
  .then((response) => response.json())
  .catch((err) => console.log(err));

const listByShop = (params, credentials) => fetch(`/api/orders/shop/${params.shopId}`, {
  method: 'GET',
  headers: {
    Accept: 'application/json',
    Authorization: `Bearer ${credentials.t}`,
  },
})
  .then((response) => response.json())
  .catch((err) => {
    console.log(err);
  });

const update = (params, credentials, product) => fetch(`/api/order/status/${params.shopId}`, {
  method: 'PUT',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `Bearer ${credentials.t}`,
  },
  body: JSON.stringify(product),
})
  .then((response) => response.json())
  .catch((err) => {
    console.log(err);
  });

const cancelProduct = (params, credentials, product) => fetch(
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
)
  .then((response) => response.json())
  .catch((err) => {
    console.log(err);
  });

const processCharge = (params, credentials, product) => fetch(
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
)
  .then((response) => response.json())
  .catch((err) => {
    console.log(err);
  });

const getStatusValues = () => fetch('/api/order/status_values', {
  method: 'GET',
})
  .then((response) => response.json())
  .catch((err) => console.log(err));

const listByUser = (params, credentials) => fetch(`/api/orders/user/${params.userId}`, {
  method: 'GET',
  headers: {
    Accept: 'application/json',
    Authorization: `Bearer ${credentials.t}`,
  },
})
  .then((response) => response.json())
  .catch((err) => {
    console.log(err);
  });

const read = (params) => fetch(`/api/order/${params.orderId}`, {
  method: 'GET',
})
  .then((response) => response.json())
  .catch((err) => console.log(err));

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
