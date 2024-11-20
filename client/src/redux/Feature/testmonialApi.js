import baseApi from '../Api/baseApi';
import { getTagsByModuleName } from "@/redux/Tag/Tag";

const testimonialApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get Testimonials
    getTestimonials: builder.query({
      query: () => ({
        url: "/testimonials",
      }),
      providesTags: getTagsByModuleName('Testimonial'),
    }),

  }),
});

export const {
  useGetTestimonialsQuery,
} = testimonialApi;
