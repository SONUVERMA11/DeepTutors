import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import styles from "./page.module.css";
import { blogArticles, getBlogBySlug } from "@/data/blogArticles";

type BlogPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return blogArticles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getBlogBySlug(slug);

  if (!article) {
    return {
      title: "Blog Not Found",
    };
  }

  return {
    title: article.title,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: "article",
      images: [article.imageUrl],
    },
  };
}

export default async function BlogArticlePage({ params }: BlogPageProps) {
  const { slug } = await params;
  const article = getBlogBySlug(slug);

  if (!article) {
    notFound();
  }

  return (
    <article className={styles.page}>
      <section className={styles.hero}>
        <div className="container">
          <Link href="/blog" className={styles.backLink}>
            ← Back to Blog
          </Link>
          <div className={styles.metaRow}>
            <span
              className={styles.category}
              style={{
                color: article.categoryColor,
                background: article.categoryBg,
              }}
            >
              {article.category}
            </span>
            <span className={styles.metaText}>{article.date} · {article.readTime}</span>
          </div>
          <h1 className={styles.title}>{article.title}</h1>
          <p className={styles.excerpt}>{article.excerpt}</p>
        </div>
      </section>

      <section className={styles.coverSection}>
        <div className="container">
          <div
            className={styles.cover}
            style={{ backgroundImage: `url(${article.imageUrl})` }}
            role="img"
            aria-label={article.imageAlt}
          />
        </div>
      </section>

      <section className={styles.contentSection}>
        <div className="container">
          <div className={styles.contentWrap}>
            {article.content.map((paragraph, index) => (
              <p key={index} className={styles.paragraph}>
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>
    </article>
  );
}
