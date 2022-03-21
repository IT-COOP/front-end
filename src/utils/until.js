export const getToken = async () => {
  const token = localStorage.getItem("coopToken");
  return token ? token : null;
};

export const removeToken = () => {
  return localStorage.removeItem("coopToken");
};
