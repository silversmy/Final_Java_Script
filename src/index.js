const express = require("express");
const env = require("./config/env");
const { logger, authorize } = require("./middleware/auth");
const userRouter = require("./routes/user.routes");
const sequelize = require("./config/sequelize");
// const { Sequelize, DataTypes } = require("sequelize");


// const aToken = require("./config/jwt");

const app = express();
app.use(express.json());
app.use('/users', userRouter);
app.use(logger);


// const users = [
//   {
//     "id": 1,
//     "firstName": "John",
//     "lastName": "Doe",
//     "email": "john.doe@example.com",
//     "age": 25,
//     "role": "user",
//     "country": "Nigeria",
//     "gender": "Male",
//     "phoneNumber": "+2348012345678",
//     "isActive": true,
//     "createdAt": "2026-08-13T10:00:00.000Z",
//     "updatedAt": "2026-08-13T10:00:00.000Z"
//   },
//   {
//     "id": 2,
//     "firstName": "Jane",
//     "lastName": "Smith",
//     "email": "jane.smith@example.com",
//     "age": 28,
//     "role": "admin",
//     "country": "United States",
//     "gender": "Female",
//     "phoneNumber": "+12025550123",
//     "isActive": true,
//     "createdAt": "2026-08-12T14:30:00.000Z",
//     "updatedAt": "2026-08-12T14:30:00.000Z"
//   },
//   {
//     "id": 3,
//     "firstName": "Michael",
//     "lastName": "Johnson",
//     "email": "michael.johnson@example.com",
//     "age": 31,
//     "role": "moderator",
//     "country": "Canada",
//     "gender": "Male",
//     "phoneNumber": "+14165550123",
//     "isActive": false,
//     "createdAt": "2026-08-11T09:15:00.000Z",
//     "updatedAt": "2026-08-13T08:20:00.000Z"
//   }
// ];

// app.get("/users", async(req, res) => {
//   const id = req.query.id;
//   const email = req.query.email;
//   let user;

//   if (id) {
//     // user = users.find((user) => user.id === parseInt(id));
//     user = await User.findOne({
//       where: { id },
//     });
//     if (!user) {
//       return res.json({ error: `user with id: ${id} not found` });
//     }
//     return res.json({ messages: "user fetched  successfully", user });
//   } else if (email) {
//     // user = users.find((user) => user.email === email);
//     user = await User.findOne({ where: {email} });
//         if (!user) {
//       return res.json({ error: `user with email: ${email} not found` });
//     }
//     return res.json({ messages: "user fetched  successfullyyyyy", user });
//   }
//   const allUsers = await User.findAll();
//   return res.json({ message: "users fetched successfully", allUsers });
// });


// const authorize = (req, res, next) =>{
//   const token = req.headers.authorization.split(" ")[1];

//        if(!token){
//         return res.status(401).json({error: "Unauthorized"});
//        }

//        const decoded = jwt.verify(token, "jwt-secret");
//        req.user = decoded;
//        next();
//  };


// app.post("/login", async (req, res) => {
//   const { email, password } = req.body;

//   if (!email || !password) {
//     return res.status(400).json({ message: "Please all fields are required" });
//   }

//   const userExixts = await User.findOne({ where: { email } });

//   if (!userExixts)
//     return res.status(400).json({ error: "User does not exists" });

//   const checkPassword = await bcrypt.compare(password, userExixts.password);

//   if (!checkPassword) {
//     return res.status(403).json({ message: "Incorrect credentials" });
//   }

//   const token = jwt.sign(
//     { id: userExixts.id, email: userExixts.email },
//     "jwt-secret",
//     {
//       expiresIn: '1h'
//     }
//   );


//   const { password: pass, ...safeUser } = userExixts.dataValues;

//   return res
//     .status(200)
//     .json({ message: "user logged in successfully", user: safeUser, token });
// });

// app.post("/users/bulk", async (req, res) => {
//   const newUsers = req.body;

//   if (!Array.isArray(newUsers) || newUsers.length === 0) {
//     return res.status(400).json({
//       message: "Please input users"
//     });
//   }

//   const users = await User.bulkCreate(newUsers);

