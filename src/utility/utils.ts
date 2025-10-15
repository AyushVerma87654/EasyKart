import { HOMEPAGE } from "./constant";

export const normalizeQuery = (query: string) => (query ? query : HOMEPAGE);

export const normalizeEntities = (data: any[], key: string) =>
  data.reduce((prev, current) => {
    prev[current[key]] = current;
    return prev;
  }, {});

export const generateUniqueKey = () =>
  `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
