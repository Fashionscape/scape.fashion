const [_, __, rsrelease, pageId] = process.argv;

const config = require('./config')(rsrelease);

const wiki = require('./wiki')(config);
const {toItems} = require('./model')(config);

const tryPage = async (pageId) => {
  const doc = await wiki.parse(pageId);
  const items = toItems(doc);
  console.log(JSON.stringify(items, null, 2));
}

tryPage(pageId);
