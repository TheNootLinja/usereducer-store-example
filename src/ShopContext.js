import { createContext, useReducer, useContext } from 'react'
import shopReducer, { initialState } from './ShopReducer'

// Defining shop context
const ShopContext = createContext(initialState);

const useShop = () => {
  const context = useContext(ShopContext);
  if(context === undefined) {
    throw new Error("useShop must be used within ShopContext");
  }

  return context;
}

// Defining shop provider
export const ShopProvider = ({ children }) => {

  // Defining state and dispatch using useReducer with shopReducer passes
  // as the reducer and initialState passed as the initial state.
  const [state, dispatch] = useReducer(shopReducer, initialState)

  // Defining addToCart action and passing product
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

  // Defining the removeFromCart action and passing product
  const removeFromCart = (product) => {
    // Filtering the given product from the cart state and
    // saving the value in updatedCart variable
    const updatedCart = state.products.filter(
      (currentProduct) => currentProduct.name !== product.name
    )
    // Calculating the total based on the updated cart
    updatePrice(updatedCart);
    // Setting up state dispatch with updatedCart as payload
    dispatch({
      type: "REMOVE_FROM_CART",
      payload: {
        products: updatedCart
      }
    })
  }

  // Defining the updatePrice action and passing product
  const updatePrice = (products) => {
    // Setting up total
    let total = 0;
    // Going through products in cart and adding cost to total
    products.forEach((product) => (total += product.price))
    // Setting up state dispatch with total as payload
    dispatch({
      type: "UPDATE_PRICE",
      payload: {
          total
      }
    })
  }

  // Constructing the value to be passed to provider
  const value = {
    total: state.total,
    products: state.products,
    addToCart,
    removeFromCart
  }


  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>
}

export default useShop