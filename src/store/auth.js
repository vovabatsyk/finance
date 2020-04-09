import firebase from 'firebase/app'

export default {
    actions: {
        async login({dispatch, commit}, {email, password}) {
            try {
                await firebase.auth().signInWithEmailAndPassword(email, password)
            } catch (e) {
                throw e
            }
        },
        async register({dispatch, commit}, {email, password, name}) {
            try {
                await firebase.auth().createUserWithEmailAndPassword(email, password)
                const uid = dispatch('getUid')
                await firebase.database().ref(`users/${uid}/info`).set({
                    bill: 10000,
                    name: name
                })
            } catch (e) {
                throw e
            }
        },
        getUid(){
            const user = firebase.auth().currentUser
            return user ? user : null
        },
        async logout()
        {
            await firebase.auth().signOut()
        }
    }
}
