// import api from "./api";

// export const getDashboardStats = async () => {
//   const response = await api.get("/dashboard");
//   return response.data;
// };


import api from "@/lib/api";

export const getDashboardStats =
  async () => {
    const res =
      await api.get("/dashboard");

    return res.data;
  };