var express = require('express');
var router = express.Router();
var productHelper = require('../helpers/product-helpers')

/* GET users listing. */
router.get('/', function(req, res, next) {
  let products=[
    {
      name: "IPhone 11 Pro",
      category: "Mobile",
      description: "This is a good phone",
      image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-11-pro-select-2019-family?wid=882&amp;hei=1058&amp;fmt=jpeg&amp;qlt=80&amp;op_usm=0.5,0.5&amp;.v=1586586488946"
    },
    {
      name: "Oppo Reno 4",
      category: "Mobile",
      description:"This is also a good phone",
      image: "https://i.gadgets360cdn.com/products/large/oppo-2-652x675-1591427929.jpg"

    },
    {
      name: "POCO X3",
      category: "Mobile",
      description: "This is also a good phone",
      image: "https://mikqs.com/wp-content/uploads/2020/09/Xiaomi-Poco-X3.png"

    },
    {
      name: "Realme V5",
      category: "Mobile",
      description: "This is also a good phone",
      image: "https://cdn1.smartprix.com/rx-iEvD0NonZ-w1200-h1200/realme-v5.jpg"
    }
  ]
  res.render('admin/view-products',{admin:true,products})
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

module.exports = router;
