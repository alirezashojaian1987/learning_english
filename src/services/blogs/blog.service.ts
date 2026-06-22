import { api } from "../api/api";
import { Blog } from "@/types/blog.types";

export const blogService={
    getBlogs:async():Promise<Blog[]>=>{
        const response=await api.get("/blogs/");
        return response.data;
    },
};