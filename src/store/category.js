import firebase from "firebase/app"

export default {
  actions: {
    async fetchCategories({ commit, dispatch }) {
      //получаєм список категорій
      try {
        const uid = await dispatch("getUid")
        const categories =
          (
            await firebase
              .database()
              .ref(`/users/${uid}/categories`)
              .once("value")
          ).val() || {} // вертає обєкт
        const cats = []
        Object.keys(categories).forEach(key => {
          // обєкт => масив
          cats.push({
            title: categories[key].title,
            limit: categories[key].limit,
            id: key
          })
        })
        return cats
        // return Object.keys(categories).map(key => ({...categories, id: key}))
      } catch (e) {
        commit("setError", e)
        throw e
      }
    },
    async updateCategory({ commit, dispatch }, { title, limit, id }) {
      //оновлює список категорій
      try {
        const uid = await dispatch("getUid")
        const category = await firebase
          .database()
          .ref(`/users/${uid}/categories`)
          .child(id)
          .update({ title, limit })
      } catch (e) {
        commit("setError", e)
        throw e
      }
    },
    async createCategory({ commit, dispatch }, { title, limit }) {
      //створюєм список категорій
      try {
        const uid = await dispatch("getUid")
        const category = await firebase
          .database()
          .ref(`/users/${uid}/categories`)
          .push({ title, limit })
        return { title, limit, id: category.key }
      } catch (e) {
        commit("setError", e)
        throw e
      }
    }
  }
}
