import React, { useEffect, useRef, useState } from "react";
import { uniqueValue } from "../types/Base";
import { Category } from "../types/Category";
import { Video } from "../types/Video";

type UseUniqueCategoriesHook = (
  videoState: Video,
  setVideoState: React.Dispatch<React.SetStateAction<Video>>,
  allCategories: Category[] | undefined
) => [
  uniqueCategories: Category[],
  setUniqueCategories: React.Dispatch<React.SetStateAction<Category[]>>
];

export const useUniqueCategories: UseUniqueCategoriesHook = (
  videoState,
  setVideoState,
  allCategories
) => {
  const [uniqueCategories, setUniqueCategories] = useState<Category[]>([]);
  const categoriesToKeyRef = useRef<Category[]>([]);
  const { genres, categories } = videoState;

  useEffect(() => {
    const categoryIds: uniqueValue = {};
    genres
      .flatMap(({ categories_id }) => categories_id)
      .forEach((id) => (categoryIds[id] = true));

    setUniqueCategories((allCategories || []).filter((c) => categoryIds[c.id]));
  }, [genres, allCategories]);

  useEffect(() => {
    const categoryIds: uniqueValue = {};
    uniqueCategories.forEach((category) => (categoryIds[category.id] = true));
    categoriesToKeyRef.current = categories.filter(
      (category) => categoryIds[category.id]
    );
  }, [uniqueCategories, categories]);

  useEffect(() => {
    setVideoState((state: Video) => ({
      ...state,
      categories: categoriesToKeyRef.current,
    }));
  }, [uniqueCategories, setVideoState]);

  return [uniqueCategories, setUniqueCategories];
};