//   return res
//     .status(201)
//     .json({
//       message: "Users added successfully",
//       users
//     });
// });
// app.patch("/user/:id", async (req, res) => {
//   const { firstName, lastName, email, password } = req.body;
//   const { id } = req.params;

//   const user = await User.findByPk(id);

//   if (!user) {
//     return res.status(404).json({
//       error: `User with ${id} not found`
//     });
//   }
//   if (firstName !== undefined) user.firstName = firstName;
//   if (lastName !== undefined) user.lastName = lastName;
//   if (email !== undefined) user.email = email;
//   if (password !== undefined) user.password = await bcrypt.hash(password, 10);
  
//   await user.save();

//   return res.status(200).json({
//     message: "User updated successfully", user
//   });

// });

// app.patch("/users/bulk", async (req, res) => {

//   const users = req.body;

//   if (!Array.isArray(users) || users.length === 0) {
//     return res.status(400).json({
//       message: "Please input users"
//     });
//   }

//   for (const userData of users) {

//     const { id, firstName, lastName, email, password } = userData;

//     const user = await User.findByPk(id);

//     if (!user) {
//       continue;
//     }

//     if (firstName !== undefined) user.firstName = firstName;

//     if (lastName !== undefined) user.lastName = lastName;

//     if (email !== undefined) user.email = email;

//     if (password !== undefined) user.password = await bcrypt.hash(password, 10);
  

//     await user.save();
//   }

//   return res.status(200).json({
//     message: "Users updated successfully"
//   });
// });

// app.delete("/user/:id", async (req, res) => {
//   const { id } = req.params;

//   const user = await User.findByPk(id);

//   if (!user) {
//     return res.status(404).json({
//       error: `User with ${id} not found`
//     });
//   }

//   await user.destroy();

//   return res.status(200).json({
//     message: "User deleted successfully"
//   });
// });

// app.delete("/users/bulk", async (req, res) => {

//   const { ids } = req.body;

//   if (!Array.isArray(ids) || ids.length === 0) {
//     return res.status(400).json({
//       message: "Please input user ids"
//     });
//   }

//   const deletedUsers = await User.destroy({
//     where: {
//       id: ids
//     }
//   });

//   return res.status(200).json({
//     message: "Users deleted successfully",
//     deletedUsers
//   });

// });

// app.put("/user/:id", async (req, res) => {
//   const { firstName, lastName, email, password } = req.body;
//   const { id } = req.params;

//   const user = await User.findByPk(id);

//   if (!user) {
//     return res.status(404).json({
//       error: `User with ${id} not found`
//     });
//   }

//   if (!firstName || !lastName || !email || !password) {
//     return res.status(400).json({
//       message: "Please all fields are required"
//     });
//   }

//   const hashedPassword = await bcrypt.hash(password, 10);

//   user.firstName = firstName;
//   user.lastName = lastName;
//   user.email = email;
//   user.password = hashedPassword;

//   await user.save();

//   return res.status(200).json({
//     message: "User replaced successfully",
//     user
//   });
// });

// app.put("/users/bulk", async (req, res) => {

//   const users = req.body;

//   if (!Array.isArray(users) || users.length === 0) {
//     return res.status(400).json({
//       message: "Please input users"
//     });
//   }

//   for (const userData of users) {

//     const { id, firstName, lastName, email, password } = userData;

//     if (!id || !firstName || !lastName || !email ||!password) {
//       continue;
//     }

//     const user = await User.findByPk(id);

//     if (!user) {
//       continue;
//     }
//     const hashedPassword = await bcrypt.hash(password, 10);

//     user.firstName = firstName;
//     user.lastName = lastName;
//     user.email = email;
//     user.password = hashedPassword;

//     await user.save();
//   }

//   return res.status(200).json({
//     message: "Users replaced successfully"
//   });
// });
// // const Product = sequelize.define('Products', {
//   id: {
//     type: DataTypes.INTEGER,
//     autoIncrement: true,
//     primaryKey: true,
//     allowNull: false,
//   },
//   name: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   price: {
//     type: DataTypes.FLOAT,
//     allowNull: false,
//   },
//   category: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   stock: {
//     type: DataTypes.INTEGER,
//     allowNull: false,
//   },
//   rating: {
//     type: DataTypes.FLOAT,
//     allowNull: false,
//   },
// });

