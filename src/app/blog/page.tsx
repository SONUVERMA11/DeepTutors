"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./page.module.css";
import { blogArticles, type BlogCategory } from "@/data/blogArticles";

type Category = "All" | BlogCategory;

const categories: Category[] = [
  "All",
  "Study Tips",
  "Exam Prep",
  "Platform News",
  "For Tutors",
];

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState<Category>("All");

  const filtered =
    activeCategory === "All"
      ? blogArticles
      : blogArticles.filter((a) => a.category === activeCategory);

  return (
    <div className={styles.blogPage}>
      {/* ── Hero ── */}
      <section className={styles.heroSection}>
        <div className={`container ${styles.heroContent}`}>
          <span className={styles.heroBadge}>Blog & Resources</span>
          <h1 className={styles.heroTitle}>
            Insights for{" "}
            <span className={styles.heroTitleAccent}>Smarter Learning</span>
          </h1>
          <p className={styles.heroSubtitle}>
            Tips, strategies, and platform updates to help students excel and
            tutors thrive.
          </p>
        </div>
      </section>

      {/* ── Categories ── */}
      <section className={styles.categoriesSection}>
        <div className="container">
          <div className={styles.categoriesList}>
            {categories.map((cat) => (
              <button
                key={cat}
                className={`${styles.categoryBtn} ${
                  activeCategory === cat ? styles.categoryBtnActive : ""
                }`}
                onClick={() => setActiveCategory(cat)}
                id={`blog-cat-${cat.toLowerCase().replace(/\s/g, "-")}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Blog Grid ── */}
      <section className={styles.blogSection}>
        <div className="container">
          <div className={styles.blogGrid}>
            {filtered.length === 0 ? (
              <div className={styles.emptyState}>
                <span className={styles.emptyEmoji}>📭</span>
                <h3 className={styles.emptyTitle}>No articles yet</h3>
                <p className={styles.emptyText}>
                  Check back soon — we&apos;re always adding new content!
                </p>
              </div>
            ) : (
              filtered.map((article, i) => (
                <Link
                  key={article.slug}
                  href={`/blog/${article.slug}`}
                  className={styles.articleLink}
                >
                  <article
                  className={`${styles.articleCard} ${
                    i === 0 && activeCategory === "All"
                      ? styles.featuredCard
                      : ""
                  }`}
                >
                  <div
                    className={styles.articleImage}
                    style={{ backgroundImage: `url(${article.imageUrl})` }}
                    aria-label={article.imageAlt}
                  />
                  <div className={styles.articleBody}>
                    <div className={styles.articleMeta}>
                      <span
                        className={styles.articleCategory}
                        style={{
                          color: article.categoryColor,
                          background: article.categoryBg,
                        }}
                      >
                        {article.category}
                      </span>
                      <span className={styles.articleDate}>{article.date} · {article.readTime}</span>
                    </div>
                    <h2 className={styles.articleTitle}>{article.title}</h2>
                    <p className={styles.articleExcerpt}>{article.excerpt}</p>
                    <span className={styles.articleReadMore}>
                      Read More
                      <svg
                        className={styles.articleReadMoreArrow}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M5 12h14m-7-7 7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                  </article>
                </Link>
              ))
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
