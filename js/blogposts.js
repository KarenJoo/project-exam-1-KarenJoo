const apiBase = "https://health-hub.karenjo.no";
const blogPosts = "/wp-json/wp/v2/posts";
const fullBlogURL = apiBase + blogPosts;
const blogPostsContainer = document.querySelector(".blog-posts-container");
let pageNumber = 1;
let postsPerPage = 10;

// fetch all blogposts
async function getBlogPosts() {
  const loaderElements = document.querySelectorAll(".loader");
  const loaderArray = Array.from(loaderElements);
  try {
    // Display the loaders (chatGPT)
    loaderArray.forEach((loader) => {
      loader.style.display = "block";
    });

    const response = await fetch(
      `${fullBlogURL}?per_page=${postsPerPage}&page=${pageNumber}`
    );
    const blogs = await response.json();
    console.log(blogs);

    displayBlogs(0, postsPerPage, blogs);

    // Hide the loaders once the content is fetched
    loaderArray.forEach((loader) => {
      loader.style.display = "none";
    });
  } catch (error) {
    console.log(error);
    blogPostsContainer.textContent = `An error occurred", ${error}`;
    // Hide the loaders in case of an error
    loaderArray.forEach((loader) => {
      loader.style.display = "none";
    });
  }
}

getBlogPosts();

function createBlogHTML(blog) {
  const container = document.querySelector(".blog-posts-container");
  const blogContent = document.createElement("div");
  blogContent.classList.add("blog");
  blogContent.id = blog.id;

  // blogpost container link
  const blogLink = document.createElement("a");
  blogLink.href = `specific-blog.html?id=${blog.id}`;

  // blogpost title
  const title = document.createElement("h2");
  title.innerHTML = blog.title.rendered;
  blogLink.append(title);

  // blog img
  // fetching each image with match(/src="([^"]+)"/) to extract the URL of the first img in the rendered content (chatGPT)

  // creating imgContainer to display the specific img from the api
  const imgContainer = document.createElement("div");
  imgContainer.innerHTML = blog.content.rendered;
  const img = imgContainer.querySelector("img");
  const imgSrcMatch = blog.content.rendered.match(
    /<img[^>]+src=["']([^"']+)["']/i
  );
  if (img) {
    img.src = img.src;
    img.alt = blog.title.rendered;
    img.classList.add("blog-img");
  } else {
    console.log("Image source not found:", blog);
  }

  // blog post date
  const postDate = new Date(blog.date).toLocaleDateString();
  const date = document.createElement("h5");
  date.textContent = `Published on ${postDate}`;

  // blog description
  const excerpt = document.createElement("p");
  excerpt.innerHTML = blog.excerpt.rendered;

  // appending the elements in the right order
  blogContent.append(blogLink);
  blogContent.append(title);
  blogContent.append(img);
  blogContent.append(date);
  blogContent.append(excerpt);
  blogContent.append(blogLink);
  container.append(blogContent);

  // make the entire blog container clickable
  blogContent.addEventListener("click", (event) => {
    event.preventDefault();
    window.location.href = blogLink.href;
  });
}

// view button displays all fetched blogposts (chatGPT)
// event listener added with a click event, increases the value of pagenr
const viewMoreBtn = document.querySelector(".view-more-btn");
viewMoreBtn.addEventListener("click", () => {
  pageNumber++;
  getBlogPosts();
});

// for loop to display the specified nr of blogposts on the page
function displayBlogs(startIndex, numToDisplay, blogs) {
  for (
    let i = startIndex;
    i < startIndex + numToDisplay && i < blogs.length;
    i++
  ) {
    const blog = blogs[i];
    createBlogHTML(blog);
  }
}
