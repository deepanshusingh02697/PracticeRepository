import { useEffect, useState } from "react";
import styles from "./cardproducts.module.css";
import { MdOutlineCurrencyRupee } from "react-icons/md";
import Loader from "../Loader";
import { RotatingLines } from "react-loader-spinner";
import { FaRegHeart } from "react-icons/fa";

interface ProductType {
  id: number;
  thumbnail: string;
  title: string;
  price: number;
  description: string;
  category: string;
}
interface ProductResType {
  products: ProductType[];
  total: number;
  skip: number;
  limit: number;
}
export default function CardProducts() {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadMore, setLoadMore] = useState(false);
  const [total, setTotal] = useState(0);
  const [skip, setSkip] = useState(0);

  const LIMIT = 20;
  const fetchProducts = async (curSkip: number, retries = 3) => {
    try {
      const res = await fetch(`/api/products?limit=${LIMIT}&skip=${curSkip}`);
      if (!res.ok) {
        throw new Error("Failed to fetch products");
      }
      const data: ProductResType = await res.json();
      return data;
    } catch (error) {
      if (retries > 0) {
        await new Promise((resolve) => {
          setTimeout(resolve, 1000);
        });
        return fetchProducts(curSkip, retries - 1);
      }
      throw error;
    }
  };
  useEffect(() => {
    const fetchInitalProducts = async () => {
      try {
        setLoading(true);
        const data = await fetchProducts(0);
        setProducts(data.products ?? []);
        setTotal(data.total);
        setSkip((prev) => prev + data.products.length);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchInitalProducts();
  }, []);
  const handleLoadMore = async () => {
    try {
      setLoadMore(true);
      const data = await fetchProducts(skip);
      setProducts((prev) => [...prev, ...data.products]);
      setSkip(skip + data.products.length);
    } catch (error) {
      console.error("Error loading more products: ", error);
    } finally {
      setLoadMore(false);
    }
  };
  const hasMore = products.length < total;
  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <div className={styles.productsGrid}>
        {products.map((product) => (
          <div className={styles.card} key={product.id}>
            <div className={styles.imageContainer}>
              <img src={product.thumbnail} alt={product.title} loading="lazy" />

              <button
                type="button"
                className={styles.favorite}
                aria-label={`Add ${product.title} to favorites`}
              >
                <FaRegHeart />
              </button>
            </div>

            <div className={styles.details}>
              <div className={styles.price}>
                <MdOutlineCurrencyRupee />
                {Math.round(product.price * 80).toLocaleString("en-IN")}
              </div>
              <div>
                <div className={styles.title}>{product.title}</div>
                <div className={styles.description}>{product.description}</div>
              </div>
              <div className={styles.bottom}>
                <span>{product.category?.toUpperCase()}</span>
                <span>TODAY</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {hasMore && (
        <div className={styles.loadMore}>
          <button
            type="button"
            className={styles.loadMoreBtn}
            onClick={handleLoadMore}
            disabled={loadMore}
          >
            {loadMore ? (
              <>
                <div className={styles.loadData}>
                  <RotatingLines
                    strokeColor="currentColor"
                    strokeWidth="5"
                    animationDuration="0.75"
                    width="22"
                    height="22"
                    visible={true}
                  />
                  <span>Loading...</span>
                </div>
              </>
            ) : (
              "Load more"
            )}
          </button>
        </div>
      )}
    </>
  );
}
