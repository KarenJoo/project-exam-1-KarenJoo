// Fetch and display the latest posts in the "latest-container"
fetchAndDisplayBlogs(".latest-container", "", 6);

// fetch and display categories

// Fetch and display the topic of the month posts in the "topic-container"
fetchAndDisplayBlogs(".topic-container", 17, 1);

// Fetch and display the health posts in the "health-container"
fetchAndDisplayBlogs(".health-container", 22, 3);

// Fetch and display the lifestyle posts in the "lifestyle-container"
fetchAndDisplayBlogs(".lifestyle-container", 23, 3);

// blog post slider code with help from chatGPT
function fetchAndDisplayBlogs(containerElement, category, limit) {
  const container = document.querySelector(containerElement);
  const sliderContainer = container.querySelector(".slides");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  let counter = 0;
  let postsData;

  //fetch blog posts based on category (topic-, health-, and lifestyle-container)
  let apiURL =
    "https://health-hub.karenjo.no/wp-json/wp/v2/posts?_embed&per_page=6";

  // fetch the 6 latest blog posts
  fetch(apiURL)
    .then((response) => response.json())
    .then((posts) => {
      // storing the posts data in a variable to control the length of the posts arrays and the next btn
      postsData = posts;

      // Append the post element to the slider container
      sliderContainer.innerHTML = " ";

      posts.slice(0, 3).forEach((post) => {
        //creating the post element
        const postElement = createPostElement(post);
        sliderContainer.append(postElement);
      });

      // adding event listener to next button, displaying 3 blog posts

      nextBtn.addEventListener("click", () => {
        counter += 3;
        sliderContainer.innerHTML = "";

        // check if there are more blog posts to display
        if (counter >= postsData.length - 3) {
          nextBtn.disabled = true;
        }

        // display the next 3 blog posts
        posts.slice(counter, counter + 3).forEach((post) => {
          const postElement = createPostElement(post);
          sliderContainer.append(postElement);
        });

        // enable the previous btn
        prevBtn.disabled = false;
      });

      // adding event listener to the prev btn
      prevBtn.addEventListener("click", () => {
        counter -= 3;
        sliderContainer.innerHTML = "";

        // checking if there are prev blog posts to display
        if (counter <= 0) {
          prevBtn.disabled = true;
        }

        // display the prev 3 blog posts
        posts.slice(counter, counter + 3).forEach((post) => {
          // Create and append the post element
          const postElement = createPostElement(post);
          sliderContainer.append(postElement);
        });

        nextBtn.disabled = false;
      });
      // enable the next btn
      prevBtn.disabled = true;
    });

  if (category) {
    fetchAndDisplayCategoryBlogs(containerElement, category, limit);
  }
}

// fetch and display category blog posts in "topic-container" (chatGPT)
function fetchAndDisplayCategoryBlogs(containerElement, category, limit) {
  const container = document.querySelector(containerElement);
  const contentContainer = container.querySelector(".topic-content");

  const topicAPI = `https://health-hub.karenjo.no/wp-json/wp/v2/posts?_embed&categories=22&per_page=100`;

  fetch(topicAPI)
    .then((response) => response.json())
    .then((posts) => {
      contentContainer.innerHTML = "";

      posts.forEach((post) => {
        const postElement = createPostElement(post);
        contentContainer.append(postElement);
      });
    });
}

// function to create a post element
function createPostElement(post) {
  const postElement = document.createElement("div");
  postElement.classList.add("latest-blogpost");

  const postLink = document.createElement("a");
  postLink.href = `specific-blog.html?id=${post.id}`;

  postLink.innerHTML = `
  <h2>${post.title.rendered}</h2>
  <img src="${post._embedded["wp:featuredmedia"][0].source_url}" alt="${post.title.rendered}">
  <p>${post.excerpt.rendered}</p>
`;

  postElement.append(postLink);

  // style the single topic-div
  return postElement;
}
