import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-food-category',
  templateUrl: './food-category.component.html',
  styleUrls: ['./food-category.component.css'],
})
export class FoodCategoryComponent implements OnInit {
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  cuisines = [
    {
      type: 'Italian',
      restaurants: [
        {
          name: 'Italian Restaurant ',
          imageUrl:
            'https://blogs.voanews.com/all-about-america/files/2015/05/230403389_46beb38b63_b.jpg',
          reviews: 4.5,

          rating: 4,
          items: ['polenta', 'Lasagana', 'ravioli', 'Arancini', 'Ribollita'],
        },
        // Add more Italian restaurants as needed
      ],
    },
    {
      type: 'French',
      restaurants: [
        {
          name: 'French Restaurant ',
          imageUrl:
            'https://blogs.voanews.com/all-about-america/files/2015/05/5941303542_371908c13e_b.jpg',
          reviews: 4.2,

          rating: 3,
          items: [
            'Bouillabaisse',
            'Escargot',
            'Tarte Tatin',
            'French onion soup',
            'Escargot',
          ],
        },
        // Add more French restaurants as needed
      ],
    },
    {
      type: 'Indian',
      restaurants: [
        {
          name: 'Indian Restaurant ',
          imageUrl:
            'https://c.ndtvimg.com/2022-03/jcliv9dg_shahi-paneer_625x300_15_March_22.jpg?im=FaceCrop,algorithm=dnn,width=1200,height=886',
          reviews: 4.7,

          rating: 4.5,
          items: [
            'panner butter masala',
            'Naan',
            'kabab',
            'chicken 65',
            'Fish fry',
          ],
        },
        // Add more Indian restaurants as needed
      ],
    },
    {
      type: 'Mexican',
      restaurants: [
        {
          name: 'Mexican Restaurant ',
          imageUrl:
            'https://blogs.voanews.com/all-about-america/files/2015/05/3008389105_19759e7588_b.jpg',
          reviews: 4.0,

          rating: 3.8,
          items: [
            'Pozole',
            'Tacos al pastor',
            'Tostadas',
            'Chiles en nogada',
            'Mole',
          ],
        },
        // Add more Continental restaurants as needed
      ],
    },

    {
      type: 'Japanese sushi ',
      restaurants: [
        {
          name: 'Japanese  Restaurant ',
          imageUrl:
            'https://blogs.voanews.com/all-about-america/files/2015/05/15197446593_928f1b79f4_k-974x730.jpg',
          reviews: 4.0,

          rating: 3.8,
          items: [
            'Okonomiyaki',
            'Yakitor',
            'Miso Soup',
            'Takoyaki',
            'Sukiyaki.',
          ],
        },
        // Add more Continental restaurants as needed
      ],
    },

    {
      type: 'Thai ',
      restaurants: [
        {
          name: 'Thai  Restaurant ',
          imageUrl:
            'https://blogs.voanews.com/all-about-america/files/2015/05/2387448684_912969a41b_b-974x730.jpg',
          reviews: 4.0,

          rating: 3.8,

          items: [
            'Som Tam',
            'Pad Thai.',
            'Ba Mee Kiew',
            'Pad See Ew.',
            'Khao Niao',
          ],
        },
        // Add more Continental restaurants as needed
      ],
    },

    {
      type: 'Spanish',
      restaurants: [
        {
          name: 'Spanish Restaurant ',
          imageUrl:
            'https://blogs.voanews.com/all-about-america/files/2015/05/8855400653_e25809ee29_k-974x613.jpg',
          reviews: 4.0,

          rating: 3.8,
          items: [
            'Patatas bravas',
            'Pimientos de Padrón',
            'Gazpacho',
            'Churros',
            'Fideuà ',
          ],
        },
        // Add more Continental restaurants as needed
      ],
    },

    {
      type: 'Mediterranean ',
      restaurants: [
        {
          name: 'Mediterranean  Restaurant 1',
          imageUrl:
            'https://blogs.voanews.com/all-about-america/files/2015/05/5932807756_976a6992c7_b-974x629.jpg',
          reviews: 4.0,

          rating: 3.8,
          items: [
            'Pizza Margherita',
            'Moussaka',
            'Tabouli.',
            'Gyros.',
            'Greek Salad, aka Horiatiki.',
          ],
        },
        // Add more Continental restaurants as needed
      ],
    },
    {
      type: ' Greek',
      restaurants: [
        {
          name: 'Greek  Restaurant ',
          imageUrl:
            'https://deih43ym53wif.cloudfront.net/souvlaki-greek-food_b16abb51f7.jpeg',
          reviews: 4.0,

          rating: 3.8,

          items: [
            ' phyllo',
            'eggplant papoutsaki',
            'yuvarlakia',
            'kadaifi',
            ' loukoumi',
            'meze',
          ],
        },
        // Add more Continental restaurants as needed
      ],
    },

    // Add more cuisines as needed
  ];

  // Your existing methods (onSelect, addToCart) can remain as they are
}
