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

export { listByShop };
