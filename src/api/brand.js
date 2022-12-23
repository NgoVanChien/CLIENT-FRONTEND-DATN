import axiosClient from "./instances/axiosClient";

const queryBrands = (params) => {
  return axiosClient({
    method: "GET",
    url: `/brands?status=true`,
    params
  });
};

const getAllBrand = () => {
  return axiosClient({
    method: "GET",
    url: `/brands/all`,
  });
}

const BRAND_API = {
  queryBrands,
  getAllBrand
};

export default BRAND_API;
