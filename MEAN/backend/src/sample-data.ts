import { Product } from "./models/product.model";
import { User } from "./models/user.model";
import bcrypt from "bcryptjs";

export const products: Product[] = [
  
  {
    name: "Azithromycin 500",
    slug: " tablets",
    category: "azicip  500",
    image: "../assets/images/azithromycin.png",
    description: "anti-biotics",
    brand: "cipal",
    price: 60,
    countInStock: 10,
    rating: 3.5,
    numReviews: 10,
    reviews: [],
  },
  {
    name: "p-250",
    slug: " syrup",
    category: "dolo 250",
    image: "../assets/images/p-250.png",
    description: "fever",
    brand: "micro labs limitied",
    price: 38.3,
    countInStock: 10,
    rating: 3.5,
    numReviews: 10,
    reviews: [],
  }
];

export const users: User[] = [
  {
    name: "Joe",
    email: "admin@example.com",
    password: bcrypt.hashSync("123456"),
    isAdmin: true,
  },
  {
    name: "John",
    email: "user@example.com",
    password: bcrypt.hashSync("123456"),
    isAdmin: false,
  },
];
