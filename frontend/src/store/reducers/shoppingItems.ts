import {ActionTypes, ShoppingItemModel} from '../types';
import {ADD_ITEM_SUCCESS, DELETE_ITEM_SUCCESS, SET_ITEMS, SET_LOADING, UPDATE_ITEM_SUCCESS} from '../actions';

export type ShoppingItemsState = {
    items: ShoppingItemModel[];
    isLoading?: boolean
}

const initialState: ShoppingItemsState = {items: [], isLoading: false};

const shoppingItems = (state: ShoppingItemsState = initialState, action: ActionTypes): ShoppingItemsState => {

    switch (action.type) {
        case ADD_ITEM_SUCCESS:
            state.items = [...state.items,
                {
                    id: action.value.id,
                    name: action.value.name,
                    description: action.value.description,
                    quantity: action.value.quantity,
                    purchased: !!action.value.purchased
                }];

            return state;

        case DELETE_ITEM_SUCCESS:
            return {
                ...state,
                items: state.items.filter(item => item.id !== action.item.id)
            };

        case UPDATE_ITEM_SUCCESS:
            return {
                ...state,
                items: state.items.map((item: ShoppingItemModel) =>
                    item.id === action.item.id ? action.item : item
                )
            };

        case SET_ITEMS:
            return {
                ...state,
                items: action.items
            };

        case SET_LOADING:
            return {
                ...state,
                isLoading: action.isLoading
            };
    }

    return state;
};

export default shoppingItems;