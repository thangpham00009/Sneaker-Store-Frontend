import React from "react";
import { useParams } from "react-router-dom";

const CategoryPage = () => {
  const { slug } = useParams();

  return (
    <div className="container mx-auto my-10">
      <h1 className="text-2xl font-bold">Danh mục: {slug}</h1>
    </div>
  );
};

export default CategoryPage;
