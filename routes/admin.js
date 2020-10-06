var express = require('express');
const productHelpers = require('../helpers/product-helpers');
var router = express.Router();
var productHelper = require('../helpers/product-helpers')

/* GET users listing. */
router.get('/', function(req, res, next) {
  productHelpers.getAllProducts().then((products)=>{
    console.log(products);
    res.render('admin/view-products',{admin:true,products})
  })
});

router.get('/add-product',(req,res)=>{
  res.render('admin/add-product')
})

router.post('/add-product',(req,res)=>{

  productHelper.addProduct(req.body,(id)=>{
    let image = req.files.Image
    image.mv('./public/product-images/'+id+'.jpg',(err,done)=>{
      if(!err){
        res.render("admin/add-product")
      }
      else{
        console.log(err);
      }
    })

  })
})

router.get("/delete-product/:id",(req,res)=>{
  let proId = req.params.id
  console.log(proId);
  productHelpers.deleteProduct(proId).then((response)=>{
    res.redirect("/admin/")
  })

})

router.get("/edit-product/:id",async (req,res)=>{
  let product = await productHelpers.getAllProductDetails(req.params.id)
  console.log(product);
  res.render("admin/edit-product",{product})
})

module.exports = router;
