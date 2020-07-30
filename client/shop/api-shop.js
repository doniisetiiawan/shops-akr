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

const list = () => fetch('/api/shops', {
  method: 'GET',
})
  .then((response) => response.json())
  .catch((err) => console.log(err));

const listByOwner = (params, credentials) => fetch(`/api/shops/by/${params.userId}`, {
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

const read = (params) => fetch(`/api/shop/${params.shopId}`, {
  method: 'GET',
})
  .then((response) => response.json())
  .catch((err) => console.log(err));

export {
  create, list, listByOwner, read,
};
