import firstNameData from "~/assets/exampleNames/first_name.json";
import lastNameData from "~/assets/exampleNames/last_name.json";
import nicknameData from "~/assets/exampleNames/nickname.json";

export type Gender = "male" | "female";
export type Language = "th" | "en";
export type LocalizedName = Record<Language, string>;

export type NameSettings = {
  languages: Record<Language, boolean>;
  gender: Gender | "all";
  count: number;
  showLastName: boolean;
  showNickname: boolean;
};

export type NameResult = {
  firstName: LocalizedName;
  lastName: LocalizedName;
  nickname: LocalizedName;
  gender: Gender;
};

type NameEntry = LocalizedName & { gender: Gender };

export const MAX_NAME_COUNT = 50;

const firstNames = firstNameData.names as NameEntry[];
const lastNames = lastNameData.last_names as NameEntry[];
const nicknames = nicknameData.nicknames as NameEntry[];

function byGender(entries: NameEntry[], gender: Gender) {
  return entries.filter(entry => entry.gender === gender);
}

const lastNamesByGender = { male: byGender(lastNames, "male"), female: byGender(lastNames, "female") };
const nicknamesByGender = { male: byGender(nicknames, "male"), female: byGender(nicknames, "female") };

function pick<T>(pool: T[]): T {
  return pool[Math.floor(Math.random() * pool.length)]!;
}

/** สุ่มแบบไม่ซ้ำ (Fisher–Yates) แล้วตัดมา count ตัว */
function sample<T>(pool: T[], count: number): T[] {
  const copy = [...pool];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j]!, copy[i]!];
  }
  return copy.slice(0, count);
}

function toName({ th, en }: NameEntry): LocalizedName {
  return { th, en };
}

/** สุ่มรายชื่อจาก app/assets/exampleNames โดยชื่อจริงไม่ซ้ำกันในแต่ละครั้ง และนามสกุล/ชื่อเล่นตรงกับเพศของชื่อจริง */
export function randomNames({ gender, count }: Pick<NameSettings, "gender" | "count">): NameResult[] {
  const pool = gender === "all" ? firstNames : byGender(firstNames, gender);
  const total = Math.min(Math.max(Math.trunc(count) || 1, 1), MAX_NAME_COUNT);

  return sample(pool, total).map(first => ({
    firstName: toName(first),
    lastName: toName(pick(lastNamesByGender[first.gender])),
    nickname: toName(pick(nicknamesByGender[first.gender])),
    gender: first.gender,
  }));
}
