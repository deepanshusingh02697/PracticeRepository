import CardProducts from "../../Component/CardProducts/CardProducts";
import Filters from "../../Component/Filter/Filters";
import styles from "./home.module.css";

import cars from '../../assets/image.png'
import bike from '../../assets/Bike-image.png'
import property from '../../assets/property-img.png'
import freeze from '../../assets/asset-img.png'
import phone from '../../assets/phone-img.png'
import comVehicle from '../../assets/comVehicle.png'
import jobBag from '../../assets/job-img.png'
import furniture from '../../assets/funiture-img.png'
import fashion from '../../assets/fashion-img.png'
import pets from '../../assets/pets-img.png'
import hobbies from '../../assets/hobbies.png'
import services from "../../assets/service-img.png"

const categories = [
  {
    name: "Cars",
    image:cars,
  },
  {
    name: "Bikes",
    image:bike,
  },
  {
    name: "Properties",
    image:property,
  },
  {
    name: "Electronics & Appliances",
    image:freeze,
  },
  {
    name: "Mobiles",
    image:phone,
  },
  {
    name: "Commercial Vehicles & Spares",
    image:comVehicle,
  },
  {
    name: "Jobs",
    image:jobBag,
  },
  {
    name: "Furniture",
    image:furniture,
  },
  {
    name: "Fashion",
    image:fashion,
  },
  {
    name: "Pets",
    image:pets,
  },
  {
    name: "Books,sports & Hobbies",
    image:hobbies,
  },
  {
    name: "Services",
    image:services,
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
          <h3>Fresh recommendations</h3>
          <CardProducts />
        </div>
      </div>
    </div>
  );
}
