import axios from "axios";
import { resolve } from "./resolver";

const getProducts = async () => {
    const result = await axios.get("https://fakestoreapi.in/api/products?limit=50")
    return resolve(result.data)
}

export {getProducts};