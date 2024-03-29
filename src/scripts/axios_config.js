import {flask_url} from "@/scripts/config";
import axios from "axios";
import {store} from "@/store/store";

// silo cors from 'cors';
//
// const corsOptions = {
//   origin: [
//     'http://localhost:5000',
//     'http://127.0.0.1:5000',
//     // your origins here
//   ],
//   credentials: true,
//   exposedHeaders: ['set-cookie'],
// };

export const api = axios.create({
  baseURL: flask_url,
  withCredentials: true,
  headers: {
    "Content-type": "application/json",
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': true,
    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
  },
});

api.interceptors.response.use(undefined,
  err => {
    console.log(`ERROR:`);
    console.log(err);
    // console.log(error.response.data)
    if (err.response.status === 401) {
      console.log(`UNAUTHORIZED !!!`)
      store.dispatch('auth/logout')
      window.location.href = '/login';
      store.dispatch('snackbar/showMessage', {
            message: "Unauthorized request. Log back in."
          },
          { root: true }
        )
    }
    return Promise.reject(err)
  });