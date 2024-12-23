const uuid = () => Math.random().toString(16).substring(2, 10);
const sleep = () => new Promise((res) => setTimeout(res, 1000));
const userList = [
  {
    id: uuid(),
    name: "张三",
    age: 18,
  },
  {
    id: uuid(),
    name: "李四",
    age: 20,
  },
];
/**
 * 新增
 * @param {*} ctx 
 */
export const add = async (ctx) => {
  await sleep();
  const { name, age } = ctx.request.body;
  userList.unshift({
    id: uuid(),
    name,
    age,
  });
  ctx.type = "application/json";
  ctx.body = {
    code: 200,
  };
};
/**
 * 删除
 * @param {*} ctx 
 */
export const remove = async (ctx) => {
  await sleep();
  const { id } = ctx.params;
  const index = userList.findIndex((item) => item.id === id);
  userList.splice(index, 1);
  ctx.type = "application/json";
  ctx.body = {
    code: 200,
  };
};
// 自定义接口路径
remove.config = {
  apiPath: "/user/remove/:userId",
}
/**
 * 更新
 * @param {*} ctx 
 */
export const update = async (ctx) => {
  await sleep();
  const { id, name, age } = ctx.request.body;
  const item = userList.find((item) => item.id === id);
  Object.assign(item, {
    name,
    age
  })
  ctx.type = "application/json";
  ctx.body = {
    code: 200,
  };
};
/**
 * 查询
 * @param {*} ctx 
 */
export const list = async (ctx) => {
  await sleep();
  ctx.type = "application/json";
  ctx.body = {
    code: 200,
    data: userList,
  };
};
