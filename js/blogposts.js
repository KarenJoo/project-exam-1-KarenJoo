const apiBase = "http://health-hub.karenjo.no";
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

  // blog post date
  const postDate = new Date(blog.date).toLocaleDateString();
  blogContent.innerHTML = ` 
                            <h2><a href="specific-blog.html?id=${blog.id}">${blog.title.rendered}</h2>
                            <img src="${img.src}" alt="">                            
                            <h5>Published on ${postDate}</h5>
                            <p>${blog.excerpt.rendered}</p>
                            `;

                        
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
const numPostsToFetch = 10;

await createBlogsHTML(blogs.slice(0, numPostsToFetch));

const viewMoreBtn = document.getElementById("view-more-btn");

viewMoreBtn.addEventListener("click", async function(event) {
  event.preventDefault();

  const startIndex = numPostsToFetch;
  const endIndex = startIndex + numPostsToFetch;


  if(startIndex < blogs.length) {
    const newBlogs = blogs.slice(startIndex, endIndex);
    const newBlogContainer = document.createElement("div");

    for (let i = 0; i < newBlogs.length; i++) {
      const blog = newBlogs[i];
      const blogContent = await createBlogHTML(blog);
      newBlogContainer.append(blogContent);
    }

    blogPostsContainer.append(newBlogContainer);
    numPostsToFetch += 10;

    if(numPostsToFetch >= blogs.length) {
      viewMoreBtn.style.display = "none";
    }
  }
});

/*   createBlogsHTML(blogs);
 */}

blogPage();


