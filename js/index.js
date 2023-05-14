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

    // loader
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

        postElement.innerHTML = `<h2>${post.title.rendered}</h2>
        <img src="${post._embedded["wp:featuredmedia"][0].source_url}" alt="${post.title.rendered}">
        <p>${post.excerpt.rendered}</p>
      `;
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

      // display the rev 3 blogposts
      posts.slice(counter, counter + 3).forEach((post) => {
        const postElement = document.createElement("div");
        postElement.innerHTML = `
        <h2>${post.title.rendered}</h2>
        <img src="${post._embedded["wp:featuredmedia"][0].source_url}" alt="${post.title.rendered}">
        <p>${post.excerpt.rendered}</p>
      `;
        sliderContainer.appendChild(postElement);
      });

      nextBtn.disabled = false;
    });
    // enable the next btn
    prevBtn.disabled = true;
  });

//     posts.forEach((post, index) => {
//       if (index < 3) {
//         const postItem = document.createElement("div");
//         postItem.classList.add("post-item");
//         postItem.innerHTML = `<a href="${post.link}">
//     <img src="${post._embedded["wp:featuredmedia"][0].source_url}" alt="${post.title.rendered}">
//           <h3>${post.title.rendered}</h3>
//         </a>`;
//         postItems.push(postItem);
//       }
//     });
//     // appending post items to latest container
//     postItems.forEach((postItem) => {
//       slides.append(postItem);
//     });
//     // slider using step to display 1 of the latest posts
//     // maxposition displays the sliders total 3 latest posts
//     let currentPosition = 0;
//     const step = postItems[0].offsetWidth;

//     updateMaxPosition();

//     nextBtn[i].addEventListener("click", () => {
//       if (currentPosition < maxPosition) {
//         currentPosition++;
//         slides.style.transform = `translateX(-${currentPosition * step * 3}px)`;

//         if (currentPosition === Math.floor(postItems.length / 3) - 1 && postItems.length < posts.length) {

//             for (let i = currentPosition * 3; i < (currentPosition + 3) * 3 && i < posts.length; i++) {

//             const newPostItem = document.createElement("div");
//             newPostItem.classList.add("post-item");
//             newPostItem.innerHTML = `<a href="${posts[i].link}">
//             <img src="${posts[i]._embedded["wp:featuredmedia"][0].source_url}" alt="${posts[i].title.rendered}">
//             <h3>${posts[(postItems.length * 3) - 1].title.rendered}</h3>
//           </a>`;
//          slides.append(newPostItem);
//           postItems.push(newPostItem);
//          }
//           updateMaxPosition();
//         }

//       }
//     });
//   });
