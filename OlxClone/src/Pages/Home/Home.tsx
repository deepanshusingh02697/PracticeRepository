import CardProducts from "../../Component/CardProducts/CardProducts";
import Filters from "../../Component/Filter/Filters";
import styles from "./home.module.css";
const categories = [
  {
    name: "Cars",
    image:
      "https://cdn.dummyjson.com/product-images/vehicle/charger-sxt-rwd/thumbnail.webp",
  },
  {
    name: "Bikes",
    image:
      "https://commons.wikimedia.org/wiki/Special:Redirect/file/Kawasaki_Ninja_H2R_right.JPG",
  },
  {
    name: "Properties",
    image:
      "https://cdn.dummyjson.com/product-images/furniture/annibale-colombo-bed/thumbnail.webp",
  },
  {
    name: "Electronics & Appliances",
    image:
      "https://cdn.dummyjson.com/product-images/kitchen-accessories/black-whisk/thumbnail.webp",
  },
  {
    name: "Mobiles",
    image:
      "https://cdn.dummyjson.com/product-images/smartphones/iphone-6/thumbnail.webp",
  },
  {
    name: "Commercial Vehicles & Spares",
    image:
      "https://cdn.dummyjson.com/product-images/vehicle/charger-sxt-rwd/thumbnail.webp",
  },
  {
    name: "Jobs",
    image:
      "https://cdn.dummyjson.com/product-images/laptops/apple-macbook-pro-14-inch-space-grey/thumbnail.webp",
  },
  {
    name: "Furniture",
    image:
      "https://cdn.dummyjson.com/product-images/furniture/annibale-colombo-bed/thumbnail.webp",
  },
  {
    name: "Fashion",
    image:
      "https://cdn.dummyjson.com/product-images/mens-shirts/blue-&-black-check-shirt/thumbnail.webp",
  },
  {
    name: "Beauty",
    image:
      "https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/thumbnail.webp",
  },
  {
    name: "Groceries",
    image:
      "https://cdn.dummyjson.com/product-images/groceries/apple/thumbnail.webp",
  },
  {
    name: "Home Decor",
    image:
      "https://cdn.dummyjson.com/product-images/home-decoration/plant-pot/thumbnail.webp",
  },
  {
    name: "Laptops",
    image:
      "https://cdn.dummyjson.com/product-images/laptops/apple-macbook-pro-14-inch-space-grey/thumbnail.webp",
  },
];

export default function Home() {
  return (
    <div className={styles.homeCon}>
      <div className={styles.filterCon}>
        <div className={styles.filterSec}>
          <Filters />
        </div>
      </div>

      <div className={styles.homeSec}>
        <div className={styles.categSection}>
          {categories.map((category) => (
            <div className={styles.categoryCard} key={category.name}>
              <div className={styles.categoryImage}>
                <img src={category.image} alt={category.name} />
              </div>
              <span>{category.name}</span>
            </div>
          ))}
        </div>
        <div className={styles.cardSection}>
          <h3>Fresh Recommendations</h3>
          <CardProducts />
        </div>
      </div>
    </div>
  );
}
