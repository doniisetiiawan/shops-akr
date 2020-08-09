import queryString from 'query-string';

const create = async (params, credentials, product) => {
  try {
    const response = await fetch(
      `/api/products/by/${params.shopId}`,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${credentials.t}`,
        },
        body: product,
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
      `/api/products/${params.productId}`,
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

const update = async (params, credentials, product) => {
  try {
    const response = await fetch(
      `/api/product/${params.shopId}/${params.productId}`,
      {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${credentials.t}`,
        },
        body: product,
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
      `/api/product/${params.shopId}/${params.productId}`,
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

const listByShop = async (params, signal) => {
  try {
    const response = await fetch(
      `/api/products/by/${params.shopId}`,
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

const listLatest = async (signal) => {
  try {
    const response = await fetch('/api/products/latest', {
      method: 'GET',
      signal,
    });
    return response.json();
  } catch (err) {
    console.log(err);
  }
};

const listRelated = async (params, signal) => {
  try {
    const response = await fetch(
      `/api/products/related/${params.productId}`,
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

const listCategories = async (signal) => {
  try {
    const response = await fetch(
      '/api/products/categories',
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

const list = async (params) => {
  const query = queryString.stringify(params);
  try {
    const response = await fetch(`/api/products?${query}`, {
      method: 'GET',
    });
    return response.json();
  } catch (err) {
    console.log(err);
  }
};

export {
  create,
  listByShop,
  listLatest,
  read,
  listRelated,
  update,
  remove,
  list,
  listCategories,
};
