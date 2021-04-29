const fetch = require("node-fetch");
const configuration = require("../config");
const ItemModel = require("../models/item.model");

const findByQuery = async (q, limit = 4) => {
  if (q === "") {
    throw new Error("The Query must not be empty");
  }
  // Fetch
  const response = await fetch(
    `${configuration.MELI_API}/sites/MLA/search?` +
      new URLSearchParams({
        q: q,
        limit: limit,
      })
  );
  // Data
  const data = await response.json();
  // Items
  const items = data.results ? data.results : [];
  const itemsMap = items.map((item) => new ItemModel(item));
  // Categories
  const filters = data.filters ? data.filters : [];
  const categoriesFilters = filters.find((filter) => filter.id === "category");
  let categories = [];
  if (categoriesFilters) {
    categories = categoriesFilters.values.map(cat => cat.name);
  }
  return { items: itemsMap, categories };
};

const getItemById = async (id) => {
  if (!id) {
    throw new Error("The ID must not be empty");
  }
  // Item
  const responseItem = await fetch(`${configuration.MELI_API}/items/${id}`);
  const dataItem = await responseItem.json();
  // Description
  const description = await getItemDescription(id);
  const item = new ItemModel(dataItem, description);
  if (!item.id) {
    throw new Error("Item doesnt exist");
  }
  return item;
};
const getItemDescription = async (id) => {
  const response = await fetch(
    `${configuration.MELI_API}/items/${id}/description`
  );
  const data = await response.json();
  return data;
};

// exports
exports.findByQuery = findByQuery;
exports.getItemById = getItemById;
