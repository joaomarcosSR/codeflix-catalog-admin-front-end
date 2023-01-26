import { Genre } from "../../types/Genre";

export function mapGenreToRequest(genre: Genre): {
  name: string;
  categories_id: string[];
  is_active: boolean;
} {
  return {
    name: genre.name,
    categories_id: genre.categories.map((category) => category.id),
    is_active: genre.is_active,
  };
}

describe("Genre Utils", () => {
  it("should convert toRequest correctly", () => {
    const mockGenre = {
      id: "1",
      name: "Test",
      categories: [
        {
          id: "1",
          name: "Category 1",
          description: null,
          is_active: true,
          created_at: "2022-10-01T00:00:00",
          deleted_at: null,
        },
        {
          id: "2",
          name: "Category 2",
          description: null,
          is_active: true,
          created_at: "2022-10-01T00:00:00",
          deleted_at: null,
        },
      ],
      is_active: false,
      created_at: "2022-10-01T00:00:00",
      updated_at: "2022-10-01T00:00:00",
      deleted_at: null,
    };

    const expectedRequest = {
      name: "Test",
      categories_id: ["1", "2"],
      is_active: false,
    };

    expect(mapGenreToRequest(mockGenre)).toEqual(expectedRequest);
  });
});