// GET /products - list all, or filter by price / name
// app.get('/products', async (req, res) => {
//   try {
//     const { price, name } = req.query;
//     let product;

//     if (price) {
//       product = await Product.findAll({ where: { price: parseFloat(price) } });

//       if (!product) {
//         return res.status(404).json({ error: 'no product found' });
//       }

//       return res.status(200).json({ product });
//     } else if (name) {
//       product = await Product.findAll({ where: { name } });

//       if (!product) {
//         return res.status(404).json({ error: 'no product found' });
//       }

//       return res.status(200).json({ product });
//     }

//     product = await Product.findAll();
//     return res
//       .status(200)
//       .json({ message: 'products fetched successfully', product });
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({ error: 'something went wrong fetching products' });
//   }
// });

// // POST /product - create a single product
// app.post('/products', async (req, res) => {
//   try {
//     const { name, price, category, stock, rating } = req.body;

//     if (
//       name === undefined ||
//       price === undefined ||
//       category === undefined ||
//       stock === undefined ||
//       rating === undefined
//     ) {
//       return res.status(400).json({ message: 'Please all fields are required' });
//     }

//     const newProduct = { name, price, category, stock, rating };
//     const product = await Product.create(newProduct);

//     return res
//       .status(201)
//       .json({ message: 'New Product added successfully', product });
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({ error: 'something went wrong creating the product' });
//   }
// });

// // POST /products/bulk - create many products at once
// app.post('/products/bulk', async (req, res) => {
//   try {
//     const newProducts = req.body;

//     if (!Array.isArray(newProducts) || newProducts.length === 0) {
//       return res.status(400).json({ message: 'please input a value' });
//     }

//     const productsWithDefaults = newProducts.map((p) => ({
//       ...p,
//       rating: p.rating ?? 0,
//     }));

//     const products = await Product.bulkCreate(productsWithDefaults);

//     return res
//       .status(201)
//       .json({ message: 'bulk product added successfully', products });
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({ error: 'something went wrong bulk-creating products' });
//   }
// });

// // PATCH /product/:id - partial update (name, price)
// app.patch('/product/:id', async (req, res) => {
//   try {
//     const { name, price } = req.body;
//     const { id } = req.params;

//     if (name === undefined || price === undefined) {
//       return res.status(400).json({ message: 'all field are required' });
//     }

//     const foundProduct = await Product.findByPk(id);

//     if (!foundProduct) {
//       return res.status(404).json({ error: 'product not found' });
//     }

//     foundProduct.name = name;
//     foundProduct.price = price;
//     await foundProduct.save();

//     return res
//       .status(200)
//       .json({ message: `product with id - ${id} has been updated`, foundProduct });
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({ error: 'something went wrong updating the product' });
//   }
// });

// // PUT /product/:id - full update
// app.put('/product/:id', async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { name, category, price, stock, rating } = req.body;

//     if (
//       name === undefined ||
//       price === undefined ||
//       category === undefined ||
//       stock === undefined ||
//       rating === undefined
//     ) {
//       return res.status(400).json({ message: 'Please all fields are required' });
//     }

//     const foundProduct = await Product.findByPk(id);

//     if (!foundProduct) {
//       return res.status(404).json({ error: 'product not found' });
//     }

//     foundProduct.name = name;
//     foundProduct.category = category;
//     foundProduct.price = price;
//     foundProduct.stock = stock;
//     foundProduct.rating = rating;
//     await foundProduct.save();

//     return res
//       .status(200)
//       .json({ message: 'Product updated successfully', foundProduct });
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({ error: 'something went wrong updating the product' });
//   }
// });

// // DELETE /product/:id
// app.delete('/product/:id', async (req, res) => {
//   try {
//     const { id } = req.params;

//     const foundProduct = await Product.findByPk(id); 

//     if (!foundProduct) {
//       return res.status(404).json({ error: 'product not found' });
//     }

//     await foundProduct.destroy();

//     return res
//       .status(200)
//       .json({ message: 'product deleted successfully' });
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({ error: 'something went wrong deleting the product' });
//   }
// });

app.listen(4000, async () => {
    await sequelize.authenticate();
    console.log('Database has successfully established a connection');
    console.log('server is running');
});