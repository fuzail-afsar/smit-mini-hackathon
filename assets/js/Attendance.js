class Attendance extends Main {
  constructor() {
    super();
    this.#init();
  }
  async #init() {
    await this._init();
  }
}
(() => new Attendance())();
