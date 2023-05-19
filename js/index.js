// blog post slider code with help from chatGPT
function fetchAndDisplayBlogs(containerElement, limit) {
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
}
// function to create a post element
function createPostElement(post) {
  const postElement = document.createElement("div");
  postElement.classList.add("slider-content");

  const postLink = document.createElement("a");
  postLink.href = `specific-blog.html?id=${post.id}`;

  postLink.innerHTML = `
  <h2>${post.title.rendered}</h2>
  <img src="${post._embedded["wp:featuredmedia"][0].source_url}" alt="${post.title.rendered}">
  <p>${post.excerpt.rendered}</p>
`;

  postElement.append(postLink);

  return postElement;
}
// Fetch and display the latest posts in the "latest-container"
fetchAndDisplayBlogs(".latest-container", "", 6);

// Fetch and display the topic of the month posts in the "topic-container"
fetchAndDisplayBlogs(".topic-container", "topic", 3);

// Fetch and display the health posts in the "health-container"
fetchAndDisplayBlogs(".health-container", "health", 3);

// Fetch and display the lifestyle posts in the "lifestyle-container"
fetchAndDisplayBlogs(".lifestyle-container", "lifestyle", 3);
