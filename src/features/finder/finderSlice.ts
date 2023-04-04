import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query'
import type { PayloadAction } from "@reduxjs/toolkit";
import { searchFullText } from '../../lib/operations'
import { useAppDispatch } from "../../app/reduxHooks";
import { loadBundle } from "firebase/firestore";

export interface FinderState {
  jobs: Array<any>;
  filteredJobs: Array<any>;
}

type CardType = {
  city: string
  company: CompanyType
  description: string
  end_date: string
  start_date: string
  location: Array<string>
  position: string
  scope: Array<string>
  tags: Array<string>
  user: UserType
}
type CompanyType = {
  creator: string,
  description: string,
  logo: string,
  name: string,
  url: string,
}
type UserType = {
  company: string
  email: string
  id: string
  photo: string
  type: string
  username: string
}
/* 
export const searchAPI = createApi({
  reducerPath: "loadJobs",
  baseQuery: fetchBaseQuery({ baseUrl: 'https://localhost:3001/' }),
  endpoints: (builder) => ({
    getSearch: builder.query<CardType, any>({
      query: (searchTerm: string) => ({url: "jobs/search", method: 'POST', query: searchTerm}),
    }),
  }),
}) */

// First, create the thunk
export const getSearch = createAsyncThunk(
  'search/requestStatus',
  async (searchTerm: string) => {
    const response = await searchFullText(searchTerm)
    //console.log('getSearch: ', response)
    return response?.map(item => item.item)
  }
)
/* {
    companyName: "Google",
    companyIcon: "google.png",
    title: "Full Stack Developer",
    desc: "In this position you will be working with a senior FS developer",
    tags: ["Javascript", "React", "Firebase", "Chakra UI"],
  },
  {
    companyName: "Google",
    companyIcon: "google.png",
    title: "Full Stack Developer",
    desc: "In this position you will be working with a senior FS developer",
    tags: ["Javascript", "React", "Firebase", "Chakra UI"],
  },
  {
    companyName: "Google",
    companyIcon: "google.png",
    title: "Full Stack Developer",
    desc: "In this position you will be working with a senior FS developer",
    tags: ["Javascript", "React", "Firebase", "Chakra UI"],
  }, */
const initialState: FinderState = {
  jobs: [],
  filteredJobs: []
};

const finderSlice = createSlice({
  name: "finder",
  initialState,
  reducers: {
    loadJobs: (state, action: PayloadAction<Array<CardType>>) => {
      //console.log('loadJobs', state.jobs)
      //console.log('loadJobs', action)

      state.jobs = action.payload;
      //console.log("After change:", state.jobs);

    },
    loadFilteredJobs: (state, action: PayloadAction<Array<CardType>>) => {
      console.log("filtered jobs slice:", action);

      state.filteredJobs = action.payload
    }
  },
  extraReducers: (builder: any) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(getSearch.fulfilled, (state: any, action: PayloadAction<Array<CardType>>) => {
      //console.log('builder:', action.payload)
      //console.log(action)
      state.jobs = action.payload;

      // Add user to the state array
      //state.entities.push(action.payload)
    })
  },
});

//export const { useGetSearchQuery } = searchAPI
export const { loadJobs, loadFilteredJobs } = finderSlice.actions
export default finderSlice.reducer;
