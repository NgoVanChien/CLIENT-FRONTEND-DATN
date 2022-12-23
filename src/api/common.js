import axiosClient from "./instances/axiosClient";

const getProducts = () => {
  return axiosClient({
    method: "GET",
    url: `/products?status=true&page=1`,
  });
};

const getCategories = () => {
  return axiosClient({
    method: "GET",
    url: `/categories?status=true&page=1`,
  });
};

const getBrands = (params) => {
  return axiosClient({
    method: "GET",
    url: `/brands?status=true&page=1`,
    params
  });
};

const getAllBrand = () => {
  return axiosClient({
    method: "GET",
    url: `/brands/all`,
  });
}

const getAllCategory = () => {
  return axiosClient({
    method: "GET",
    url: `/categories/all`,
  });
}

const COMMON_API = {
  getProducts,
  getCategories,
  getBrands,
  getAllBrand,
  getAllCategory
};

export default COMMON_API;
