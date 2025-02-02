import { configureStore } from "@reduxjs/toolkit";
import { AllApi } from "../AllApi";
import userReducer from "../userSlice";
// import remainingReducer from "../FilterSlice";

const store = configureStore({
    reducer: {
        user: userReducer,
        // remaining: remainingReducer,
        [AllApi.reducerPath]: AllApi.reducer,
    },

    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(AllApi.middleware);
    },
});

export default store;
    
export {
    useFetchUserQuery,
   


} from "../AllApi";