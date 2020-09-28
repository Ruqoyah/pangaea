import React from 'react';
import Loading from './Loading';

const Products = ({ onAddToCart, products, currencySelected, loading }) => {
  if (loading) return <Loading />;
  return (
    <div className="products">
      <section className="top-section">
        <div className="top-header">
          <h2>All Products</h2>
          <p>A 360° look at Lumin</p>
        </div>
      </section>
      <section className="products-section">
        {
          products && products.map(product => (
            <div className="product" key={product.id}>
              <div className="product-inner">
                <div className="product-image-container">
                  <img className="product-image seventy-percent-width" src={product.image_url && product.image_url} alt="" />
                </div>
                <h3 className="product-title">{product.title && product.title}</h3>
                <p className="product-price">From <span>{product.price && `${currencySelected === 'USD' ? '$' : currencySelected} ${product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}.00`}</span></p>
                <div className="buttons">
                  <div className="product-btn product-btn-2" onClick={() => onAddToCart(product)}>Add to Cart</div>
                </div>
              </div>
            </div>
          ))
        }
      </section>
    </div>
  )
};

export default Products;
