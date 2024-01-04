import { Product } from "./models/product.model";
import { User } from "./models/user.model";
import bcrypt from "bcryptjs";

export const products: Product[] = [
  
  {
    name: "Azithromycin 500",
    slug: " tablets",
    category: "azicip",
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
    slug: " tablets",
    category: "dolo250",
    image: "../assets/images/Dolo.png",
    description: "fever",
    brand: "micro labs limitied",
    price: 38.3,
    countInStock: 10,
    rating: 3.5,
    numReviews: 10,
    reviews: [],
  },





{
    name: "lactogen-3",
    slug: " milk powder",
    category: "azicip",
    image: "../assets/images/lactogen3.png",
    description: "Nestle",
    brand: "cipal",
    price: 460,
    countInStock: 8,
    rating: 2.5,
    numReviews: 10,
    reviews: [],
  },

{
    name: "Dexa",
    slug: "inj",
    category: " diclofenac ",
    image: "../assets/images/Dexa.png",
    description: "Painkiller",
    brand: "Zydus geo",
    price: 60,
    countInStock: 10,
    rating: 3.5,
    numReviews: 10,
    reviews: [],
  },



{
    name: "Surgical masks",
    slug: " surgical",
    category: "masks",
    image: "../assets/images/mask.png",
    description: "cold/fever",
    brand: "General",
    price: 250,
    countInStock: 100,
    rating: 3.5,
    numReviews: 10,
    reviews: [],
  },


{
    name: "Telsimart Am",
    slug: " 10-tablets",
    category: "telma",
    image: "../assets/images/Telsimart am.png",
    description: "TELMISARTAN AM",
    brand: "Knoll",
    price: 235,
    countInStock: 10,
    rating: 3.5,
    numReviews: 10,
    reviews: [],
  },




{
    name: "Human Mixtard 30/70",
    slug: "Insullion",
    category: "mixtard",
    image: "../assets/images/humanmixtard.png",
    description: "Diabtetic/insulin isophane/nph(70%)+human insulin/soluble insulin(30%)",
    brand: "Novo pvt ltd",
    price: 153.64,
    countInStock: 10,
    rating: 4.5,
    numReviews: 10,
    reviews: [],
  },

{
    name: "orls",
    slug: "energy drinks",
    category: "apple",
    image: "../assets/images/orls.png",
    description: "Drinks",
    brand: "Jhonson",
    price: 45,
    countInStock: 10,
    rating: 4.5,
    numReviews: 10,
    reviews: [],
  },




{
    name: "Multiplex",
    slug: " Vitamin",
    category: "beplex",
    image: "../assets/images/multiprex.png",
    description: "anti-biotics",
    brand: "Multivitamin, multiminerals & Antioxidant Soft Gelatin Capsules ",
    price: 379,
    countInStock: 8,
    rating: 4.5,
    numReviews: 10,
    reviews: [],
 },

{
    name: "Protinex",
    slug: "Powder",
    category: "ensure",
    image: "../assets/images/Protinex.png",
    description: "Adults Protein Powder",
    brand: "Dandone",
    price: 750,
    countInStock: 8,
    rating: 4.5,
    numReviews: 10,
    reviews: [],
  },



{
    name: "Nua ultra",
    slug: "Sanitary pads",
    category: "Stayfree",
    image: "../assets/images/nua.png",
    description: "pads",
    brand: "General",
    price: 45,
    countInStock: 6,
    rating: 2.4,
    numReviews: 10,
    reviews: [],
  },

];

export const users: User[] = [
 
  {
    name: "admin",
    email: "admin@example.com",
    password: bcrypt.hashSync("123456"),
    isAdmin: false,
  },
];
