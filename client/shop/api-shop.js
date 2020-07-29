const create = (params, credentials, shop) => fetch(`/api/shops/by/${params.userId}`, {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    Authorization: `Bearer ${credentials.t}`,
  },
  body: shop,
})
  .then((response) => response.json())
  .catch((err) => console.log(err));

export { create };
