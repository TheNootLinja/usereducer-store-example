import { createContext } from 'react'

import { initialState } from './ShopReducer';

const ShopContext = createContext(initialState);