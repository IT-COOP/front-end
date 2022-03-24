const DEFAULT_FIELDS = ["전체"];

export default function getPerfectFields(enums) {
  return DEFAULT_FIELDS.concat(
    Object.values(enums)
      .filter(Number)
      .map(k => enums[k]),
  );
}
