export type IParams<T> = {
  [K in keyof T]: string;
};
