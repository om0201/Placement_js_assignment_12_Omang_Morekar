let blogsArr = [];
const blogListContainer = document.querySelector(".blog-list-container");
const blogTitle = document.querySelector(".add-blog-title-input");
const blogBody = document.querySelector(".add-blog-body-input");

let blogTitleValue = "";
let blogBodyValue = "";

blogTitle.addEventListener("input", (e) => {
  blogTitleValue = e.target.value;
});

blogBody.addEventListener("input", (e) => {
  blogBodyValue = e.target.value;
});

document.addEventListener("DOMContentLoaded", () => {
  const getInitiallData = async () => {
    try {
      const promise = await fetch("https://jsonplaceholder.typicode.com/posts");

      const res = await promise.json();

      const data = res.slice(0, 10);

      data.forEach((el) => {
        blogsArr.push(el);
      });

      if (blogsArr.length > 0) {
        blogsArr.map((blog, ind) => {
          blogListContainer.innerHTML += `
          <div id="blog-${ind}" class="blog">
            <div class="blog-text-container">
            <h3 class="blog-title">${blog.title}</h3>
            <p class="blog-text">
              ${blog.body}
            </p>
            </div>
            <div class="blog-btn-container">
              <button onclick="deleteBlog(${ind})" class="blog-delete-btn">
                  <img class="delete-blog-btn-img" src="./bin.svg" />
              </button>
            </div>
          </div>
          `;
        });
      }
    } catch (error) {
      throw new Error(error.message);
    }
  };

  getInitiallData();
});

const reRenderUI = () => {
  Array.from(blogListContainer.children).forEach((el) => el.remove());

  if (blogsArr.length > 0) {
    blogsArr.map((blog, ind) => {
      blogListContainer.innerHTML += `
      <div id="blog-${ind}" class="blog">
        <div class="blog-text-container">
        <h3 class="blog-title">${blog.title}</h3>
        <p class="blog-text">
          ${blog.body}
        </p>
        </div>
        <div class="blog-btn-container">
          <button onclick="deleteBlog(${ind})" class="blog-delete-btn">
              <img class="delete-blog-btn-img" src="./bin.svg" />
          </button>
        </div>
      </div>
      `;
    });
  }
};

function deleteBlog(id) {
  document.querySelector(`#blog-${id}`).remove();

  blogsArr.splice(id, 1);

  // const updatedArr = blogsArr.filter((blog, ind) => ind !== id);

  // blogsArr = updatedArr;
  // console.log(blogsArr);
  reRenderUI();
}

function addBlog() {
  if (!blogBodyValue || !blogTitleValue) return;

  blogsArr.unshift({
    title: blogTitleValue,
    body: blogBodyValue,
  });

  reRenderUI();
}
