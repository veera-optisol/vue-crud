import { createStore } from 'vuex';

export default createStore({
  state() {
    return {
      users: [],
      user: null
    }
  },
  mutations: {
    setUsers(state, payload) {
      state.users = payload
    },
    setUser(state, payload) {
      state.user = payload
    },
  },
  actions: {
    async fetchUsers(context) {
      const response = await fetch('http://54.202.218.249:9501/api/users');
      const responseData = await response.json();

      if(!response.ok) {
        const error = new Error(responseData.message || 'Failed to fetch users!');
        throw error;
      }

      context.commit('setUsers', responseData);
    },
    async fetchUser(context, payload) {
    
      const response = await fetch('http://54.202.218.249:9501/api/users/'+payload);
      const responseData = await response.json();

      if(!response.ok) {
        const error = new Error(responseData.message || 'Failed to fetch user!');
        throw error;
      }
      
      context.commit('setUser', responseData);
    },
    async updateUser(context, payload) {
      const response = await fetch('http://54.202.218.249:9501/api/users/'+payload.userId, {
        method: 'PUT',
        body: JSON.stringify(payload.data),
        headers: {
          'Content-Type': 'application/json'
        },
      });
      const responseData = await response.json();
      
      if(!response.ok) {
        const error = new Error(responseData.message || 'Failed to fetch user!');
        throw error;
      }

      context.commit('setUser', responseData);
    },
    async deleteUser(_, payload) {
      const response = await fetch('http://54.202.218.249:9501/api/users/'+payload, {
        method: 'DELETE',
        body: JSON.stringify(payload.data),
        headers: {
          'Content-Type': 'application/json'
        },
      });

      const responseData = await response.json();
      
      if(!response.ok) {
        const error = new Error(responseData.message || 'Failed to delete user!');
        throw error;
      }

    }
  },
  getters: {
    users(state) {
      return state.users;
    },
    user(state) {
      return state.user;
    }
  },
})
