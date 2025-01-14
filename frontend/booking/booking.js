function submitBooking(event) {
  event.preventDefault();
  // Perform other actions here, such as validating the form data
  validateForm();
}

//Form validation
function validateForm() {
  const nameRegex = /^[A-Za-z\s.'-]+$/;

  const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

  const phoneRegex = new RegExp(
    /^(?:(?:(?:00\s?|\+)44\s?)|(?:\(?0))(?:\d{2}\)?\s?\d{4}\s?\d{4}|\d{3}\)?\s?\d{3}\s?\d{3,4}|\d{4}\)?\s?(?:\d{5}|\d{3}\s?\d{3})|\d{5}\)?\s?\d{4,5}|8(?:00[\s-]?11[\s-]?11|45[\s-]?46[\s-]?4\d))(?:(?:[\s-]?(?:x|ext\.?\s?|\#)\d+)?)$/
  );

  const firstName = document.bookingForm.fname.value;
  const lastName = document.bookingForm.lname.value;
  const email = document.bookingForm.email.value;
  const phone = document.bookingForm.phone.value;
  const guests = document.bookingForm.guests.value;

  const todaysDate = new Date();
  const selectedDateStr = document.bookingForm.datePicker.value;
  const selectedTimeStr = document.bookingForm.time.value;

  const selectedDateTime = Date.parse(
    `${selectedDateStr}T${selectedTimeStr}:00.000Z`
  );

  if (firstName === "") {
    alert("Please provide a first name");
    document.bookingForm.fname.focus();
    return false;
  }
  if (!firstName.match(nameRegex)) {
    alert("Please enter a valid first name");
    document.bookingForm.fname.focus();
    return false;
  }
  if (lastName === "") {
    alert("Please provide a last name");
    document.bookingForm.lname.focus();
    return false;
  }
  if (!lastName.match(nameRegex)) {
    alert("Please enter a valid last name");
    document.bookingForm.lname.focus();
    return false;
  }
  if (email === "") {
    alert("Please provide your email");
    document.bookingForm.email.focus();
    return false;
  }
  if (!email.match(emailRegex)) {
    alert("Please provide valid email address");
    document.bookingForm.email.focus();
    return false;
  }
  if (phone === "") {
    alert("Please provide your phone number");
    document.bookingForm.phone.focus();
    return false;
  }
  if (!phoneRegex.test(phone)) {
    alert("Please provide your phone number");
    document.bookingForm.phone.focus();
    return false;
  }

  //if date is in date format then show error message
  if (selectedDateStr === "") {
    alert("Please select valid booking date");
    document.bookingForm.datePicker.focus();
    return false;
  }
  //if time is in --:-- format then show error
  if (selectedTimeStr === "") {
    alert("Please select valid booking time");
    document.bookingForm.time.focus();
    return false;
  }

  //if date is before current date then show error
  if (selectedDateTime < todaysDate.getTime()) {
    alert("Please select valid booking date");
    document.bookingForm.datePicker.focus();
    return false;
  }

  //if time is !> 1hr from current time then show error
  const todaysDatePlusOneHour = todaysDate.setHours(todaysDate.getHours() + 1)

  if (!(selectedDateTime > todaysDatePlusOneHour)) {
    alert("Please select valid booking time");
    document.bookingForm.time.focus();
    return false;
  }
  if (!(parseInt(guests) > 0)) {
    alert("Please provide number of guests");
    document.bookingForm.guests.focus();
    return false;
  }
}
