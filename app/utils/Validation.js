export function validateEmail(email) {
  var re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

export function validateName(name) {
  var re = /^[a-zA-Z0-9 _#@&-]*$/;
  return re.test(String(name).toLowerCase());
}

export function validatePhone(phone) {
  var re = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
  return re.test(String(phone));
}
export function validateGst(gst) {
  var re =
    /^[0-9]{2}[A-Za-z]{5}[0-9]{4}[A-Za-z]{1}[A-Za-z0-9]{1}[A-Za-z]{1}[0-9A-Za-z]{1}$/;
  return re.test(String(gst));
}
export function validatePan(pan) {
  console.log(pan);
  var re = /^([A-Za-z]){5}([0-9]){4}([A-Za-z]){1}/;
  return re.test(String(pan));
}
export function validateDrivingLicense(dl_number) {
  var re = /^([A-Za-z]{2})([-]{0,1})(\d{2}|\d{3})[a-zA-Z]{0,1}(\d{4})(\d{7})$/;
  return re.test(dl_number);
}

export function validateVehicleNumber(rc_number) {
  var re = /^[A-Za-z]{2}[0-9]{2}[A-Za-z]{1,2}[0-9]{4}$/;
  return re.test(rc_number);
}
export function validateIfscCode(ifsc) {
  var re = /^[A-Za-z]{4}[0-9]{7}$/;
  return re.test(ifsc);
}
export function validateNameInBank(name) {
  var re = /^[a-zA-Z0-9 _#@&-]*$/;
  return re.test(name);
}
