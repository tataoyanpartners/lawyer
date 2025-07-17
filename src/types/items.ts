export type Lawyer = {
  _id: string;
  image: string;
  name_am: string;
  surname_am: string;
  description_am: string;
  name_en: string;
  surname_en: string;
  description_en: string;
};

export type Partner = {
  _id: string;
  image: string;
  title_en: string;
  description_en: string;
  title_am: string;
  description_am: string;
};

export type Blogs = {
  _id: string;
  image: string;
  createTime: string;
  title_en: string;
  title_am: string;
  description_en: string;
  description_am: string;
};
