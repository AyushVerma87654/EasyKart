import { HOMEPAGE } from "./constant";

export const normalizeQuery = (query: string) => (query ? query : HOMEPAGE);

export const normalizeEntities = (data: any[], key: string) =>
  data.reduce((prev, current) => {
    prev[current[key]] = current;
    return prev;
  }, {});
