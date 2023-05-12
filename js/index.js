// blogpost slider
const latestPostsContainer = document.querySelector(".latest-container");
const slides = document.querySelector(".slides");
const prevBtn = document.querySelector("#prevBtn");
const nextBtn = document.querySelector("#nextBtn");
const postItems = [];

// fetch the 6 latest blogposts
fetch("https://health-hub.karenjo.no/wp-json/wp/v2/posts?_embed&per_page=6")
  .then((response) => response.json())
  .then((posts) => {
    posts.forEach((post) => {
      const postItem = document.createElement("div");
      postItem.classList.add("post-item");
      postItem.innerHTML = `<a href="${post.link}">
    <img src="${post._embedded["wp:featuredmedia"][0].source_url}" alt="${post.title.rendered}">
          <h3>${post.title.rendered}</h3>
        </a>`;
      postItems.push(postItem);
    });
    // appending post items to latest container
    postItems.forEach((postItem) => {
      slides.append(postItem);
    });
    // slider using step to display 1 of the latest posts
    // maxposition displays the sliders total 6 latest posts
    let currentPosition = 0;
    const step = postItems[0].offsetWidth;
    const maxPosition = postItems.length - 1;

    prevBtn.addEventListener("click", () => {
      if (currentPosition > 0) {
        currentPosition--;
        slides.style.transform = `translateX(-${currentPosition * step}px)`;
        // moves the step to the new currentposition to view the next content
      }
    });

    nextBtn.addEventListener("click", () => {
      if (currentPosition < maxPosition) {
        currentPosition++;
        slides.style.transform = `translateX(-${currentPosition * step}px)`;
      }
    });
  });

// nextBtn.addEventListener("click", () => {
//   if (currentPosition < maxPosition) {
//     currentPosition++;
//     latestPostsContainer.style.transform = `translateX(-${
//       currentPosition * step
//     }px)`;
//   }
// });

// function to the slider with addeventlistner to prevBtn and nextBtn, and slideIndex to add functionality

let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides((slideIndex += n));
}

function showSlides(n) {
  const slides = latestPostsContainer.querySelectorAll(".post-item");

  if (n < slides.length) {
    slideIndex = 1;
  }

  if (n < 1) {
    slideIndex = slides.length;
  }

  slides.forEach((slide) => {
    slide.style.display = "none";
  });

  slides[slideIndex - 1].style.display = "block";
}

prevBtn.addEventListener("click", () => {
  plusSlides(-1);
});

nextBtn.addEventListener("click", () => {
  plusSlides(1);
});
