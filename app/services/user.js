const config = require('config');
const admin = require('firebase-admin');

const SERVICE_ACCOUNT = (process.env.SERVICE_ACCOUNT) ?
	(process.env.SERVICE_ACCOUNT) :
	config.get('serviceAccount');

admin.initializeApp({
	credential: admin.credential.cert(SERVICE_ACCOUNT)
});

const db = admin.firestore();
db.settings({timestampsInSnapshots: true});

const save = user => {
	let movie = user.movie.title;
	movie = movie.replace(/\.+$/, '');

	return db.collection('users').doc(user.id).update({[movie]: user.movie.id})
		.catch(e => {
			db.collection('users').doc(user.id).set({[movie]: user.movie.id})
		});
};

const randomProperty = (obj) => {
	const keys = Object.keys(obj);
	return obj[keys[keys.length * Math.random() << 0]];
};

const findLikedMovies = id =>
	db.collection('users').doc(id)
		.get()
		.then((doc) => {
			const data = doc.data();
			if (data) {
				return randomProperty(doc.data())
			}
			return 0;
		})
		.catch((err) => {
			// console.log('Error getting documents', err);
		});

module.exports = {
	save,
	findLikedMovies
};