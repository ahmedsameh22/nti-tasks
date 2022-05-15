const mainURL = "https://jsonplaceholder.typicode.com/";
const apis = [
  {
    urlKeyWord: "posts",
    showKeyWord: "Posts Data",
    classes: "btn btn-danger mx-3",
    Headers: ["userId", "id", "title", "body"],
  },
  {
    urlKeyWord: "users",
    showKeyWord: "Users Data",
    classes: "btn btn-warning mx-3",
    Headers: [
      "id",
      "name",
      "username",
      "email",
      ["street", "suite", "city", "zipcode"],
      "phone",
      "website",
    ],
  },
  {
    urlKeyWord: "photos",
    showKeyWord: "Photos Data",
    classes: "btn btn-success mx-3",
    Headers: ["albumId", "id", "title", "url", "thumbnailUrl"],
  },
  {
    urlKeyWord: "todos",
    showKeyWord: "ToDos Data",
    classes: "btn btn-dark mx-3",
    Headers: ["userId", "id", "title", "completed"],
  },
];
const Buttons = document.querySelector("#Buttons");
const data = document.querySelector("#data");
apis.forEach((api) => {
  btn = document.createElement("button");
  btn.innerText = api.showKeyWord;
  btn.classList = api.classes;
  Buttons.appendChild(btn);
  btn.addEventListener("click", async () => {
    try {
      let myResult = await (await fetch(`${mainURL}${api.urlKeyWord}`)).json();
      let tr = document.querySelector("#tr");
      tr.innerHTML = "";
      api.Headers.forEach((head) => {
        if (typeof head === "string") {
          let th = document.createElement("th");
          th.innerHTML = head;
          tr.appendChild(th);
        } else {
          head.forEach((h) => {
            let th = document.createElement("th");
            th.innerHTML = h;
            tr.appendChild(th);
          });
        }
      });
      let showData = await myResult;
      let tbody = document.querySelector("#tbody");
      tbody.innerHTML = "";
      showData.forEach((ele) => {
        let tr = document.createElement("tr");
        tbody.appendChild(tr);
        api.Headers.forEach((head) => {
          let td = document.createElement("td");
          if (typeof head === "string") {
            td.innerHTML = ele[head];
            tr.appendChild(td);
          } else {
            head.forEach((h) => {
              let td = document.createElement("td");
              td.innerHTML = ele.address[h];
              tr.appendChild(td);
            });
          }
        });
      });
    } catch (e) {
      console.log(e);
    }
  });
});
