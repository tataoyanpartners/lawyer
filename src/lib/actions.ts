import { Blogs, Partner } from "@/types/items";
import axios from "axios";

export const fetchBlogs = async (): Promise<Blogs[]> => {
  try {
    const response = await axios.get("/api/blogs");
    return response.data;
  } catch (error) {
    throw new Error("Error fetching Blogs:");
  }
};
