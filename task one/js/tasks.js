const addForm = document.querySelector("#addForm");
const allTasks = [];
const writeToLocalStorge = (data) => {
  localStorage.setItem("task", JSON.stringify(data));
};
const readFromStorage = () => {
  let data;
  try {
    data = JSON.parse(localStorage.getItem("task")) || [];
    if (!Array.isArray(data)) throw new Error("no data");
  } catch (e) {
    data = [];
  }
  return data;
};
const oldtask = readFromStorage();
allTasks.push(...oldtask);
let tabelHaeder = [
  { el: "title", viewEl: "Title", hasDeafult: false },
  { el: "id", viewEl: "ID", hasDeafult: true, Deafult: Date.now() },
  { el: "content", viewEl: "Content", hasDeafult: false },
  { el: "status", viewEl: "Status", hasDeafult: true, Deafult: false },
  { el: "dueDate", viewEl: "End Date", hasDeafult: false },
  { el: null, viewEl: "Actions", hasDeafult: true },
];
if (addForm) {
  addForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const task = {};
    tabelHaeder.forEach((head) => {
      if (head.hasDeafult && head.el) task[head.el] = head.Deafult;
      else if (!head.hasDeafult)
        task[head.el] = addForm.elements[head.el].value;
    });
    allTasks.push(task);
    writeToLocalStorge(allTasks);
    addForm.reset();
    window.location.href = "index.html";
  });
}
const createMyOwnElement = (parent, element, classes, txt, atts = []) => {
  let ele = document.createElement(element);
  if (classes) ele.classList = classes;
  ele.innerHTML = txt;
  parent.appendChild(ele);
  atts.forEach((att) => {
    ele[att.attrName] = att.attrVal;
  });
  return ele;
};
const editForm = document.querySelector("#editForm");
const AddDataToForm = (data) => {
  tabelHaeder.forEach((head) => {
    if (head.hasDeafult && head.el) {
    } else if (!head.hasDeafult)
      editForm.elements[head.el].value = data[head.el];
  });
};
if (editForm) {
  let index = parseInt(localStorage.getItem("id"));
  AddDataToForm(allTasks[index]);
  editForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let Data = readFromStorage();
    console.log(Data[index]);
    tabelHaeder.forEach((head) => {
      if (head.hasDeafult && head.el) {
      } else if (!head.hasDeafult)
        Data[index][head.el] = editForm.elements[head.el].value;
    });
    writeToLocalStorge(Data);
    window.location.href = "index.html";
  });
}

const showData = () => {
  dataWrap.innerHTML = "";
  const thead = createMyOwnElement(dataWrap, "thead", null, null);
  const tr = createMyOwnElement(thead, "tr", null, null);
  tabelHaeder.forEach((th) => {
    createMyOwnElement(tr, "th", null, th.viewEl);
  });
  const tbody = createMyOwnElement(dataWrap, "tbody", null, null);
  allTasks.forEach((h, i) => {
    const tr = createMyOwnElement(tbody, "tr", null, null);
    tabelHaeder.forEach((th) => {
      if (th.el) createMyOwnElement(tr, "td", null, h[th.el]);
    });
    const td = createMyOwnElement(tr, "td", null, null);
    const delBtn = createMyOwnElement(
      td,
      "button",
      "btn btn-danger mx-2",
      "delete"
    );
    delBtn.addEventListener("click", () => {
      allTasks.splice(i, 1);
      writeToLocalStorge(allTasks);
      showData();
    });
    const showBtn = createMyOwnElement(
      td,
      "button",
      "btn btn-success mx-2",
      "show"
    );
    showBtn.addEventListener("click", () => {
      localStorage.setItem("id", i);
      window.location.href = "single.html";
    });
    const editBtn = createMyOwnElement(
      td,
      "button",
      "btn btn-warning mx-2",
      "edit"
    );
    editBtn.addEventListener("click", () => {
      localStorage.setItem("id", i);
      window.location.href = "editForm.html";
    });
    const ChangeBtn = createMyOwnElement(
      td,
      "button",
      "btn btn-primary mx-2",
      "change"
    );
    ChangeBtn.addEventListener("click", () => {
      allTasks[i].status = !allTasks[i].status;
      writeToLocalStorge(allTasks);
      showData();
    });
  });
};
dataWrap = document.querySelector("#dataWrap");
if (dataWrap) {
  showData();
}
const singleData = document.querySelector("#singleData");
if (singleData) {
  let getIndex = parseInt(localStorage.getItem("id"));
  showSingle(allTasks[getIndex]);
}
function showSingle(data) {
  console.log(data);
  let masterDiv = createMyOwnElement(singleData, "div", null, null);
  masterDiv.innerHTML = `
        <div class="alert alert-primary">
            <h4> ID : ${data.id}</h4>
            <h6> Title : ${data.title}</h6>
            <h6> Content : ${data.content}</h6>
            <h6> Status : ${data.status}</h6>
            <h6> End date : ${data.dueDate}</h6>
        </div>
        `;
}
