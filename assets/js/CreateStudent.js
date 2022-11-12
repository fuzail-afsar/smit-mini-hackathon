const form = document.getElementsByTagName("form")[0];

class CreateClass extends Main {
  #formValidation = new FormValidation(form);
  constructor() {
    super();
    this.#init();
  }

  async #init() {
    await this._init();
    this.#initEvents();
    this.#renderClassDataInForm();
  }

  #initEvents() {
    form.addEventListener("submit", this.#formSubmitHandler.bind(this));
  }

  async #renderClassDataInForm() {
    await this._fireBase.getClasses((classes) => {
      let teacherOptionHtml = "";
      classes.forEach(({ id, teacher_name, course_name }) => {
        teacherOptionHtml += this.#selectOptionHtml(teacher_name, id);
      });

      document
        .getElementsByName("teachersName")[0]
        .insertAdjacentHTML("beforeend", teacherOptionHtml);
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

      await this._fireBase.createStudent({
        name: name.value,
        father_name: fatherName.value,
        roll_no: rollNo.value,
        contact_number: contactNumber.value,
        cnic: cnicNo.value,
        course: courseName.value,
        class_id: teachersName.value,
      });
      window.location.assign("students.html");
    } catch (error) {
      console.log(error);
      console.log(error.message);
    } finally {
      this._hideLoader();
    }
  }
}
(() => new CreateClass())();
