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
  }

  #initEvents() {
    form.addEventListener("submit", this.#formSubmitHandler.bind(this));
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

      await this._fireBase.createClass({
        teacher_name: teachersName.value,
        section_name: sectionName.value,
        course_name: courseName.value,
        batch_number: batchNumber.value,
        timings: timings.value,
        schedule,
      });

      //   window.location.assign("classes.html");
    } catch (error) {
      console.log(error);
      console.log(error.message);
    } finally {
      this._hideLoader();
    }
  }
}
(() => new CreateClass())();
