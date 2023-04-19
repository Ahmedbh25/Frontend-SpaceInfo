import { AUTH_ACTIONS } from "./AuthContext";
import { REVIEW_ACTIONS } from "./ReviewContext";
import { ACTIONS } from "./FilterSidebarContext";
import { INPUT_ACTION } from "./RegisterContext";
import { PRO_ACTIONS } from "./ProfileContext";
import { SHOP_ACTIONS } from "./ShoppingContext";

export const FilterReducer = (state, action) => {
  switch (action.type) {

    case ACTIONS.INIT:
      return { ...state, products: action.payload }

    case ACTIONS.ALL:
      return { ...state, products: action.payload }

    case ACTIONS.PRICE_ASC:
      const orderAscending = state.products.sort((p, c) => p.price - c.price);
      return { ...state, products: orderAscending }

    case ACTIONS.PRICE_DESC:
      const orderDescending = state.products.sort((p, c) => c.price - p.price);
      return { ...state, products: orderDescending }

    case ACTIONS.IN_STOCK:
      const inStockOnly = state.products.filter(comp => comp.inStock === true)
      return { ...state, products: inStockOnly }

    case ACTIONS.TOGGLE_CATEGORY:
      const updatedCateg = { ...state.toggle, [action.payload]: !state.toggle[action.payload] };
      const productsliststorage = localStorage.getItem('initialComputers');
      const Computerscovs = JSON.parse(productsliststorage);
      const updatedProducts = Computerscovs.filter(prod => prod.categorie.toLowerCase() === action.payload.toLowerCase());

      Object.keys(updatedCateg).forEach(key => {
        if (key !== action.payload && updatedCateg[key] === true) {
          updatedCateg[key] = false;
        }
      });
      return {
        ...state,
        toggle: updatedCateg,
        products: updatedProducts,
      };

    case ACTIONS.TOGGLE_TYPE:
      const updatedTypes = { ...state.toggle, [action.payload]: !state.toggle[action.payload] }
      const productsliststor = localStorage.getItem('initialComputers');
      const Computerscovss = JSON.parse(productsliststor);
      const updatedPro = Computerscovss.filter(prod => prod.type.toLowerCase() === action.payload.toLowerCase());
      Object.keys(updatedTypes).forEach(key => {
        if (key !== action.payload && updatedTypes[key] === true) {
          updatedTypes[key] = false;
        }
      });
      return {
        ...state,
        toggle: updatedTypes,
        products: updatedPro,
      };
    case ACTIONS.DELETE_FILTER:
      const productsFromLocalStorage = localStorage.getItem('initialComputers');
      const productscov = JSON.parse(productsFromLocalStorage);
      Object.keys(state.toggle).forEach(indy => state.toggle[indy] === true ? state.toggle[indy] = false : null)
      return { ...state, products: productscov }

    default:
      return state;
  }
}


/* ------- Authentication reducer will be called inside Authcontext --------- */

export const AuthenticateReducer = (state, action) => {
  switch (action.type) {
    case AUTH_ACTIONS.START:
      return {
        user: null,
        loading: true,
        error: null,
      };
    case AUTH_ACTIONS.SUCCESS:
      return {
        user: action.payload,
        loading: false,
        error: null,
      };
    case AUTH_ACTIONS.ECHEC:
      return {
        user: null,
        loading: false,
        error: action.payload,
      };
    case AUTH_ACTIONS.LOGOUT:
      return {
        user: null,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};

export const RegisterFieldReducer = (state, action) => {
  switch (action.type) {
    case INPUT_ACTION.username:
      return { ...state, [action.type]: action.payload }
    case INPUT_ACTION.email:
      return { ...state, [action.type]: action.payload }
    case INPUT_ACTION.password:
      return { ...state, [action.type]: action.payload }
    case INPUT_ACTION.first_name:
      return { ...state, [action.type]: action.payload }
    case INPUT_ACTION.last_name:
      return { ...state, [action.type]: action.payload }
    case INPUT_ACTION.address:
      return { ...state, [action.type]: action.payload }
    case INPUT_ACTION.city:
      return { ...state, [action.type]: action.payload }
    case INPUT_ACTION.state:
      return { ...state, [action.type]: action.payload }
    case INPUT_ACTION.country:
      return { ...state, [action.type]: action.payload }
    case INPUT_ACTION.phone:
      return { ...state, [action.type]: action.payload }
    default:
      return state
  }
}

export const ReviewReducer = (state, action) => {
  switch (action.type) {
    case REVIEW_ACTIONS.INIT:
      return { product: "", rating: 0, review: "" }
    case REVIEW_ACTIONS.PRODUCT:
      return { ...state, product: action.payload }
    case REVIEW_ACTIONS.RATING:
      return { ...state, rating: action.payload }
    case REVIEW_ACTIONS.REVIEW:
      return { ...state, review: action.payload }
    case REVIEW_ACTIONS.ADD_BUTT:
      return { ...state, }
    default:
      return state;
  }
}

export const ProfileReducer = (state, action) => {
  switch (action.type) {
    case PRO_ACTIONS.INIT:
      return {
        data: [],
        loading: false,
        error: null
      }
    case PRO_ACTIONS.START:
      return {
        data: [],
        loading: true,
        error: null
      }
    case PRO_ACTIONS.SUCCESS:
      return {
        data: action.payload,
        loading: false,
        error: null
      }
    case PRO_ACTIONS.ECHEC:
      return {
        data: [],
        loading: false,
        error: action.payload,
      }
  }
}

export const ShoppingReducer = (state, action) => {
  switch (action.type) {
    case SHOP_ACTIONS.ADD_TO_CARD:
      const existingProductIndex = state.allProducts.findIndex(product => product.data === action.payload);
      if (existingProductIndex !== -1) {
        const updatedAllProducts = [...state.allProducts];
        updatedAllProducts[existingProductIndex] = {
          ...updatedAllProducts[existingProductIndex],
          Quantity: updatedAllProducts[existingProductIndex].Quantity + 1
        };
        return {
          ...state,
          totalPrice: state.totalPrice + action.payload.price,
          Count: state.Count + 1,
          allProducts: updatedAllProducts
        };
      } else {
        return {
          ...state,
          totalPrice: state.totalPrice + action.payload.price,
          Count: state.Count + 1,
          allProducts: [
            ...state.allProducts,
            {
              data: action.payload,
              Quantity: 1
            }
          ]
        };
      }
    case SHOP_ACTIONS.DELETE_FROM_CARD:
      return {
        ...state,
        allProducts: state.allProducts.filter(product => product.data !== action.payload),
        Count: state.Count - state.allProducts.find(product => product.data === action.payload).Quantity,
        totalPrice: state.totalPrice - (action.payload.price * state.allProducts.find(product => product.data === action.payload).Quantity)
      }; 
      default:
      return state;
  }
}