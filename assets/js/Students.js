const tbodyElem = document.getElementsByTagName("tbody")[0];
class Classes extends Main {
  constructor() {
    super();
    this.#init();
  }

  async #init() {
    await this._init();
    this.#initEvents();
    this.#renderStudentsInDom();
  }

  #initEvents() {
    tbodyElem.addEventListener("click", this.#tbodyElemClickHandler.bind(this));
  }

  async #renderStudentsInDom() {
    await this._fireBase.getStudents((students) => {
      let html = "";
      students.forEach((data, index) => {
        html += this.#studentRowHtml(data, index);
      });
      tbodyElem.innerHTML = html;
    });
  }

  #studentRowHtml(data, index) {
    const { id, name, father_name, cnic } = data;
    return `
    <tr>
        <th scope="row">${index + 1}</th>
        <td>${name}</td>
        <td>${father_name}</td>
        <td>${cnic}</td>
        <td>
        <a href="./edit-student.html?id=${id}" type="button" class="btn btn-primary">
            <i class="las fs-5 la-eye"></i>
        </a>
        <button type="button" data-id="${id}" class="delete btn btn-danger">
            <i class="las fs-5 la-trash-alt"></i>
        </button>
        </td>
    </tr>`;
  }

  //   Handlers
  async #tbodyElemClickHandler(event) {
    const { target } = event;

    const deleteBtnElem = target.closest(".delete");

    if (!deleteBtnElem) return;
    const { id } = deleteBtnElem.dataset;
    await this._fireBase.deleteStudent(id);
  }
}
(() => new Classes())();
