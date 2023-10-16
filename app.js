const express = require("express");
const Product = require("./product_schema")
const cors = require("cors")
const app = express();
app.use(express.urlencoded({ extended: true }))
app.use(cors())
const PORT = 8001;



app.get("/products",async(req,res)=>{
    try{
        const products=await Product.find({})
        res.json(products)
    }
    catch(e){
        res.json("error while fetching product list")
    }
})

app.get('/product/:product_id', async (req, res) => {
    try{
      const productDetail = await Product.findById(req.params.product_id);
      res.json(productDetail)
    }
    catch(e){
        res.json("error fetching product detail")
    }
  });




app.listen(PORT, ()=>
    console.log(`Server Started on Port ${PORT}`)
)
