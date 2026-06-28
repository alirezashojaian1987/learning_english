"use client";

import { useMemo } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import MainLayout from "@/components/layout/MainLayout/MainLayout";
import { useBlogs } from "@/hooks/queries/useBlogs";
import styles from "./blog.module.scss";

export default function BlogDetails(){
    const params=useParams<{id:string}>();
    const {data:blogs,isLoading,error}=useBlogs();
    const blog=useMemo(()=>blogs?.find((item)=>String(item.id)===String(params.id)),[blogs,params.id]);

    return(
        <MainLayout>
            <main className={styles.blogPage}>
                {isLoading && <p className={styles.state}>Loading blog...</p>}
                {error && <p className={styles.error}>Failed to load blog.</p>}
                {!isLoading && !error && !blog && <p className={styles.state}>Blog not found. <Link href="/blogs">Back to blogs</Link></p>}
                {blog && <article className={styles.article}>
                    {blog.picture && <img src={blog.picture} alt={blog.title}/>}<div className={styles.content}>
                        <span>{blog.category} · {blog.difficulty_level}</span><h1>{blog.title}</h1>
                        <p className={styles.meta}>By {blog.author} · {new Intl.DateTimeFormat("en",{dateStyle:"medium"}).format(new Date(blog.created_at))}</p>
                        <p className={styles.description}>{blog.description}</p><div className={styles.body}>{blog.content}</div>
                    </div>
                </article>}
            </main>
        </MainLayout>
    )
}