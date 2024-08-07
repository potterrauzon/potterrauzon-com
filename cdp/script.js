
const formElemList = document.querySelectorAll("form");
formElemList.forEach((form) => {
  form.addEventListener("submit", (e) => {
    // on form submission, prevent default
    e.preventDefault();
    // construct a FormData object, which fires the formdata event
    new FormData(form);
  });

  form.addEventListener("formdata", (e) => {
    // Get the form data from the event object
    let data = e.formData;
    let obj = {};

    const entries = [...data.entries()];

    entries.forEach((entry) => (obj[entry[0]] = entry[1]));
    analytics.track(form.attributes[2].nodeValue, obj);
  });
});