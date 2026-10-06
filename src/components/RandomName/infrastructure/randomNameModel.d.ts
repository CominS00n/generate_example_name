export interface IRandomNameSettingModel {
  is_name_th: boolean;
  is_name_en: boolean;
  is_nickname: boolean;
  is_email: boolean;
  domain: string;
  is_male: boolean;
  is_female: boolean;
}

export interface IRandomNameResultModel {
  name_th: string;
  name_en: string;
  email: string;
  nickname_th: string;
  nickname_en: string;
}

