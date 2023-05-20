const specificContainer = document.querySelector(".specific-blog-container");

const postURL = "https://health-hub.karenjo.no/wp-json/wp/v2/posts?_embed";

const queryString = document.location.search;

const params = new URLSearchParams(queryString);

const id = params.get("id");

// get single post
async function fetchPost() {
  try {
    const response = await fetch(postURL);
    const post = await response.json();

    // get single post id
    const specificPost = post.find((post) => post.id === parseInt(id));

    console.log(specificPost);

    // loader
    specificContainer.innerHTML = "";

    const date = new Date(specificPost.date).toLocaleDateString(undefined, {
      // modify the date (chatGPT)
      day: "numeric",
      month: "short",
      year: "numeric",
    });

    specificContainer.innerHTML += `<div class="specific-content">
                                    <h1>${specificPost.title.rendered}</h1><p>Published on ${date}</p>
                                    <div class="content">${specificPost.content.rendered}</div>
                                    </div>`;

    const newPageTitle = `Health Hub | ${specificPost.slug}`;
    console.log(newPageTitle);
    document.title = newPageTitle;

    // Modal box

    const images = specificContainer.querySelectorAll(".content img");
    console.log({ images });

    images.forEach((image) => {
      image.addEventListener("click", (event) => {
        const modal = document.createElement("div");
        modal.classList.add("modal");

        const modalContent = document.createElement("div");
        modalContent.classList.add("modal-content");
        modalContent.innerHTML = `<img src="${event.target.src}" alt="${event.target.alt}">
    <span class="close">&times;</span>`;

        modal.append(modalContent);
        specificContainer.append(modal);

        const closeModalBtn = modal.querySelector(".close");

        closeModalBtn.addEventListener("click", () => {
          modal.remove();
        });

        modal.addEventListener("click", (event) => {
          if (event.target === modal) {
            modal.remove();
          }
        });
      });
    });
  } catch (error) {
    console.log(error);
    specificContainer.innerHTML = "An error occurred";
  }
}

fetchPost();
