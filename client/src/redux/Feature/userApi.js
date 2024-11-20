import baseApi from '../Api/baseApi';
import { getTagsByModuleName } from "@/redux/Tag/Tag";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Add Product
   

    // Get Products
    getUsers: builder.query({
      query: () => ({
        url: "/users",
      }),
      providesTags: getTagsByModuleName('User')
    }),


  }),
});

export const {
  
  useGetUsersQuery,
} = userApi;
