class Classes extends Main {
  constructor() {
    super();
    this.#init();
  }

  async #init() {
    await this._init();
    this.#loadClasses();
  }

  async #loadClasses() {
    await this._fireBase.getClasses((classes) => console.log(classes));
  }

  #classRowHtml(data) {
    const {
      teacher_name,
      section_name,
      course_name,
      batch_number,
      timings,
      schedule,
    } = data;
    return `
    <tr>
        <th scope="row">1</th>
        <td>${teacher_name}</td>
        <td>${course_name}</td>
        <td>${batch_number}</td>
        <td>
        <button type="button" class="btn btn-primary">
            <i class="las fs-5 la-eye"></i>
        </button>
        <button type="button" class="btn btn-danger">
            <i class="las fs-5 la-trash-alt"></i>
        </button>
        </td>
    </tr>`;
  }
}
(() => new Classes())();
