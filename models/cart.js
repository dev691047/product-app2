const fs=require('fs');
const path=require('path');

const p = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'cart.json'
  );


module.exports=class Cart{
  static addProducts(id,productPrice){
    //fetch the previous cart
    fs.readFile(p,(err,fileContent)=>{
        let cart={products:[],totalPrice:0};
        if(!err){
            cart=JSON.parse(fileContent);
        }
        //analyse the cart=>find existing product
        const existingProductIndex=cart.product.findbyIndex(prod=>prod.id===id);
        const existingProduct=cart.products[existingProductIndex];
        let updatedProduct;
        //add mnew product /increas3e quantity
        if(existingProduct){
         updatedProduct={...existingProduct};
         updatedProduct.qty=updatedProduct.qty+1;
         cart.products=[...cart.products];
         cart.products[existingProductIndex]=updatedProduct;
        }else{
            updatedProduct={id:id,qty:1};
            cart.products={...cart.products,updatedProduct};
        }
       cart.totalPrice=cart.totalPrice + +productPrice;
       fs.writeFile(p,JSON.stringify(cart),err=>{
        console.log(err);
       })
       
  
    })


    //analyse the cart => findthe existing  product
    
  }
}