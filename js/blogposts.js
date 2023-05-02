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
  title.innerHTML = blog.title.rendered;
  blogContent.append(title);

  // blog img
  // fetching each image with match(/src="([^"]+)"/) to extract the URL of the first img in the rendered content (chatGPT)
  const img = document.createElement("img");
  img.src = blog.content.rendered.match(/src="([^"]+)"/)[1];
  img.classList.add("blog-img");
  blogContent.append(img);

  //   // full size img popup (chatGPT)
  //   img.addEventListener("click", () => {
  //     const fullImg = document.querySelector(".full-img");
  //     fullImg.src = img.src;
  //     const popup = document.querySelector(".full-img-container");
  //     popup.style.display = "block";
  //   });

  //   //close img popup (chatGPT)
  //   const popup = document.querySelector(".full-img-container");
  //   const closeImgBtn = document.querySelector(".close-btn");
  //   popup.addEventListener("click", (event) => {
  //     if (event.target == popup) {
  //         popup.style.display = "none";
  //     }
  //     closeImgBtn.addEventListener("click", () => {
  //         popup.style.display = "none";
  //     });
  //   })

  // blog post date
  const postDate = new Date(blog.date).toLocaleDateString();
  blogContent.innerHTML = ` <h2>${blog.title.rendered}</div>
                            <img src="${img.src}" alt=""></div>                            
                           <h5>Published on ${postDate}</h5>
                            `;

  // blog description
  const description = document.createElement("div");
  description.innerHTML = blog.excerpt.rendered;
  blogContent.append(description);

  container.append(blogContent);
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
