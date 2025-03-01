document.addEventListener("DOMContentLoaded", () => {
  const postTitle = document.getElementById("post-title");
  const postBody = document.getElementById("post-body");

  let postArr = [];

  function renderPosts() {
    let html = "";
    postArr
      .map((data) => {
        html += `
        <h3>${data.title}</h3>
        <p>${data.body}</p>
        <hr />
      `;
      })
      .join("");
    document.getElementById("container").innerHTML = html;
  }

  fetch("https://apis.scrimba.com/jsonplaceholder/posts")
    .then((res) => res.json())
    .then((data) => {
      postArr = data.slice(0, 5);
      renderPosts();
    });

  const container = document.getElementById("container");
  container.innerHTML = renderPosts();

  // const newPost = document.getElementById("new-post");

  document.getElementById("new-post").addEventListener("submit", function (e) {
    e.preventDefault();

    const title = postTitle.value;
    const body = postBody.value;

    const data = {
      title: title,
      body: body,
    };

    const options = {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };

    fetch("https://apis.scrimba.com/jsonplaceholder/posts", options)
      .then((request) => request.json())
      .then((data) => {
        postArr.unshift(data);
        renderPosts();

        postTitle.value = "";
        postBody.value = "";
      });
  });
});


/**
 * Challenge part 1: GET the current weather for your city with 
 * the Open Weather API and log it to the console.
 * 
 * BaseURL: https://apis.scrimba.com/openweathermap/data/2.5/
 * Endpoint: /weather
 * Query: ??? (https://openweathermap.org/current)
    * NOTE: It says you need to include `appid` in your query, but you can skip that this time
 */

fetch("https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=17.4117&lon=121.4384")
	.then(req => req.json())
	.then(data => console.log(data))