const tbodyElem = document.getElementsByTagName("tbody")[0];
class Classes extends Main {
  constructor() {
    super();
    this.#init();
  }

  async #init() {
    await this._init();
    this.#initEvents();
    this.#renderClassesInDom();
  }

  #initEvents() {
    tbodyElem.addEventListener("click", this.#tbodyElemClickHandler.bind(this));
  }

  async #renderClassesInDom() {
    await this._fireBase.getClasses((classes) => {
      let html = "";
      classes.forEach((data, index) => {
        html += this.#classRowHtml(data, index);
      });
      tbodyElem.innerHTML = html;
    });
  }

  #classRowHtml(data, index) {
    const { id, teacher_name, course_name, batch_number } = data;
    return `
    <tr>
        <th scope="row">${index + 1}</th>
        <td>${teacher_name}</td>
        <td>${course_name}</td>
        <td>${batch_number}</td>
        <td>
        <a href="./edit-class.html?id=${id}" type="button" class="btn btn-primary">
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
    await this._fireBase.deleteClass(id);
  }
}
(() => new Classes())();
