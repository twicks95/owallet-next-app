import axiosApiInstances from "utils/axios";

export const getUser = (id) => {
  return {
    type: "GET_USER",
    payload: axiosApiInstances.get(`user/${id}`),
  };
};
