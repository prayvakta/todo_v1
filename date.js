exports.getDate = () => {
  let date = new Date();
  let format = {
    weekday: 'long',
    day: 'numeric',
    month: 'long'
  }

  return date.toLocaleDateString("en-US", format);

}
