import Razorpay from 'razorpay'
import User from '../models/userSchema.js'
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');
const express = require("express");
const Product = require("./product_schema")
const cors = require("cors")
const app = express();
app.use(express.urlencoded({ extended: true }))
app.use(cors())
const PORT = 8001;


const KEY_ID = process.env.KEY_ID;
const KEY_SECRET = process.env.KEY_SECRET;
const SECRET_KEY = process.env.SECRET_KEY;

const hashedPassword = async (pass) => {
    const salt = await bcrypt.genSalt(10);
    const hashPass = await bcrypt.hash(pass, salt);
    return hashPass;
}

const comparePassword = async (userPass, databasePass) => {
    const comparedPassword = await bcrypt.compare(userPass, databasePass);
    return comparedPassword;
}

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Get a list of products
 *     description: Get a list of all products.
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 */
app.get("/products",async(req,res)=>{
    try{
        const products=await Product.find({})
        res.json(products)
    }
    catch(e){
        res.json("error while fetching product list")
    }
})


/**
 * @swagger
 * /product/{product_id}:
 *   get:
 *     summary: Get product details by ID
 *     description: Get details of a product by its ID.
 *     parameters:
 *       - in: path
 *         name: product_id
 *         required: true
 *         schema:
 *           type: string
 *         description: Product ID
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Product not found
 */
app.get('/product/:product_id', async (req, res) => {
    try{
      const productDetail = await Product.findById(req.params.product_id);
      res.json(productDetail)
    }
    catch(e){
        res.json("error fetching product detail")
    }
  });


  /**
 * @swagger
 * /orders:
 *   post:
 *     summary: Create a new order
 *     description: Create a new order for a product.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: number
 *                 description: Order amount
 *     responses:
 *       200:
 *         description: Order created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: string
 *                   description: Order created message
 *                 data:
 *                   $ref: '#/components/schemas/Order'
 *       500:
 *         description: Server error
 */
  app.post('/orders', async (req, res) => {
    try {
        let instance = new Razorpay({ key_id: KEY_ID, key_secret: KEY_SECRET })

        let options = {
            amount: req.body.amount * 100,
            currency: "INR"
        }

        instance.orders.create(options, function (err, order) {
            if (err) {
                return res.json({ error: "Server error" })
            } else {
                return res.json({ success: "order created", data: order })
            }
        })

    } catch (error) {
        res.status(500).json(error, "error while calling orders api")
    }

})


/**
 * @swagger
 * /verify:
 *   post:
 *     summary: Verify a payment
 *     description: Verify a payment using a signature.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               response:
 *                 type: object
 *                 properties:
 *                   razorpay_order_id:
 *                     type: string
 *                   razorpay_payment_id:
 *                     type: string
 *                   razorpay_signature:
 *                     type: string
 *           required:
 *             - response
 *     responses:
 *       200:
 *         description: Signature is valid
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: number
 *                   description: Status code (200)
 *                 message:
 *                   type: string
 *                   description: Successful message
 *       500:
 *         description: Signature is invalid
 */
app.post('/verify', async (req, res) => {
    try {
        let body = req.body.response.razorpay_order_id + "|" + req.body.response.razorpay_payment_id;

        var expectedSignature = crypto.createHmac('sha256', KEY_SECRET)
            .update(body.toString())
            .digest('hex');

        if (expectedSignature === req.body.response.razorpay_signature) {
            res.send({ code: 200, message: 'Sign Valid', });
        } else {

            res.send({ code: 500, message: 'Sign Invalid' });
        }
    } catch (error) {
        req.status(500).json(error, "error while calling verifyPayment api")
    }
})


/**
 * @swagger
 * /:
 *   post:
 *     summary: Add a product
 *     description: Add a new product to the database.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       200:
 *         description: Product added successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       500:
 *         description: Error while adding products
 */
app.post('/', async (req, res) => {
    try {
        const data = req.body;
        const products = new Product(data);
        await products.save();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json(error, 'error while adding products');
    }
})


/**
 * @swagger
 * /:
 *   get:
 *     summary: Get a list of products
 *     description: Get a list of all products from the database.
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       500:
 *         description: Error while getting the products
 */
app.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json(error, 'error while getting the products');
    }
})

/**
 * @swagger
 * /{id}:
 *   get:
 *     summary: Get product by ID
 *     description: Get a product by its ID from the database.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Product ID
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       500:
 *         description: Error while getting the product
 */
