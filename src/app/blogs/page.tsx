"use client";

import Link from "next/link";
import MainLayout from "@/components/layout/MainLayout/MainLayout";
import { useBlogs } from "@/hooks/queries/useBlogs";
import styles from "./Blogs.module.scss";

export default function BlogPage(){
    const{data:blogs,isLoading,error}=useBlogs();

    return(
        <MainLayout>
            <main className={styles.blogPage}>
                <section className={styles.hero}>
                    <span className={styles.badge}>Learning blog</span>
                    <h1>Tips, guides, and stories for English learners.</h1>
                    <p>
                        Read the latest articles about speaking, vocabulary, grammar,
                        study habits, and English learning strategies.
                    </p>
                </section>

                {isLoading && <p className={styles.state}>Loading articles...</p>}
                {error && <p className={styles.error}>Failed to load blog articles. Please try again later.</p>}

                {!isLoading && !error && blogs?.length===0 && (
                    <p className={styles.state}>No blog articles are available yet.</p>
                )}

                <section className={styles.grid}>
                    {blogs?.map((blog)=>(
                        <Link href={`/blog/${blog.id}`} className={styles.card} key={blog.id}>
                            <div className={styles.imageArea}>
                                {blog.picture ? (
                                    <img src={blog.picture} alt={blog.title}/>
                                ):(
                                    <span>📝</span>
                                )}
                            </div>

                            <div className={styles.content}>
                                <div className={styles.meta}>
                                    <span>{blog.category}</span>
                                    <span>{blog.difficulty_level}</span>
                                </div>

                                <h2>{blog.title}</h2>
                                <p>{blog.description}</p>

                                <div className={styles.footer}>
                                    <span>{new Date(blog.created_at).toLocaleDateString()}</span>
                                    <strong>Read article →</strong>
                                </div>
                            </div>
                        </Link>
                    ))}
                </section>
            </main>
        </MainLayout>
    );
}