const express = require("express");
const cors = require("cors");
const session = require("express-session");
const body_parser = require("body-parser");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const cookieParser = require("cookie-parser");
const app = express();

app.use(body_parser.urlencoded({ extended: false }));
app.use(body_parser.json());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("uploads"));
app.use(cookieParser());

const options = {
  definition: {
      openapi: "3.1.0",
      info: {
          title: "LogRocket Express API with Swagger",
          version: "0.1.0",
          description:
              "This is a simple CRUD API application made with Express and documented with Swagger",
          license: {
              name: "MIT",
              url: "https://spdx.org/licenses/MIT.html",
          },
          contact: {
              name: "LogRocket",
              url: "https://logrocket.com",
              email: "info@email.com",
          },
      },
      servers: [
          {
              url: "http://localhost:3000",
          },
      ],
  },
  apis: ["./routes/*.js"],
};
const specs = swaggerJsdoc(options);


app.use(
  session({
    secret: "1234567890abcdefghijklmnopqrstuvwxyz",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

app.use("/api/products", require("./routes/productRouter"));
app.use("/api/auth", require("./routes/authRouter"));

//api
app.get("/api", (req, res) => {
  res.json({
    success: 1,
    message: "This is api",
  });
});

app.get("/", (request, response) => {
  const query = `SELECT * FROM product LIMIT 3`;

  //Execute Query
  connection.query(query, (error, result) => {
    if (!request.session.cart) {
      request.session.cart = [];
    }

    response.render("product", {
      products: result,
      cart: request.session.cart,
    });
  });
});

//Create Route for Add Item into Cart
app.post("/add_cart", (request, response) => {
  const product_id = request.body.product_id;

  const product_name = request.body.product_name;

  const product_price = request.body.product_price;

  let count = 0;

  for (let i = 0; i < request.session.cart.length; i++) {
    if (request.session.cart[i].product_id === product_id) {
      request.session.cart[i].quantity += 1;

      count++;
    }
  }

  if (count === 0) {
    const cart_data = {
      product_id: product_id,
      product_name: product_name,
      product_price: parseFloat(product_price),
      quantity: 1,
    };

    request.session.cart.push(cart_data);
  }

  response.redirect("/");
});

//Create Route for Remove Item from Shopping Cart
app.get("/remove_item", (request, response) => {
  const product_id = request.query.id;

  for (let i = 0; i < request.session.cart.length; i++) {
    if (request.session.cart[i].product_id === product_id) {
      request.session.cart.splice(i, 1);
    }
  }

  response.redirect("/");
});

const options = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "LogRocket Express API with Swagger",
      version: "0.1.0",
      description:
        "This is a simple CRUD API application made with Express and documented with Swagger",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "LogRocket",
        url: "https://logrocket.com",
        email: "info@email.com",
      },
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const specs = swaggerJsdoc(options);
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(specs)
);

app.listen(3000, async () => {
  console.log(`server running at http://localhost:3000`);
});
