// const sequelize = require('../DB');
const Cart = require("./Cart");
const User = require("./User");
const Product = require("./Product");

// User.hasOne(Post); //Один к одному(выводит один связанный элемент)
// Post.belongsTo(User);
// Post.hasMany(User); //Один ко многим(выводит все связанные элементы)
// User.belongsTo(Post);

// User.belongsToMany(Post, {through: 'UserPost'});
// Post.belongsToMany(User, {through: 'UserPost'});

const init = async () => {
  // await sequelize.sync({alter: true});
  await Cart.sync({ alter: true });
  await User.sync({ alter: true });
  await Product.sync({ alter: true });
};

module.exports = { init, Cart, User, Product };
