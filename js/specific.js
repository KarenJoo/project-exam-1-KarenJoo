const specificContainer = document.querySelector(".specific-blog-container");
const modal = document.querySelector(".modal");
const modalContent = document.querySelector(".modal-content");
const modalClose = modal.querySelector(".close");
const postURL = "https://health-hub.karenjo.no/wp-json/wp/v2/posts?_embed";
const imgURL = "https://health-hub.karenjo.no/wp-json/wp/v2/media/";

const queryString = window.document.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get("id");

// Fetch and display single post
async function fetchPost() {
  try {
    const response = await fetch(`${postURL}&include=${id}`);
    const post = await response.json();
    const specificPost = post[0];

    // get single post id
    /*     const specificPost = post.find((post) => post.id === parseInt(id));
     */
    const imgResponse = await fetch(`${imgURL}${specificPost.featured_media}`);
    const imgData = await imgResponse.json();

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
        modalContent.style.backgroundImage = `url(${image.src})`;
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
