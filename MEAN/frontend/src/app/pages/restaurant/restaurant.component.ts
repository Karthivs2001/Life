import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.css']
})
export class RestaurantComponent {
  onSelect(_t4: {
  name: string; imageUrl: string; // Replace with the actual URL
  rating: number; address: string; reviews: number; items: string[];
  }) {
  throw new Error('Method not implemented.');
  }
  addToCart(_t4: {
  name: string; imageUrl: string; // Replace with the actual URL
  rating: number; address: string; reviews: number; items: string[];
  }) {
  throw new Error('Method not implemented.');
  }
  
  restaurant = [
    {
      name: 'Sayaji',
      imageUrl: 'https://q-xx.bstatic.com/xdata/images/hotel/max500/49644001.jpg?k=d6d3831ac81f88e46e4c800b4e2a66f53025710281b801fb4b31113ce3019f94&o=', // Replace with the actual URL
      rating: 5,
      address:'2104/15, E Ward, Old Pune-Bangalore Hwy, Kawala Naka, Shahupuri, Kolhapur, Maharashtra ',
      
      reviews: 13000,
      items: ['Royal Chicken Biryani ', 'Special kolhapuri Nonveg', 'Egg Biryani ', 'misal','Tandoori Chicken ','kaju kari']
    },
    {
      name: 'Hyatt',
      imageUrl: 'https://assets.hyatt.com/content/dam/hyatt/hyattdam/images/2015/05/07/1206/Hyatt-Place-Pune-Hinjewadi-P009-Exterior-by-Dusk-Portrait.jpg/Hyatt-Place-Pune-Hinjewadi-P009-Exterior-by-Dusk-Portrait.4x3.jpg?imwidth=1280', // Replace with the actual URL
      rating: 4.5,
      address:'88 Nagar Road,Kalyani Nagar Pune, Maharashtra,india 411006',
      reviews: 887,
      items: ['Paneer Tikka', 'Special Mutton Biryani ', 'Pita Sandwich', 'Tenderlion Burger','Puneri special thali','Puran poli']
    },
    {
      name: 'Kakada Ramprasad',
      imageUrl: 'https://www.lux-review.com/wp-content/uploads/2019/09/turkish-hotel.jpg', // Replace with the actual URL
      rating: 4,
      address:'348/343, Ground Floor, Mint Street, Sowcarpet, Chennai',
      reviews: 505,
      items: ['Dosa', 'idlis', ' Biryani ', 'Uthappam','Payasam','Qubani Ka Meetha ']
    },
    {
      name: 'Taj-Mahal',
      imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSySHNCAQL8VyYIHC7dL-gOmTrRHwD2W1dZ_O6PAtFaEQ&s', // Replace with the actual URL
      rating: 5,
      address:'Apollo Bandar, Colaba, Mumbai, Maharashtra 400001',
      reviews: 10000,
      items: ['Chole Bhature', 'Masala Panir', 'Masala Rise', 'Aloo Paratha','Chilly Cheese','Malai Curry Prawns']
    },
    {
      name: 'Jewal of Nizam',
      imageUrl: 'https://im1.dineout.co.in/images/uploads/restaurant/sharpen/1/r/l/p18871-15408041775bd6ce510cde5.jpg?tr=tr:n-large', // Replace with the actual URL
      rating: 4,
      address:'The Golkonda Resort, Gandipet, Hyderabad, Telangana 500075',
      reviews: 4584,
      items: ['Hyderabadi Biryani', 'Haleem', ' Mirchi ka salan ', 'Nihari','Shami Kebab','Seekh Kebab']
    },
    {
      name: 'Gufha',
      imageUrl: 'https://lh3.googleusercontent.com/p/AF1QipNILMKFnUOMBu9DgzPg4X815Pm_jxEcWAY2MWFY=s680-w680-h510', // Replace with the actual URL
      rating: 4.5,
      address:'79/8, Diagonal Rd, Jaya Nagar 1st Block, Jayanagar 3rd Block, Jayanagar, Bengaluru, Karnataka 560001',
      reviews: 505,
      items: ['Dai Shorba', 'Chat patta Chaat', 'Sweet corn vegetable', 'Dum Biryani','Subzi Biryani','Boondi Raita']
    },
  
    {
      name: 'Saravana Bhavan',
      imageUrl: 'https://gos3.ibcdn.com/9747f052a74411eb96f70242ac11000e.png', // Replace with the actual URL
      rating: 4,
      address:'Adyar. No.20, Besant Avenue Road, Essar Tower , Adyar, Chennai ',
      reviews: 700,
      items: ['Chettinad Chiken', 'Kadalai Mittai', 'Pangal', 'vada curry','Fish curry','Pangal']
    },
    {
      name: 'Lemoan Tree',
      imageUrl: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/230606465.jpg?k=63b6828047184d669fdbda303eac5a6e866a8c20474140943d959bb26c29091f&o=&hp=1', // Replace with the actual URL
      rating: 4,
      address:'Viman Nagar, Sakore Nagar Road, Pune, Maharashtra, 411014 Pune',
      reviews: 505,
      items: ['Pizza', 'Sandwize', 'Misal Pav', 'Pav Bhaji','Pithla bhakri','Adda kari']
    },
    {
      name: 'Rao',
      imageUrl: 'https://lh5.googleusercontent.com/p/AF1QipOz2ATj7yrTFH6vyF_yotEIbmvgFnLi8FjBTYDV=w253-h181-k-no', // Replace with the actual URL
      rating: 4.5,
      address:'Lal Bahadur Shastri Marg, Gangawadi, Ghatkopar West, Mumbai, Maharashtra ',
      reviews: 1505,
      items: ['Pierced fish','Sambhara Vada', 'Panir-kaju masala', 'veg biryani','rise',]
    },
    {
      name: 'Taj Palace',
      imageUrl: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/336041746.jpg?k=81ca9e45244b4f17cb199c4ac73d2094446ebd17020c5c1425a44a23e860b562&o=&hp=1', // Replace with the actual URL
      rating: 4,
      address:'Taj Palace, 2, Sardar Patel Marg, Diplomatic Enclave, Chanakyapuri, New Delhi, Delhi 110021',
      reviews: 2000,
      items: ['momos', 'Rolls', 'Butter chiken', 'chaat','Rabri Falooda','Paranthe']
    },
    {
      name: 'Gulmohar Pride',
      imageUrl: 'https://www.ahstatic.com/photos/6833_ho_00_p_1024x768.jpg', // Replace with the actual URL
      rating: 4,
      address:' Ahmednagar, Hotel Gulmohar Pride ',
      reviews: 1500,
      items: ['Dal Tadka', 'Chapati Bhaji', 'Gajar ka halva', 'Shrikhand','Kaju Patis',]
    },
    {
      name: 'Imperial',
      imageUrl: 'https://i0.wp.com/delhishoppingtour.com/wp-content/uploads/2020/01/the-imperial-new-delhi.jpg?resize=697%2C343', // Replace with the actual URL
      rating: 5,
      address:'Janpath Ln, Janpath, Connaught Place, New Delhi, Delhi 110001',
      
      reviews: 505,
      items: ['Fish noodles', 'Fish Fried rice', 'ckiken 65', 'Fish Curry',]
    },
    // Add more hotels as needed
  ];
  
  
  }
