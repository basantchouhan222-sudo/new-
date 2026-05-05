const express = require("express");
const Router = express.Router();
const { User, Admin, Product , Order} = require("./mongoo");
const slugify = require("slugify")

// Create User
Router.post("/data", async (req, res) => {
  try {
    const newUser = await User.create(req.body);

    res.status(201).json({
      status: true,
      message: "User Created Successfully",
      data: newUser
    });

  } catch (err) {
    res.status(500).json({
      status: false,
      message: err.message  
    });
  }
});


Router.get("/data", async (req,res) => {
  try{
    const UserData = await User.find()
    res.json(UserData);
  }catch(err){
    res.status(500).json({message:err.message})
  }
})
Router.get("/datas/:id" ,async(req,res)=>{
  try{
    const UserID = await User.findById(req.params.id)
    if(!UserID)
      return res.status(404).json({
        status: false,
        message : "User not Found"
      })
      res.status(200).json({
        status : true ,
        data : UserID,
        message : " Data available"
      })
  }
  catch(err){
    res.status(500).json({
      status:false,
      message : err.message
    })
  }
})
Router.patch("/data/:id", async(req,res)=>{
  try{
    const UserUpdate = await User.findOneAndUpdate({
      _id : req.params.id},
      req.body,
      {
        returnDocument : "after",
        runValidators : true
      }
    )
    res.json({
      status : true,
      message : "User Detail Upadate ",
      data : UserUpdate
    })

  }
  catch(err){
    res.json({
      status :false,
      message : err.message
    })
  }
})
Router.delete("/User/:id", async (req,res)=>{
  try{
    const DataDelete = await User.findByIdAndDelete(req.params.id)
    res.json({
      status : true,
      data : DataDelete,
      message : "User Delete"
    })

  }catch(err){
    res.json({
      status : false,
      message : "NetWork Ishu"
    })

  }
})
// Create Admin Admin
Router.post("/admin", async (req,res) =>{
  try{
    const newAdmin = await Admin.create(req.body);

    res.status(201).json({
      status:true,
      message: "Admin Created Successfully",
      data: newAdmin
    });

  } catch(err){
    res.status(500).json({
      status :false,
      message: err.message   
    });
  }
})
//Get Admin data 
Router.get("/admin", async (req,res)=>{
  try{
    const admins = await Admin.find();
    res.json(admins);
  }catch(err){
    res.status(500).json({message:err.message})
  }
})
Router.post("/product", async (req,res) =>{
  try{

    const slug = slugify(req.body.Productname, {
      lower: true,
      strict: true
    });

    const ProductData = await Product.create({
      ...req.body,
      slug: slug
  });

    res.status(201).json({
      status: true,
      message :"Product Listed Successfully",
      data : ProductData
    });

  }catch(err){
    res.status(500).json({
      status :false,
      message :err.message
    })
  }
});
Router.get("/product",async (req,res)=>{
  try{
    const Productlist = await Product.find();

    res.json({
      status: true,
      data: Productlist
    });

  }catch(err){
    res.status(500).json({
      status:false,
      message :err.message
    })
  }
});
// data ke ander se id se data nikal na 
Router.get("/product/:idslug",async(req,res)=>{
  try{
    const idslug =  req.params.idslug;
    const Id = idslug.split("-")[0]
    const ProductID = await Product.findById(Id)
    if(!ProductID)
      return res.status(404).json({
    status :false,
    message : "Product not found"
    } )
     res.status(200).json({
      status : true,
      data : ProductID,
      message : "Product"
    })
  }
  catch(err){
    res.status(500).json({
      status : false,
      message : err.message
    })
  }
})
Router.patch("/product/:id", async (req, res) => {
  try {

    const EditData = await Product.findByIdAndUpdate(
      req.params.id,   
      req.body,        
      {
        new: true,
        runValidators: true
      }
    );

    if (!EditData) {
      return res.status(404).json({
        status: false,
        message: "Product not found"
      });
    }

    res.json({
      status: true,
      message: "Product Updated Successfully",
      data: EditData
    });

  } catch (err) {
    res.status(500).json({
      status: false,
      message: err.message
    });
  }
});
Router.delete("/Product/:id",async (req,res)=>{
  try{
    const DeteltData = await Product.findByIdAndDelete(req.params.id)
    res.json({
      status : true,
      data : DeteltData,
      message : "Data Delete"
    })

  }catch(err){
    res.json({
      status : false,
      message : err.message
    })
  }
})
Router.post("/order", async (req, res) => {
  try {
    const newOrder = await Order.create(req.body);

    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      data: newOrder
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
});


module.exports = Router;