// blogpost slider code with help from chatGPT

const sliderContainer = document.querySelector(".slides");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
let counter = 0;
let postsData;

// fetch the 6 latest blogposts
fetch("https://health-hub.karenjo.no/wp-json/wp/v2/posts?_embed&per_page=6")
  .then((response) => response.json())
  .then((posts) => {
    // storing the posts data in a variable to control the length of the posts arrays and the next btn
    postsData = posts;

    sliderContainer.innerHTML = " ";

    posts.slice(0, 3).forEach((post) => {
      const postElement = document.createElement("div");
      postElement.classList.add("slider-content");
      // link each blogpost to display in specific-blog.html with it's ID
      const postLink = document.createElement("a");
      postLink.href = `specific-blog.html?id=${post.id}`;

      postLink.innerHTML = `<h2>${post.title.rendered}</h2>
    <img src="${post._embedded["wp:featuredmedia"][0].source_url}" alt="${post.title.rendered}">
    <p>${post.excerpt.rendered}</p>
  `;
      postElement.append(postLink);
      sliderContainer.append(postElement);
    });

    // adding event listner to next button, displaying 3 blogposts
    const nextBtn = document.getElementById("nextBtn");
    nextBtn.addEventListener("click", () => {
      counter += 3;
      sliderContainer.innerHTML = "";

      // check if there are more blogposts to display
      if (counter >= postsData.length - 3) {
        nextBtn.disabled = true;
      }

      // display the next 3 blogposts
      posts.slice(counter, counter + 3).forEach((post) => {
        const postElement = document.createElement("div");
        postElement.classList.add("slider-content");

        const postLink = document.createElement("a");
        postLink.href = `specific-blog.html?id=${post.id}`;

        postLink.innerHTML = `<h2>${post.title.rendered}</h2>
        <img src="${post._embedded["wp:featuredmedia"][0].source_url}" alt="${post.title.rendered}">
        <p>${post.excerpt.rendered}</p>
      `;
        postElement.append(postLink);

        sliderContainer.append(postElement);
      });

      // enable the previous btn
      prevBtn.disabled = false;
    });

    // adding event listner to the prev btn
    const prevBtn = document.getElementById("prevBtn");
    prevBtn.addEventListener("click", () => {
      counter -= 3;
      sliderContainer.innerHTML = "";

      // checking if there are prev blogposts to display
      if (counter <= 0) {
        prevBtn.disabled = true;
      }

      // display the prev 3 blogposts
      posts.slice(counter, counter + 3).forEach((post) => {
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
        sliderContainer.append(postElement);
      });

      nextBtn.disabled = false;
    });
    // enable the next btn
    prevBtn.disabled = true;
  });
