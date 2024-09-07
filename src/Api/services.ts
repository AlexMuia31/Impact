import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = "https://off-the-ramp-api.onrender.com/api/v1/";

export const MusaPayApi = createApi({
  reducerPath: "MusaPayApi",
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
  endpoints: (builder) => ({
    getOnramp: builder.mutation({
      query: (body) => ({
        url: "stk-push",
        method: "POST",
        body,
      }),
    }),
    getConnectUser: builder.mutation({
      query: (body) => ({
        url: "connect-user",
        method: "POST",
        body,
      }),
    }),
    getBalance: builder.query({
      query: () => "wallet-bal-txns",
    }),
    getKesPrice: builder.query({
      query: () => "cmc-price-feed-kes",
    }),
    getEthPrice: builder.query({
      query: () => "cmc-price-feed-token",
    }),
    getOffRamp: builder.mutation({
      query: (body) => ({
        url: "offramp-api",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useGetOnrampMutation,
  useGetConnectUserMutation,
  useGetBalanceQuery,
  useGetKesPriceQuery,
  useGetEthPriceQuery,
  useGetOffRampMutation,
} = MusaPayApi;
