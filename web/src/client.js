import config from "config";
import { toPath } from "hooks/search";

const items = (() => {
  const list = async (keys = []) => {
    const params = new URLSearchParams(keys?.length > 0 && { keys });
    const query = params.toString();
    const res = await fetch(`${config.api}/items?${query}`);
    const body = await res.json();
    return body.items;
  };

  const match = async ({ filters, page, search }) => {
    const path = toPath({ filters, page, pageSize: 30, search });
    const res = await fetch(config.api + path);
    return res.json();
  };

  return { list, match };
})();

const client = { items };

export default client;
