const capitalize = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1).toString().toLowerCase();
}
const getRandom = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
}
const clean = text => {
  if (typeof(text) === 'string') {
    return text.replace(/`/g, '`' + String.fromCharCode(8203)).replace(/@/g, '@' + String.fromCharCode(8203));
  }
  else return text;
}

module.exports = {
  capitalize,
  getRandom,
  clean
}
