import React from "react";

export default function BlogSection() {
  const posts = [
    {
      id: 1,
      img: "/images/car-1.jpg",
      date: "Oct. 29, 2019",
      author: "Admin",
      comments: 3,
      title: "Why Lead Generation is Key for Business Growth",
      excerpt:
        "A small river named Duden flows by their place and supplies it with the necessary regelialia.",
      href: "#"
    },
    {
      id: 2,
      img: "/images/image_2.jpg",
      date: "Oct. 29, 2019",
      author: "Admin",
      comments: 3,
      title: "How to Choose the Right Car for Your Trip",
      excerpt:
        "It is a paradisematic country, in which roasted parts of sentences fly into your mouth.",
      href: "#"
    },
    {
      id: 3,
      img: "/images/car-4.jpg",
      date: "Oct. 29, 2019",
      author: "Admin",
      comments: 3,
      title: "Top Tips to Save on Daily Rentals",
      excerpt:
        "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia.",
      href: "#"
    }
  ];

  return (
    <section id="blog" aria-labelledby="blog-heading" className="w-full bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        {/* Eyebrow */}
        <p className="text-center text-xs tracking-[0.3em] font-semibold text-[#1089ff] uppercase">Bolog</p>
        {/* Heading */}
        <h2 id="blog-heading" className="mt-3 text-center text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900">
          Recent Blog
        </h2>

        {/* Grid */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {posts.map((post) => (
            <article key={post.id} className="group bg-white rounded-2xl overflow-hidden shadow-sm ring-1 ring-gray-100 hover:shadow-md transition-shadow duration-200 flex flex-col">
              <a href={post.href} className="block">
                <img
                  src={post.img}
                  alt={post.title}
                  className="w-full h-64 object-cover"
                  loading="lazy"
                />
              </a>
              <div className="p-6 sm:p-7 flex flex-col flex-1">
                {/* meta */}
                <div className="flex items-center gap-5 text-sm text-gray-500">
                  <span>{post.date}</span>
                  <span className="relative pl-5 before:content-['•'] before:absolute before:left-2 before:text-gray-300">{post.author}</span>
                  <span className="relative pl-5 before:content-['•'] before:absolute before:left-2 before:text-gray-300">{post.comments}</span>
                </div>
                {/* title */}
                <h3 className="mt-4 text-xl font-semibold text-gray-900 group-hover:text-[#1089ff]">
                  <a href={post.href}>{post.title}</a>
                </h3>
                {/* excerpt */}
                <p className="mt-3 text-sm leading-7 text-gray-600 flex-1">{post.excerpt}</p>
                {/* cta */}
                <div className="mt-6">
                  <a
                    href={post.href}
                    className="inline-flex items-center justify-center rounded-md bg-[#1089ff] text-white px-5 py-2.5 text-sm font-medium hover:bg-[#0e78db] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1089ff]"
                  >
                    Read more
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
