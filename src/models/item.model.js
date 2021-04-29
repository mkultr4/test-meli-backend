module.exports = function (item, description = null) {
  this.id = item.id ? item.id : null;
  this.title = item.title ? item.title : null;
  this.picture = item.thumbnail ? item.thumbnail : null;
  this.condition = item.condition ? item.condition : null;
  this.free_shipping = item.shipping ? item.shipping.free_shipping : null;
  this.address = item.address ? item.address.state_name : null;
  // Price
  const price = {
    currency: "NONE",
    amount: 0,
    decimals: 0,
  };
  if (item.price) {
    const amountArray = item.price.toString().split(".");
    if (amountArray.length > 0) {
      price.amount = parseInt(amountArray[0]);
    }
    if (amountArray.length > 1) {
      price.decimals = parseInt(amountArray[1]);
    }
  }
  price.currency = item.currency_id ? item.currency_id : 0;
  this.price = price;
  // If Full Item
  if (description) {
    this.sold_quantity = item.sold_quantity;
    if (item.pictures && item.pictures.length >= 0) {
      this.picture = item.pictures[0].url;
    }
    this.description = description.plain_text ? description.plain_text : "";
  }
};
