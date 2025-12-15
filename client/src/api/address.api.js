// src/api/address.api.js
const BASE_URL = "https://esgoo.net/api-tinhthanh";

export const fetchProvinces = async () => {
  const res = await fetch(`${BASE_URL}/1/0.htm`);
  const data = await res.json();

  if (data.error === 0) {
    return data.data;
  }

  throw new Error("Cannot fetch provinces");
};

export const fetchDistricts = async (provinceId) => {
  if (!provinceId || isNaN(Number(provinceId))) return [];

  try {
    const res = await fetch(`${BASE_URL}/2/${provinceId}.htm`);
    const data = await res.json();
    return data.error === 0 ? data.data : [];
  } catch {
    return [];
  }
};

export const fetchWards = async (districtId) => {
  if (!districtId || isNaN(Number(districtId))) return [];

  try {
    const res = await fetch(`${BASE_URL}/3/${districtId}.htm`);
    const data = await res.json();
    return data.error === 0 ? data.data : [];
  } catch {
    return [];
  }
};
