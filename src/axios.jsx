import axios from "axios";

const instance = axios.create({
  baseURL: 'https://quiet.pumpeet.me',
  withCredentials: true,
  // credentials: "include", 
  headers: {
    'Content-Type': 'application/json',
  }
});

export default instance;


// const fetchData = async () => {
//     try {
//       axios.get("/products/discover/").then(response => {
//         setProducts(response.data.data)
//       }).catch(error => {
//         console.log(error)
//       })
//     } catch (error) {
//       console.error('Error fetching products:', error);
//     }
//   };