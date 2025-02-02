import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { url } from "./api";
// import { appendQueryParams } from "../atoms/static";


const AllApi = createApi({
    reducerPath: "AllApis",
    baseQuery: fetchBaseQuery({ baseUrl: `${url}` }),
    refetchOnMountOrArgChange: true,
    tagTypes: ["User"],
    endpoints(build) {
        return {
            fetchUser: build.query({
                query: ({type}) => {
                    return {
                        url: `/api/users/?${type ? type : ""}`,
                        method: "GET",
                        headers: {
                            Accept: "application/json",
                            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
                            "Content-Type": "application/json",
                        },
                    };
                },
                providesTags: (result = [], error, arg) =>
                    result?.data?.length
                        ? [
                            ...result?.data?.map(({ _id }) => ({ type: "User", _id })),
                            "User",
                        ]
                        : ["User"],
            }),
    
           
        }
    }

});

export const {
    useFetchUserQuery,
   
} = AllApi;

export { AllApi };
export const roleSelector = (state) => state?.user?.user?.role || null;
