import { createContext, useReducer, useContext } from 'react'
import shopReducer, { initialState } from './ShopReducer'

// Defining shop context
const ShopContext = createContext(initialState)

const useShop = () => {
  const context = useContext(ShopContext)
  if(context === undefined) {
    throw new Error("useShop must be used within ShopContext")
  }

  return context
}

// Defining shop provider
export const ShopProvider = ({ children }) => {

  // Defining state and dispatch using useReducer with shopReducer passes
  // as the reducer and initialState passed as the initial state.
  const [state, dispatch] = useReducer(shopReducer, initialState)

  // Defining add to cart action and passing in the product
  const addToCart = (product) => {
    // Storing value of adding new product to the products state.
    const updatedCart = state.products.concat(product)
      // Running our function to update price with updatedCart passed
      // as an argument
      updatePrice(updatedCart);

    // Setting up our state dispatch function for the add to cart action
    dispatch({
      // Passing type of action for the reducer switch
      type: "ADD_TO_CART",
      // Passing the payload, which here will be the updatedCart
      // variable that we created above.
      payload: {
        products: updatedCart
      }
    })
  }

  const removeFromCart = (product) => {
    const updatedCart = state.products.filter(
      (currentProduct) => currentProduct.name !== product.name
    )
    updatePrice(updatedCart);
    
    dispatch({
      type: "REMOVE_FROM_CART",
      payload: {
        products: updatedCart
      }
    })
  }

  const updatePrice = (products) => {
    let total = 0;
    products.forEach((product) => (total += product.price))

    dispatch({
      type: "UPDATE_PRICE",
      payload: {
          total
      }
    })
  }

  const value = {
    total: state.total,
    products: state.products,
    addToCart,
    removeFromCart
  }


  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>
}

export default useShop