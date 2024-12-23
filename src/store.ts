import { createStore } from "resy";
import axios from "axios";

export default createStore({
  loading: false,
  modalVisible: false,
  visible: false,
  data: [],
  async queryUser() {
    this.loading = true;
    const {
      data: { data },
    } = await axios.get("/user/list");
    this.loading = false;
    this.data = data;
  },
  async saveOrUpdate(data: any) {
    const url = data.id ? "/user/update" : "user/add";
    await axios.get(url, data);
    this.queryUser();
  },
  async removeUser(id: string) {
    this.loading = true;
    await axios.get("/user/remove", {
      params: {
        id
      }
    });
    this.queryUser();
  },
});
