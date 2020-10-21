import config from "config";
import { toParams } from "hooks/search";

const items = (() => {
  const list = async (keys = []) => {
    const params = new URLSearchParams(keys?.length > 0 && { keys });
    const query = params.toString();
    const res = await fetch(`${config.api}/items?${query}`);
    const body = await res.json();
    return body.items;
  };

  const match = async (search) => {
    const params = toParams(search);
    const query = params.toString();
    const res = await fetch(`${config.api}/items/match?${query}`);
    const body = await res.json();
    return body.items;
  };

  return { list, match };
})();

const client = { items };

export default client;