app.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findOne({ "id": id });
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json(error, "error while getting product")
    }
})


/**
 * @swagger
 * /cart:
 *   post:
 *     summary: Add a product to the cart
 *     description: Add a product to the user's cart.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 description: User ID
 *               id:
 *                 type: string
 *                 description: Product ID
 *     responses:
 *       200:
 *         description: Product added to the cart
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: string
 *                   description: Product added message
 *                 cart:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Product'
 *       500:
 *         description: Error while adding to the cart
 */
app.post('/cart', async (req, res) => {
    try {
        const { userId, id } = req.body;
        const user = await User.findById(userId);
        const item = await Product.findById(id)
        if (!user) {
            return res.json({ info: "Login to add products" })
        } else {
            user.cart.push(item);
            await user.save()
            return res.json({ success: "Product added", cart: user.cart })
        }
    } catch (error) {
        res.json(error, { error: "Something went wrong try again later" })
    }
})


/**
 * @swagger
 * /signup:
 *   post:
 *     summary: User registration
 *     description: Register a new user.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 description: First name of the user
 *               lastName:
 *                 type: string
 *                 description: Last name of the user
 *               username:
 *                 type: string
 *                 description: Username of the user
 *               email:
 *                 type: string
 *                 description: User's email
 *               password:
 *                 type: string
 *                 description: User's password
 *               phone:
 *                 type: string
 *                 description: User's phone number
 *     responses:
 *       200:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Registration message
 *                 username:
 *                   type: string
 *                   description: Registered username
 *       500:
 *         description: Error while signing up
 */
app.post('/signup', async (req, res) => {
    try {

        const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        const exist = await User.findOne({ username: req.body.username });
        if (exist) {
            return res.status(401).json({ message: "User already exist" });
        }
        else {
            const { firstName, lastName, username, email, password, phone } = req.body;
            if (!emailRegex.test(email)) {
                return res.json({ error: "Invalid email format" })
            }
            if (password.length < 6) {
                return res.json({ warning: "Password must be greater than 5 character" })
            }
            const hashedPass = await hashedPassword(password);
            const user = new User({
                password: hashedPass,
                firstName,
                lastName,
                username,
                email,
                phone
            })
            await user.save()
            return res.status(200).json({ message: "User registered successfully", username: user.username })
        }

    } catch (error) {
        res.status(500).json(error, "error while sining up the user ")
    }
})


/**
 * @swagger
 * /login:
 *   post:
 *     summary: User login
 *     description: Log in an existing user.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: User's email
 *               password:
 *                 type: string
 *                 description: User's password
 *     responses:
 *       200:
 *         description: User logged in successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Login message
 *                 token:
 *                   type: string
 *                   description: JWT token for authentication
 *                 userID:
 *                   type: string
 *                   description: User ID
 *                 username:
 *                   type: string
 *                   description: User's username
 *                 email:
 *                   type: string
 *                   description: User's email
 *       500:
 *         description: Error while logging in the user
 */
app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

        const user = await User.findOne({ email });
        if (!user) {
            return res.json({ error: "User doesnt exist please sign in" });
        }
        else {
            if (!password || password.length < 6) {
                return res.json({ warning: "Password must be greater than 5 character" })
            } else if (!emailRegex.test(email)) {
                return res.json({ email: "Invalid email format" })
            } else {
                const isValid = await comparePassword(password, user.password);
                if (!isValid) {
                    return res.json({ error: "Incorrect password" })
                } else {
                    const token = jwt.sign({ email: user.email, userID: user._id }, SECRET_KEY, { expiresIn: "1d" })
                    return res.json({ message: "Logged in successfully", token: token, userID: user._id, username: user.username, email: user.email })
                }
            }
        }
    } catch (error) {
        res.status(500).json(error, 'error while logging in the user');
    }
})


/**
 * @swagger
 * /verify:
 *   get:
 *     summary: Verify user
 *     description: Verify the user's status.
 *     responses:
 *       200:
 *         description: User is verified
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Verification message
 *       500:
 *         description: Error while verifying the user
 */
app.get('/verify', async (req, res) => {
    try {
        res.json({ message: "Verified user" })
    } catch (error) {
        res.json(error, "error while verifying the user");
    }
})


/**
 * @swagger
 * /verify:
 *   get:
 *     summary: Verify token
 *     description: Verify a user's authentication token.
 *     responses:
 *       200:
 *         description: Token is valid
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Verification message
 *       500:
 *         description: Error in token
 */
