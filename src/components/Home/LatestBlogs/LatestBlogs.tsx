"use client";

import { useBlogs } from "@/hooks/queries/useBlogs";
import Link from "next/link";
import styles from "./LatestBlogs.module.scss";

export default function LatestBlogs() {
    const { data, isLoading, error } = useBlogs();

    if (isLoading) return <p>Loading blogs...</p>;
    if (error) return <p>Failed to load blogs</p>;

    const blogs = data?.slice(0, 3);

    return (
        <section className={styles.latestBlogs}>
            <div className={styles.header}>
                <h2>Latest Blogs</h2>
                <p>Read more tips, guides and English learning articles <Link className={styles.blogsLink} href="/blogs">Blogs</Link></p>
            </div>

            <div className={styles.grid}>
                {blogs?.map((blog)=>(
                    <Link
                        key={blog.id}
                        href={`/blogs/${blog.id}`}
                        className={styles.card}
                    >
                        <div className={styles.imageWrapper}>
                            <img
                                src={blog.picture}
                                alt={blog.title}
                            />

                            <span className={styles.category}>
                                {blog.category}
                            </span>
                        </div>

                        <div className={styles.content}>
                            <h3>{blog.title}</h3>

                            <p>
                                {blog.description.slice(0, 90)}...
                            </p>

                            <div className={styles.footer}>
                                <span>
                                    {new Date(blog.created_at).toLocaleDateString()}
                                </span>

                                <span className={styles.readMore}>
                                    Read More →
                                </span>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
}