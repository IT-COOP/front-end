function makeEnum(array) {
  return array.reduce((acc, [key, value], i, { length }) => {
    if (Number.isNaN(key * 1)) {
      throw new Error("The key must be number");
    }

    const next = { ...acc, [key]: value, [value]: Number(key) };
    if (i + 1 === length) {
      Object.freeze(next);
    }
    return next;
  }, {});
}

const _location = {
  101: "서울",
  102: "경기",
  103: "강원",
  104: "충청",
  105: "경상",
  106: "전라",
  107: "제주",
  108: "온라인",
  109: "그 외",
};

const _task = {
  100: "기획자",
  200: "디자이너",
  300: "프론트엔드",
  400: "백엔드",
};

const _stack = {
  101: "React",
  102: "Vue",
  103: "Angular",
  104: "Svelte",
  301: "Spring",
  311: "Express",
  312: "Nest",
  313: "Fastify",
  314: "Koa",
  321: "Django",
  322: "Flask",
  331: "GoLang",
  332: "Ruby On Rails",
};

export const Location = makeEnum(Object.entries(_location));
export const Task = makeEnum(Object.entries(_task));
export const Stack = makeEnum(Object.entries(_stack));
