const specificContainer = document.querySelector(".specific-blog-container");
const modal = document.querySelector(".modal");
const modalContent = document.querySelector(".modal-content");
const modalClose = modal.querySelector(".close");
const postURL = "https://health-hub.karenjo.no/wp-json/wp/v2/posts?_embed";
const imgURL = "https://health-hub.karenjo.no/wp-json/wp/v2/media/";

const queryString = document.location.search;

const params = new URLSearchParams(queryString);

const id = params.get("id");

// Fetch and display single post
async function fetchPost() {
  try {
    const response = await fetch(postURL);
    const post = await response.json();

    // get single post id
    const specificPost = post.find((post) => post.id === parseInt(id));



    // loader
    specificContainer.innerHTML = "";

    const date = new Date(specificPost.date).toLocaleDateString(undefined, {
      // modify the date (chatGPT)
      day: "numeric",
      month: "short",
      year: "numeric",
    });

    specificContainer.innerHTML = `<div class="specific-content">
                                    <h1>${specificPost.title.rendered}</h1><p>Published on ${date}</p>
                                    <div class="content">${specificPost.content.rendered}</div>
                                    </div>`;

    const newPageTitle = `Health Hub | ${specificPost.slug}`;
    console.log(newPageTitle);
    document.title = newPageTitle;

    const images = specificContainer.querySelectorAll(".content img");

  imgs.forEach(function (image) {
    image.addEventlistener("click", () => {
modal.style.display = "block";
modalContent.querySelector(".modal-img").src = image.src;
    });
  });

  modalClose.addEventListener("click", (event) => {
    if (event.target === modal) {
    modal.style.display = "none";
  }
  });

  window.addEventListener("click", (event) => {
    if(event.target === modal) {
      modal.style.display = "none";
    }
  });
    
  } catch (error) {
    console.log(error);
    specificContainer.innerHTML = "An error occurred";
  }
}

fetchPost();
