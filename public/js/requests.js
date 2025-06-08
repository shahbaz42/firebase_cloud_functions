var app = new Vue({
    el: '#app',
    data: {
        requests: []
    },
    methods: {
        async upvoteRequest(id) {
            const functions = firebase.app().functions('asia-south1');
            // functions.useEmulator('localhost', 5001);

            const upvote = functions.httpsCallable('upvote');
            try {
                const res = await upvote({ id: id });
                console.log('Upvote successful:', res.data);
            } catch (error) {
                showNotification(error.message);
            }   
        }
    },
    mounted() {
        const ref = firebase.firestore().collection('request').orderBy('upvotes', 'desc');
        ref.onSnapshot(snapshot => {
            let requests = [];
            snapshot.forEach(doc => {
                requests.push({ id: doc.id, ...doc.data() });
            });

            this.requests = requests;
        })
    }
})
