import React, { useContext, useEffect, useState } from "react";
import { connect } from "react-redux";
import Content from "../../components/content";
import Layout from "../../components/layout";
import ProductItem from "../../components/ProductItem";
import SideBar from "../../components/Sidebar";
import { ThemeContext } from "../../index";
import dataProduct from "../../product.json";
import LoadingWaitGetData from "../LoadingWaitGetData";
import { getProductList } from "./Main.action";
import ScrollButton from '../../components/ScrollButton';
import Pagination from "../../components/Pagination"
import "react-chat-widget/lib/styles.css";
import "./Main.css";


function App(props) {
  const value = useContext(ThemeContext);

  // Make product list hook
  const [productList, setProductsList] = useState([]);

  // Add to cart hook

  const [productsInCart, setProductsInCart] = useState([]);
  useEffect(() => {
    if (props.productsList) {
      setProductsList(props.productsList);
    }
  }, [props.productsList]);


  useEffect(() => {
    props.getProductList();
  }, []);

  const addProductToCart = (newProduct) => {
    let productCart = {
      id: newProduct.id,
      name: newProduct.name,
      type: newProduct.type,
      price: newProduct.price,
      imgUrlURL: newProduct.imgUrlURL,
      quantity: 1,
    };
    let productUpdate = [...productsInCart];
    let index = productUpdate.findIndex((pd) => pd.id === productCart.id);
    if (index !== -1) {
      productUpdate[index].quantity += 1;
    } else {
      productUpdate.push(productCart);
    }
    setProductsInCart(productUpdate);
  };
  const onHightToLow = () => {
    let newProducts = [...productList];
    newProducts.sort((product1, product2) => product2.price - product1.price);
    setProductsList(newProducts);
  };
  const onLowToHigh = () => {
    let newProducts = [...productList];
    newProducts.sort((product1, product2) => {
      return product1.price - product2.price;
    });
    setProductsList(newProducts);
  };


  const onSortAZ = () => {
    let newProducts = [...productList];
    newProducts.sort((product1, product2) => {
      return product1.name
        .toLowerCase()
        .localeCompare(product2.name.toLowerCase());
    });

    setProductsList([...newProducts]);
  };

  const onSortZA = () => {
    let newProducts = [...productList];
    newProducts.sort((product1, product2) => {
      return product2.name
        .toLowerCase()
        .localeCompare(product1.name.toLowerCase());
    });
    setProductsList(newProducts);
  };

  const onDelete = (productId) => {
    const deleteProduct = [...productsInCart].filter(
      (product) => product.id !== productId
    );
    setProductsInCart(deleteProduct);
  };


  const onSearch = (value) => {
    const newProducts = [...dataProduct.data].filter((item) => {
      return item.name.includes(value);
    });
    setProductsList(newProducts);
  };

  const onSelectProduct = (propsOfProductItem) => {
    setProductsInCart([...productsInCart, propsOfProductItem])
  }


  // Pagination section //
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(15);


  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = productList.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);

  // Pagination end //

  return (
    <Layout productsInCart={productsInCart} onDelete={onDelete}>
      <main>
        <section className="shop-area pt-150 pb-100">
          <div className="container">
            <div className="row">
              <Content count={currentPosts.length} total={productList.length} >
                {currentPosts.map((elm) => {
                  return (
                    <ProductItem
                      key={elm.id}
                      {...elm}
                      imgUrlURL={elm.imgUrl}
                      onSelectProduct={onSelectProduct}
                    />
                  );
                })}
                <LoadingWaitGetData />
                <Pagination
                  postsPerPage={postsPerPage}
                  totalPosts={productList.length}
                  paginate={paginate}
                />
              </Content>
              <SideBar
                onSort={onHightToLow}
                onSortLow={onLowToHigh}
                onSortAZ={onSortAZ}
                onSortZa={onSortZA}
                onSearch={onSearch}
              />
            </div>
          </div>
        </section>
      </main>
      <ScrollButton />
    </Layout>
  );
}
const mapStateToProps = (state) => {
  return {
    productsList: state.productsReducer.products,
  };
};
const mapDispatchToProps = {
  getProductList,
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
