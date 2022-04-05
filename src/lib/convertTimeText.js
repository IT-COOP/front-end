export default function convertTimeText(isoString) {
  const date = new Date(isoString);
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const AmOrPm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;
  return `${AmOrPm} : ${hours}시 ${
    minutes < 10 ? `0${minutes}분` : `${minutes}분`
  }`;
}
