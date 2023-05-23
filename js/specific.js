const specificContainer = document.querySelector(".specific-blog-container");
const modal = document.querySelector(".modal");
const modalImage = modal.querySelector(".modal-image");
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

    const imgResponse = await fetch(imgURL + specificPost.featured_media);
    const imgData = await imgResponse.json();
    const imageURL = imgData.source_url;

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

    // event listener to add each img

    images.forEach((image) => {
      image.addEventListener("click", () => {
        console.log("Image clicked!");
        modalImage.src = image.src;
        modal.classList.add("show");
      });
    });

    // event listener for closing the modal (chatGPT)
    modalClose.addEventListener("click", () => {
      modal.classList.remove("show");
    });

    modal.addEventListener("click", (event) => {
      if (event.target === modal) {
        modal.classList.remove("show");
      }
    });
  } catch (error) {
    console.log(error);
    specificContainer.innerHTML = "An error occurred";
  }
}

fetchPost();
