export const buildProductFilters = (options = {}) => {
  const {
    search,
    status,
    categoryId,
    brandId,
    sort,
    page = 1,
    limit = 15,
  } = options;

  const params = { page, limit };

  if (search) params.search = search;
  if (status) params.status = status;
  if (categoryId) params.categoryId = categoryId;
  if (brandId) params.brandId = brandId;
  if (sort) params.sort = sort;

  return params;
};

export const sortOptions = [
  { value: "", label: "Mặc định" },
  { value: "name_asc", label: "Tên A → Z" },
  { value: "name_desc", label: "Tên Z → A" },
  { value: "price_asc", label: "Giá thấp → cao" },
  { value: "price_desc", label: "Giá cao → thấp" },
  { value: "newest", label: "Mới nhất" },
];
