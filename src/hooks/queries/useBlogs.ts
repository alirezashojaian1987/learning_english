import { useQuery } from "@tanstack/react-query";
import { blogService } from "@/services/blogs/blog.service";

export const useBlogs=()=>{
    return useQuery({
        queryKey:["blogs"],
        queryFn:blogService.getBlogs,
    });
};