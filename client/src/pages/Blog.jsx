
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { API_BASE_URL } from "../services/api";

const BLOG_API = `${API_BASE_URL}/api/blogs`;

// Fallbacks used when a post has no SEO fields of its own.
const DEFAULT_META = {
  title: "Blog | Whitehouse",
  description:
    "Explore practical tips, creative inspiration, and career guidance from the world of technology and digital media.",
};

// Calculate reading time
function estimateReadTime(content = "") {
  const text = content.replace(/<[^>]*>/g, " ");
  const words = text.trim().split(/\s+/).filter(Boolean);

  return `${Math.max(1, Math.ceil(words.length / 200))} min read`;
}

function escapeHtml(value = "") {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function isHtmlContent(content = "") {
  return /<(p|div|h[1-6]|ul|ol|li|br|strong|em|b|i|span|a|img|table|tr|td|blockquote|figure|section)\b[^>]*>/i.test(
    content
  );
}

/**
 * Turns the plain-text content written in the admin panel into article HTML:
 * blank lines start a new paragraph, "## " / "### " lines become headings.
 */
function textToHtml(content = "") {
  const blocks = [];
  let paragraph = [];

  const flushParagraph = () => {
    if (paragraph.length) {
      blocks.push(`<p>${paragraph.map(escapeHtml).join("<br />")}</p>`);
      paragraph = [];
    }
  };

  String(content)
    .replace(/\r\n/g, "\n")
    .split("\n")
    .forEach((line) => {
      const text = line.trim();
      const heading = text.match(/^(#{2,3})\s+(.+)$/);

      if (!text) {
        flushParagraph();
      } else if (heading) {
        flushParagraph();

        const tag = heading[1].length === 2 ? "h2" : "h3";
        blocks.push(`<${tag}>${escapeHtml(heading[2].trim())}</${tag}>`);
      } else {
        paragraph.push(text);
      }
    });

  flushParagraph();

  return blocks.join("");
}

// Generate heading IDs and Table of Contents
function prepareArticle(html = "") {
  if (typeof window === "undefined") {
    return { html, sections: [] };
  }

  const doc = new DOMParser().parseFromString(
    isHtmlContent(html) ? html : textToHtml(html),
    "text/html"
  );

  const sections = [];

  doc.body.querySelectorAll("h2, h3").forEach((heading, index) => {
    const id = `blog-heading-${index + 1}`;

    heading.id = id;

    sections.push({
      id,
      title: heading.textContent.trim() || `Section ${index + 1}`,
      level: heading.tagName.toLowerCase(),
    });
  });

  return {
    html: doc.body.innerHTML,
    sections,
  };
}

export default function Blog() {
  const [searchParams, setSearchParams] = useSearchParams();

  const selectedSlug = searchParams.get("post");

  const [blogs, setBlogs] = useState([]);
  const [selectedBlog, setSelectedBlog] = useState(null);

  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Keeps the list spinner alive when the page opens directly on a post URL.
  const openedWithPost = useRef(Boolean(searchParams.get("post")));

  // Fetch all blogs
  useEffect(() => {
    const controller = new AbortController();

    const loadBlogs = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(BLOG_API, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error("Unable to load blog posts.");
        }

        const data = await response.json();

        setBlogs(Array.isArray(data) ? data : []);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message || "Something went wrong.");
        }
      } finally {
        if (!controller.signal.aborted && !openedWithPost.current) {
          setLoading(false);
        }
      }
    };

    loadBlogs();

    return () => controller.abort();
  }, []);

  // Fetch individual blog
  useEffect(() => {
    if (!selectedSlug) {
      setSelectedBlog(null);
      setLoading(false);
      return;
    }

    const controller = new AbortController();

    const loadPost = async () => {
      try {
        setSelectedBlog(null);
        setLoading(true);
        setError("");

        const response = await fetch(
          `${BLOG_API}/${encodeURIComponent(selectedSlug)}`,
          { signal: controller.signal }
        );

        if (!response.ok) {
          if (response.status === 404) {
            throw new Error("Article not found or not published.");
          }

          throw new Error("Unable to load this article.");
        }

        const data = await response.json();

        setSelectedBlog(data);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message || "Unable to load this article.");
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    loadPost();

    return () => controller.abort();
  }, [selectedSlug]);

  // Prepare article headings and IDs
  const articleData = useMemo(() => {
    if (!selectedBlog) {
      return { html: "", sections: [] };
    }

    return prepareArticle(selectedBlog.content || "");
  }, [selectedBlog]);

  // Scroll to top when opening or closing an article
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, [selectedSlug]);

  // Apply the SEO meta title / description managed from the admin panel.
  useEffect(() => {
    const metaTag = document.querySelector('meta[name="description"]');
    const previousTitle = document.title;
    const previousDescription = metaTag ? metaTag.getAttribute("content") : "";

    const title = selectedBlog
      ? selectedBlog.metaTitle || selectedBlog.title || DEFAULT_META.title
      : DEFAULT_META.title;

    const description = selectedBlog
      ? selectedBlog.metaDescription || selectedBlog.excerpt || DEFAULT_META.description
      : DEFAULT_META.description;

    document.title = title;

    if (metaTag && description) {
      metaTag.setAttribute("content", description);
    }

    return () => {
      document.title = previousTitle;

      if (metaTag) {
        metaTag.setAttribute("content", previousDescription);
      }
    };
  }, [selectedBlog]);

  // Categories
  const categories = useMemo(() => {
    return [
      "All",
      ...new Set(
        blogs.map((blog) => blog.category).filter(Boolean)
      ),
    ];
  }, [blogs]);

  // Search and category filtering
  const filteredBlogs = useMemo(() => {
    const term = search.trim().toLowerCase();

    return blogs.filter((blog) => {
      const categoryMatch =
        category === "All" || blog.category === category;

      const searchable = [
        blog.title,
        blog.excerpt,
        blog.category,
        ...(Array.isArray(blog.tags) ? blog.tags : []),
      ]
        .join(" ")
        .toLowerCase();

      return categoryMatch && (!term || searchable.includes(term));
    });
  }, [blogs, category, search]);

  // Open article
  const openPost = (slug) => {
    setSearchParams({ post: slug });
  };

  // Back to blog listing
  const closePost = () => {
    setSearchParams({});
  };

  const readTime = selectedBlog
    ? selectedBlog.readTime || estimateReadTime(selectedBlog.content)
    : "";

  return (
    <>
      <Navbar activePage="blog" />

      <main className="blog-page" id="main">

        {/* HERO SECTION */}
        <section className="blog-hero">
          <div className="blog-orb blog-orb--one" aria-hidden="true" />
          <div className="blog-orb blog-orb--two" aria-hidden="true" />

          <div className="blog-shell blog-hero__content">
            <span className="blog-kicker">
              <span />
              WHITEHOUSE INSIGHTS
            </span>

            <h1>
              {selectedBlog ? (
                "Our Blog"
              ) : (
                <>
                  Ideas that inspire.
                  <br />
                  <span>Skills that move you forward.</span>
                </>
              )}
            </h1>

            <p>
              Explore practical tips, creative inspiration, and
              career guidance from the world of technology and
              digital media.
            </p>

            <div className="blog-hero__meta">
              <span>Learn something new</span>
              <i />
              <span>Build your future</span>
            </div>
          </div>
        </section>

        {/* LOADING */}
        {loading && (
          <div className="blog-shell blog-status" role="status">
            Loading articles...
          </div>
        )}

        {/* ERROR */}
        {!loading && error && (
          <div
            className="blog-shell blog-status blog-status--error"
            role="alert"
          >
            {error}
          </div>
        )}

        {/* SINGLE ARTICLE PAGE */}
        {!loading && !error && selectedSlug && selectedBlog && (
          <div className="blog-article-layout blog-shell">

            {/* TABLE OF CONTENTS */}
            <aside className="blog-toc" aria-label="Table of contents">
              <div className="blog-toc__inner">
                <span className="blog-toc__eyebrow">
                  ON THIS PAGE
                </span>

                <h3>Table of Contents</h3>

                <a href="#blog-overview">
                  Overview
                </a>

                {articleData.sections.map((section) => (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    className={
                      section.level === "h3"
                        ? "blog-toc__sub"
                        : ""
                    }
                  >
                    {section.title}
                  </a>
                ))}

                <a href="#blog-next-step">
                  Next step
                </a>
              </div>
            </aside>

            {/* ARTICLE CONTENT */}
            <article className="blog-article">

              <button
                className="blog-back"
                type="button"
                onClick={closePost}
              >
                ← Back to all articles
              </button>

              <div className="blog-article__category">
                {selectedBlog.category}
              </div>

              <h2>{selectedBlog.title}</h2>

              <div className="blog-card__meta">
                <span>
                  {selectedBlog.author || "Whitehouse Team"}
                </span>

                <i />

                <span>{readTime}</span>
              </div>

              {/* LARGE ARTICLE IMAGE */}
              {selectedBlog.image && (
                <img
                  className="blog-article__image"
                  src={selectedBlog.image}
                  alt={selectedBlog.imageAlt || selectedBlog.title}
                />
              )}

              {/* OVERVIEW */}
              <p
                className="blog-article__intro"
                id="blog-overview"
              >
                {selectedBlog.excerpt}
              </p>

              {/* DYNAMIC CONTENT */}
              <div
                className="blog-article__content"
                dangerouslySetInnerHTML={{
                  __html: articleData.html,
                }}
              />

              {/* NEXT STEP */}
              <div
                className="blog-article__cta"
                id="blog-next-step"
              >
                <div>
                  <span className="blog-kicker">
                    READY TO LEARN?
                  </span>

                  <h3>
                    Turn your interest into a practical skill.
                  </h3>
                </div>

                <Link to="/courses" className="blog-button">
                  Explore Courses <span>↗</span>
                </Link>
              </div>
            </article>
          </div>
        )}

        {/* BLOG LISTING */}
        {!loading && !error && !selectedSlug && (
          <section className="blog-content blog-shell">

            {/* HEADING AND SEARCH */}
            <div className="blog-section-heading">
              <div>
                <span className="blog-kicker">
                  THE LATEST
                </span>

                <h2>Explore our blogs</h2>

                <p>
                  Fresh ideas, useful guides, and inspiration
                  for your next step.
                </p>
              </div>

              <label className="blog-search">
                <span className="sr-only">Search articles</span>
                <span aria-hidden="true">⌕</span>

                <input
                  type="search"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search articles..."
                />
              </label>
            </div>

            {/* CATEGORY FILTERS */}
            <div
              className="blog-filters"
              aria-label="Filter articles by category"
            >
              {categories.map((item) => (
                <button
                  key={item}
                  type="button"
                  className={category === item ? "is-active" : ""}
                  aria-pressed={category === item}
                  onClick={() => setCategory(item)}
                >
                  {item}
                </button>
              ))}
            </div>

            {/* BLOG CARDS */}
            {filteredBlogs.length > 0 ? (
              <div className="blog-grid">
                {filteredBlogs.map((blog) => (
                  <article className="blog-card" key={blog.slug}>
                    <button
                      type="button"
                      className="blog-card__image-button"
                      onClick={() => openPost(blog.slug)}
                      aria-label={`Read ${blog.title}`}
                    >
                      {blog.image && (
                        <img
                          src={blog.image}
                          alt={blog.imageAlt || blog.title}
                          loading="lazy"
                          decoding="async"
                        />
                      )}

                      <span className="blog-card__image-tag">
                        {blog.category}
                      </span>
                    </button>

                    <div className="blog-card__body">
                      <div className="blog-card__meta">
                        <span>
                          {blog.author || "Whitehouse Team"}
                        </span>

                        <i />

                        <span>
                          {blog.readTime ||
                            estimateReadTime(blog.content)}
                        </span>
                      </div>

                      <h3>
                        <button
                          type="button"
                          onClick={() => openPost(blog.slug)}
                        >
                          {blog.title}
                        </button>
                      </h3>

                      <p>{blog.excerpt}</p>

                      <button
                        type="button"
                        className="blog-read-more"
                        onClick={() => openPost(blog.slug)}
                      >
                        Read article <span>↗</span>
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="blog-empty">
                <h3>No articles found</h3>

                <p>
                  {blogs.length
                    ? "Try another search or category."
                    : "New articles will appear here when published."}
                </p>

                <button
                  type="button"
                  onClick={() => {
                    setSearch("");
                    setCategory("All");
                  }}
                >
                  Clear filters
                </button>
              </div>
            )}
          </section>
        )}
      </main>

      <Footer />
    </>
  );
}
