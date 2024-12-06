import React, { useState, useEffect } from "react";
import Products from "./components/Products";
import Filter from "./components/Filter";
import Cart from "./components/Cart";
import Product from "./types/Product"
import {CartItem} from "./types/CartItem"


const App: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const savedCartItems = localStorage.getItem("cartItems");
    return savedCartItems ? JSON.parse(savedCartItems) : [];
  });
  const [sort, setSort] = useState<string>("");

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://dummyjson.com/products');
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        setProducts(data.products);
        console.log(products, "products")
      } catch (err) {
        setError('Failed to fetch products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);
console.log(products)

  const createOrder = (order: { name: string }) => {
    alert("Need to save order for " + order.name);
  };

  const removeFromCart = (product: Product) => {
    const updatedCartItems = cartItems.filter((x) => x.id !== product.id);
    setCartItems(updatedCartItems);
  };

  const addToCart = (product: Product) => {
    const updatedCartItems = [...cartItems];
    let alreadyInCart = false;

    updatedCartItems.forEach((item) => {
      if (item.id === product.id) {
        item.count++;
        alreadyInCart = true;
      }
    });

    if (!alreadyInCart) {
      updatedCartItems.push({ ...product, count: 1 });
    }

    setCartItems(updatedCartItems);
  };

  const sortProducts = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const sortValue = event.target.value;
    setSort(sortValue);

    const sortedProducts = [...products].sort((a, b) => {
      if (sortValue === "lowest") {
        return a.price > b.price ? 1 : -1;
      } else if (sortValue === "highest") {
        return a.price < b.price ? 1 : -1;
      } else {
        return a.id < b.id ? 1 : -1;
      }
    });

    setProducts(sortedProducts);
  };


  return (
    <div className="grid-container">
      <header>
        <a href="/">React Shopping Cart</a>
      </header>
      <main>
        <div className="content">
          <div className="main">
            <Filter
              count={products.length}
              sort={sort}
              sortProducts={sortProducts}
            />
            <Products products={products} addToCart={addToCart} />
          </div>
          <div className="sidebar">
            <Cart
              cartItems={cartItems}
              removeFromCart={removeFromCart}
              createOrder={createOrder}
            />
          </div>
        </div>
      </main>
      <footer> Balkis Mahfoudh</footer>
    </div>
  );
};

export default App;
