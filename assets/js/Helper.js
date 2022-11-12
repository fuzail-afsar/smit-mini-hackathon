class Helper {
  static getParams() {
    return Object.fromEntries(
      new URLSearchParams(window.location.search).entries()
    );
  }
}
