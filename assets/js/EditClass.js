const form = document.getElementsByTagName("form")[0];

class EditClass extends Main {
  #formValidation = new FormValidation(form);
  #id;
  constructor() {
    super();
    this.#init();
  }

  async #init() {
    await this._init();
    this.#id = Helper.getParams().id;
    if (!this.#id) return window.location.assign("classes.html");
    this.#renderClassDataInDom(this.#id);
    this.#initEvents();
  }

  #initEvents() {
    form.addEventListener("submit", this.#formSubmitHandler.bind(this));
  }

  #renderClassDataInDom(id) {
    this._fireBase.getClass(id, (data) => {
      const {
        teacher_name,
        section_name,
        course_name,
        batch_number,
        timings: time,
        schedule,
      } = data;
      const [teachersName, sectionName, courseName, batchNumber, timings] =
        form.getElementsByTagName("input");

      // Set Form Values
      teachersName.value = teacher_name;
      sectionName.value = section_name;
      courseName.value = course_name;
      batchNumber.value = batch_number;
      timings.value = time;
      schedule.forEach((sch) => {
        const scheduleElem = document.getElementById(sch.toLowerCase());
        if (scheduleElem) scheduleElem.checked = true;
      });
    });
  }

  //   Handlers
  async #formSubmitHandler(event) {
    if (!this.#formValidation.isValidated()) return;
    try {
      this._showLoader();
      const [teachersName, sectionName, courseName, batchNumber, timings] =
        event.target;
      const schedule = [];
      document
        .querySelectorAll('input[name="schedule"]:checked')
        .forEach((sch) => schedule.push(sch.value));

      await this._fireBase.editClass(this.#id, {
        teacher_name: teachersName.value,
        section_name: sectionName.value,
        course_name: courseName.value,
        batch_number: batchNumber.value,
        timings: timings.value,
        schedule,
      });
    } catch (error) {
      console.log(error);
      console.log(error.message);
    } finally {
      this._hideLoader();
    }
  }
}
(() => new EditClass())();
