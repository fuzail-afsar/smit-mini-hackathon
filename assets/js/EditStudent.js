const form = document.getElementsByTagName("form")[0];

class EditStudent extends Main {
  #formValidation = new FormValidation(form);
  #id;
  constructor() {
    super();
    this.#init();
  }

  async #init() {
    await this._init();
    this.#id = Helper.getParams().id;
    if (!this.#id) return window.location.assign("students.html");
    this.#renderClassDataInDom(this.#id);
    this.#initEvents();
  }

  #initEvents() {
    form.addEventListener("submit", this.#formSubmitHandler.bind(this));
  }

  async #renderClassDataInDom(id) {
    const teachersNameElem = document.getElementsByName("teachersName")[0];

    await this._fireBase.getClasses((classes) => {
      let teacherOptionHtml = "";
      classes.forEach(({ id, teacher_name }) => {
        teacherOptionHtml += this.#selectOptionHtml(teacher_name, id);
      });

      teachersNameElem.insertAdjacentHTML("beforeend", teacherOptionHtml);
    });

    await this._fireBase.getStudent(id, (data) => {
      const {
        name,
        father_name,
        roll_no,
        contact_number,
        cnic,
        course,
        class_id,
      } = data;
      const [
        nameElem,
        fatherNameElem,
        rollNoElem,
        contactNumberElem,
        cnicNoElem,
        courseNameElem,
      ] = form.getElementsByTagName("input");

      // Set Form Values
      nameElem.value = name;
      fatherNameElem.value = father_name;
      rollNoElem.value = roll_no;
      contactNumberElem.value = contact_number;
      cnicNoElem.value = cnic;
      courseNameElem.value = course;
      teachersNameElem.value = class_id;
    });
  }

  #selectOptionHtml(label, value) {
    return `
    <option value="${value}">
        ${label}
    </option>`;
  }

  //   Handlers
  async #formSubmitHandler(event) {
    if (!this.#formValidation.isValidated()) return;
    try {
      this._showLoader();
      const [
        name,
        fatherName,
        rollNo,
        contactNumber,
        cnicNo,
        courseName,
        teachersName,
      ] = event.target;

      await this._fireBase.editStudent(this.#id, {
        name: name.value,
        father_name: fatherName.value,
        roll_no: rollNo.value,
        contact_number: contactNumber.value,
        cnic: cnicNo.value,
        course: courseName.value,
        class_id: teachersName.value,
      });
    } catch (error) {
      console.log(error);
      console.log(error.message);
    } finally {
      this._hideLoader();
    }
  }
}
(() => new EditStudent())();
