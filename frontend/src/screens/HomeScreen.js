import { Link } from "react-router-dom";
//import data from "../data";
import axios from "axios";
import { useEffect, useReducer, useState } from "react";
import logger from 'use-reducer-logger';


const reducer = (state, action) =>{
  switch(action.type){
    case 'FETCH_REQUEST':
      return {...state, loading: true};
    case  'FETCH_SUCCESS':
      return {...state, products: action.payload, loading: false};
    case 'FETCH_FAIL':
      return{...state,loading: false, error: action.payload};
    default:
      return state;  
  }
}

function HomeScreen (){
  const [{loading, error, products}, dispatch] = useReducer(logger(reducer),{
    products:[],
    loading: true, error: '',

  })
  //const[products, seProducts]= useState([])
  useEffect(()=>{
    const fetchData = async()=>{
      dispatch({type:'FETCH_REQUEST'})
      try {
        const result = await axios.get('/api/products');
        dispatch({type:'FETCH_SUCCESS', payload: result.data});
      } catch (error) {
        dispatch({type:'FETCH_FAIL', payload: error.message});
      }
      
      //seProducts(result.data);
    };
    fetchData();
  }, [])
    return(
     <div>
        <h1>Productos Destacados</h1>
          <div className='products'>
            {loading? (
            <div>Cargando...</div>
            ): error? (
            <div>{error}</div>
            ):(
            products.map((product) => (
              <div className='product' key={product.slug}>
                <Link to={`/product/${product.slug}`}>
                  <img src={product.image} alt={product.name} />
                </Link>
                <div className='product-info'>
                  <Link to={`/product/${product.slug}`}>
                    <p>{product.name}</p>
                  </Link>
                  <p>
                    <strong>${product.price}</strong>
                  </p>
                  <button>Añadir a la cesta</button>
                </div>
              </div>
            ))
          )}
          </div>

    </div>
    )
}
export default HomeScreen;