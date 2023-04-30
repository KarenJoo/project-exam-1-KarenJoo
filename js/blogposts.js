const apiBase = "http://health-hub.local";
const blogPosts = "/wp-json/wp/v2/posts";
const fullBlogURL = apiBase + blogPosts;
const blogPostsContainer = document.querySelector(".blog-container");

async function getBlogPosts() {
  try {
    const response = await fetch(fullBlogURL);
    const blogs = await response.json();
    console.log(blogs);

    return blogs;
  } catch (error) {
    console.log(error);
    blogPostsContainer.innerHTML = ("An error occurred", error);
  }
}

getBlogPosts();

function createBlogHTML(blog) {
  const container = document.querySelector(".blog-posts-container");
  const blogContent = document.createElement("div");
  blogContent.classList.add("blog");
  blogContent.id = blog.id;

  // blogpost title
  const title = document.createElement("h2");
  title.innerText = blog.title.rendered;
  blogContent.append(title);

  // blog content
  for (let i = 0; i < blog.content.rendered.length; i++) {
    const contentData = blog.content.rendered[i];
    const content = document.createElement("content");
    blogContent.append(content);
    container.append(blogContent);
  }
}

function createBlogsHTML(blogs) {
  for (let i = 0; i < blogs.length; i++) {
    const blog = blogs[i];
    createBlogHTML(blog);
  }
}

async function blogPage() {
  const blogs = await getBlogPosts();
  createBlogsHTML(blogs);
}

blogPage();
