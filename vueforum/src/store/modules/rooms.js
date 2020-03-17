import axios from "axios";

const state = {
  rooms: []
};

const getters = {
  allRooms: state => state.rooms
};

const actions = {
  async fetchRooms({ commit }) {
    const response = await axios.get(`http://localhost:4000/rooms`);
    commit("setRooms", response.data);
  },

  async postRoom({ commit }, data) {
    const response = await axios.post("http://localhost:4000/rooms", {
      title: data.title,
      description: data.description
    });
    commit("postRoom", response.data);
  }
};

const mutations = {
  setRooms: (state, rooms) => (state.rooms = rooms),
  postRoom: (state, room) => state.rooms.unshift(room)
};

export default {
  state,
  getters,
  actions,
  mutations
};
