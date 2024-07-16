import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Categories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios(`${import.meta.env.VITE_API_URL}/categories`);
        setCategories(res.data);
      } catch (error) {
        console.error("Error fetching category data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <section className="bg-white dark:bg-[#111827] text-gray-800 dark:text-white p-8 ">
      <div className="container mx-auto grid justify-center gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((category, index) => (
          <div
            key={index}
            className="flex flex-col items-center p-4 bg-white dark:bg-gradient-to-r dark:from-gray-900 dark:to-gray-700 border border-blue-500 rounded-lg shadow-md"
          >
            <h3 className="my-3 text-3xl font-semibold text-blue-500">
              {category}
            </h3>
            <p className="text-center text-grey-700 dark:text-white">
              {getCategoryDescription(category)}
            </p>
            <Link
              to={`/categories/${encodeURIComponent(category)}`}
              className="btn bg-blue-500 text-white uppercase font-bold mt-4 hover:bg-blue-700"
            >
              View Books
            </Link>
          </div>
        ))}
      </div>
      <div className="py-8"></div>
    </section>
  );
};

const getCategoryDescription = (category) => {
  const categoryDescriptions = {
    Fiction:
      "Immerse yourself in futuristic worlds, advanced technology, and otherworldly adventures.",
    Fantasy:
      "Embark on epic quests, encounter mythical creatures, and explore magical realms.",
    Thriller:
      "Experience heart-pounding suspense, thrilling mysteries, and unexpected twists.",
    Romance:
      "Discover tales of love, passion, and romance, filled with heartwarming moments and emotional journeys.",
    Historical:
      "Journey through the past, explore historical events, and delve into the lives of iconic figures.",
  };
  return categoryDescriptions[category] || "";
};

export default Categories;
