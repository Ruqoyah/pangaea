import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import Products from './Products';
import Cart from './Cart';
import { PRODUCTS, CURRENCY } from '../actions';
import '../styles/App.css';

const App = () => {
  const [open, setOpen] = useState(false);
  const [allProducts, setAllProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [isUpdateProduct, setIsUpdateProduct] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [currencySelected, setCurrency] = useState('USD');

  const onAddToCart = (product) => {
    setOpen(true);
    document.body.classList.add('side-nav');
    const objIndex = products.findIndex((obj => obj.id === product.id));
    if(products[objIndex]) {
      let tempCount = 1
      tempCount += products[objIndex].count
      products[objIndex] = Object.assign(
        {}, 
        products[objIndex], 
        {
          count: products[objIndex].count ? products[objIndex].count + 1 : 1, 
          price: tempCount * product.price
        });
        setIsUpdateProduct(tempCount);
    } else {
      product = Object.assign({}, product, {count: 1 });
      setProducts([...products, product]);
    }
  }

  const onRemoveFromCart = (id, price) => {
    const newProducts = products.filter(product => product.id !== id);
    setProducts(newProducts);
    setTotalPrice(totalPrice - price);
  }

  const onCloseCartModal = () => {
    document.body.classList.remove('side-nav');
    setOpen(false);
  }

  const onIncrement = (product) => {
    const objIndex = products.findIndex((obj => obj.id === product.id));
    const mainProduct = allProducts.find((obj => obj.id === product.id))
    let tempCount = 1
    tempCount += products[objIndex].count
    products[objIndex] = Object.assign(
      {}, 
      products[objIndex], 
      {
        count: products[objIndex].count + 1, 
        price: tempCount * mainProduct.price
      });
      setIsUpdateProduct(tempCount);
  }

  const onDecrement = (product) => {
    const objIndex = products.findIndex((obj => obj.id === product.id));
    const mainProduct = allProducts.find((obj => obj.id === product.id))

    if(product.price === mainProduct.price) {
      onRemoveFromCart(product.id, product.price)
    }
    
    let tempCount = 1
    tempCount += products[objIndex].count
    products[objIndex] = Object.assign(
      {}, 
      products[objIndex], 
      {
        count: products[objIndex].count - 1, 
        price: product.price - mainProduct.price
      });
      setIsUpdateProduct(tempCount);
  }

  const { loading, error, data } = useQuery(PRODUCTS(currencySelected));

  useEffect(() => {
    setAllProducts(data && data.products)
  }, [data])

  const { error: currError, data: currData } = useQuery(CURRENCY());

  const onChangeCurrency = (currency) => {
    setCurrency(currency);
    let newProducts = [];
    allProducts.map((allProduct) => products.map(product => {
      if(product.id === allProduct.id) {
        allProduct = Object.assign({}, 
          allProduct, 
          {
            count: product.count,
            price: allProduct.price * product.count
          }
        );
        newProducts.push(allProduct)
      }
    }));
    setProducts(newProducts);
  }

  const getPrices = () => products.map(prod => prod.price)

  useEffect(() => {
    if(allProducts) {
      onChangeCurrency(currencySelected, allProducts)
    }
  }, [currencySelected, allProducts])

  useEffect(() => {
    const prices = getPrices();
    setTotalPrice(prices.reduce((a, b) => a + b, 0))
  }, [products, isUpdateProduct])

  if (error) return <p>Product Error</p>;
  if (currError) return <p>Currency Error</p>;
  return (
    <div>
      <Products
        onAddToCart={onAddToCart}
        products={allProducts}
        currencySelected={currencySelected}
        loading={loading}
      />
      <Cart
        open={open}
        products={products}
        onCloseCartModal={onCloseCartModal}
        onRemoveFromCart={onRemoveFromCart}
        currency={currData && currData.currency}
        totalPrice={totalPrice}
        onChangeCurrency={onChangeCurrency}
        currencySelected={currencySelected}
        allProducts={allProducts}
        loading={loading}
        onIncrement={onIncrement}
        onDecrement={onDecrement}
      />
    </div>
  );
}

export default App;
