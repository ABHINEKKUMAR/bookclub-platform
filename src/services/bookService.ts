import api from "@/lib/api";

export const getBooks = async () => {
  const res =
    await api.get("/books");

  return res.data;
};

export const createBook =
  async (data: Record<string, unknown>) => {
    const res =
      await api.post("/books", data);

    return res.data;
  };

export const updateBook =
  async (id: string, data: Record<string, unknown>) => {
    const res =
      await api.put(
        `/books/${id}`,
        data
      );

    return res.data;
  };

export const deleteBook =
  async (id: string) => {
    const res =
      await api.delete(
        `/books/${id}`
      );

    return res.data;
  };
