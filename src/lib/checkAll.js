export default function checkAll(name, enums) {
  if (typeof name !== "string") {
    throw new Error(`The name must be string type. your name is ${name}`);
  }
  let _name;

  if (name === "전체") {
    _name = "";
  } else {
    _name = enums[name];
  }
  return _name;
}
