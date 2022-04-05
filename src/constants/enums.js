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
  100: "서울/경기",
  200: "강원",
  300: "전북",
  400: "전라",
  500: "충북",
  600: "충남",
  700: "경남",
  800: "경북",
  900: "온라인",
};

const _task = {
  100: "기획",
  200: "디자인",
  300: "프론트엔드",
  400: "백엔드",
};

const _stack = {
  101: "React",
  102: "Vue",
  103: "Angular",
  104: "Svelte",
  105: "React Native",
  106: "Flutter",
  107: "Swift",
  108: "Android Studio",
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

const _recruitFilter = {
  0: "최신순",
  1: "keep it 많은 순",
};

const _recruitStatus = {
  0: "ALL",
  1: "CURRENT",
};

export const Location = makeEnum(Object.entries(_location));
export const Task = makeEnum(Object.entries(_task));
export const Stack = makeEnum(Object.entries(_stack));
export const RecruitFilter = makeEnum(Object.entries(_recruitFilter));
export const RecruitStatus = makeEnum(Object.entries(_recruitStatus));