app.get('/verify', async (req, res, next) => {
    try {
        const token = req.cookies.access_token;
        if (!token) {
            return res.json({ error: "Token missing" });
        } else {
            jwt.verify(token, SECRET_KEY, (err) => {
                if (err) {
                    return res.json({ error: "Error in token" });
                } else {
                    next();
                }
            })
        }
    } catch (error) {
        res.json({ error: error.message, message: "Error while verifying the token" });
    }
})


/**
 * @swagger
 * /changePassword:
 *   put:
 *     summary: Change user password
 *     description: Change a user's password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: User's email
 *               password:
 *                 type: string
 *                 description: New password
 *               confirmPassword:
 *                 type: string
 *                 description: Confirm new password
 *     responses:
 *       200:
 *         description: Password changed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: string
 *                   description: Password change success message
 *       500:
 *         description: Error while changing the password
 */
app.put('/changePassword', async (req, res) => {
    try {
        const { email, password, confirmPassword } = req.body;
        if (password.length < 1 || confirmPassword.length < 1) {
            return res.json({ warning: "Password must be greater than 5 characters" })
        } else if (password !== confirmPassword) {
            return res.json({ warning: "Password is not same" })
        } else {
            const user = await User.findOne({ email });
            if (!user) {
                return res.json({ error: "User not exist" })
            } else {
                const hashedPass = await hashedPassword(confirmPassword)
                await User.findOneAndUpdate(user, {
                    email,
                    password: hashedPass
                })
                return res.json({ success: "Password changed successfully" })
            }
        }

    } catch (error) {
        res.status(500).json(error, "error while changing the password")
    }
})


/**
 * @swagger
 * /cart/{userID}:
 *   get:
 *     summary: Get user's cart
 *     description: Get the items in a user's cart.
 *     parameters:
 *       - in: path
 *         name: userID
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     responses:
 *       200:
 *         description: Cart items found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Items found message
 *                 cart:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Product'
 *       500:
 *         description: Error while getting the cart items
 */
app.get('/cart/:userID', async (req, res) => {
    try {
        const { userID } = req.params;
        const user = await User.findById(userID);
        if (!user) {
            return res.json({ error: "Login to get the cart items" });
        } else {
            return res.json({ message: "items found", cart: user?.cart })
        }
    } catch (error) {
        res.json(error, "error while getting the cart items");
    }
})


/**
 * @swagger
 * /:
 *   put:
 *     summary: Remove item from cart
 *     description: Remove an item from the user's cart.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               itemTitle:
 *                 type: string
 *                 description: Title of the item to remove
 *               userId:
 *                 type: string
 *                 description: User ID
 *     responses:
 *       200:
 *         description: Item removed from cart
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: string
 *                   description: Item removal success message
 *       500:
 *         description: Error while removing from cart
 */
app.put('/', async (req, res) => {
    try {
        const { itemTitle, userId } = req.body;
        const user = await User.findById(userId);
        if (!user) {
            return res.json({ error: "Login to delete the items" })
        }
        else {
            const { cart } = user;
            const itemIndex = cart.findIndex((item) => item.title.shortTitle === itemTitle)
            if (itemIndex >= 0) {
                cart.splice(itemIndex, 1);
                user.cart = cart;
                await user.save();
                return res.json({ success: "Removed from cart" });
            } else {
                return res.json({ error: "Item not found in the cart" });
            }
        }
    } catch (error) {
        res.json(error, "error while removing from cart")
    }
})


/**
 * @swagger
 * /removeAll:
 *   put:
 *     summary: Remove all items from cart
 *     description: Remove all items from the user's cart.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 description: User ID
 *     responses:
 *       200:
 *         description: All items removed from the cart
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Items removal success message
 *                 cart:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Product'
 *       500:
 *         description: Error while removing from cart
 */
app.put('/removeAll', async (req, res) => {
    try {
        const { userId } = req.body;
        const user = await User.findById(userId);
        if (!user) {
            return res.json({ error: "User not found" })
        } else {
            await User.findByIdAndUpdate(user._id, {
                cart: []
            })
            return res.json({ message: "Removed all", cart: user.cart })
        }
    } catch (error) {
        res.status(500).json(error, "error while removing from cart")
    }
})


app.listen(PORT, ()=>
    console.log(`Server Started on Port ${PORT}`)
)
