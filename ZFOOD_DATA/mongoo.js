const { time, timeStamp } = require("console");
const mongoose = require("mongoose");
const { type } = require("os");

mongoose.connect("mongodb+srv://basantchouhan222_db_user:8czbChwJFAlc3hFf@clustersumit11.wwutvjq.mongodb.net/ClusterSumit11")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

const UserSchema = new mongoose.Schema({
  Name: { type: String, required: true },
  Password: { type: String, required: true },
  Mail: { type: String, required: true },
  Phone: { type: Number, required: true },
  Address: { type: String },
  
} ,{ timestamps:true});

const AdminSchema = new mongoose.Schema({

  AdminName: {type: String, required: true},
  AdminPassword: {type: String, required: true},
  AdminMail: {type: String, required: true},
  AdminPhone: {type: Number, required: true},
  AdminAddress: {type: String, required: true},

},{timestamps:true});

const ProductSchema = new mongoose.Schema({
  Productname :{type :String , required :true},
  Category :{type: String , required: true },
  Discription :{type: String , required :true},
  Qty : {type:String , required : true},
  Photo : {type:Array , required : true},
  Price : {type: Number , required : true},
  Food : {type:String , required : true},
  slug: { type: String,required: true, unique: true }
},{timestamps : true});


const OrderSchema = new mongoose.Schema({
  products: [
    {
      _id: String,
      Productname: String,
      Price: Number,
      qty: Number,
      Photo: Array
    }
  ],
  totalAmount: { type: Number, required: true },
  user: { type: String, required: true }
},{ timestamps: true });
const Order = mongoose.model("Order", OrderSchema);
const User = mongoose.model("User", UserSchema);
const Admin = mongoose.model("Admin", AdminSchema);
const Product = mongoose.model("Product", ProductSchema);
module.exports = { User , Admin , Product, Order}