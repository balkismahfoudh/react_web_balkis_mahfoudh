import React from "react";
import formatCurrency from "../utils/formatCurrency";
import Product from "../types/Product"

interface Props {
  products: Product[];
  addToCart: (product: Product) => void;
}

const Products: React.FC<Props> = ({ products, addToCart }) => {


  return (
    <div>
        <ul className="products">
          {products.map((product) => (
            <li key={product.id}>
              <div className="product">
                <a
                  href={"#" + product.id}
                >
                  <img src={product.thumbnail} alt={product.title}></img>
                  <p>{product.title}</p>
                </a>
                <div className="product-price">
                  <div>{formatCurrency(product.price)}</div>
                  <button
                    onClick={() => addToCart(product)}
                    className="button primary"
                  >
                    Add To Cart
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
    
    </div>
  );
};

export default Products;
