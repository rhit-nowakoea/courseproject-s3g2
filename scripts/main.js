require(server.js);

var rhit = rhit || {};

rhit.FB_COLLECTION_USERS = "Users";
rhit.FB_KEY_NAME = "name";
rhit.fbAuthManager = null;
rhit.fbUserManager = null;


function htmlToElement(html) {
	var template = document.createElement('template');
	html = html.trim();
	template.innerHTML = html;
	return template.content.firstChild;
}

rhit.SideNavController = class {
	constructor() {
		// const menuProfilePageItem = document.querySelector("#menuGoToProfilePage")
		// if (menuProfilePageItem) {
		// 	menuProfilePageItem.onclick = (event) => {
		// 		window.location.href = "/profile.html";
		// 	};
		// }
		const menuSignOutItem = document.querySelector("#menuSignOut")
		if (menuSignOutItem) {
			menuSignOutItem.onclick = (event) => {
				rhit.fbAuthManager.signOut();
			};
		}
	}
}

rhit.HomePageController = class {
	constructor() {
		// document.querySelector("#submitAddQuote").onclick = (event) => {
			// const quote = document.querySelector("#inputQuote").value;
			// const movie = document.querySelector("#inputMovie").value;
			// rhit.fbMovieQuotesManager.add(quote, movie);
		// };
		// document.querySelector("#submitAddQuote").addEventListener("click", (params) => {});
		// $("#addQuoteDialog").on("show.bs.modal", (event) => {
		// 	document.querySelector("#inputQuote").value = "";
		// 	document.querySelector("#inputMovie").value = "";
		// });
		// $("#addQuoteDialog").on("shown.bs.modal", (event) => {
		// 	document.querySelector("#inputQuote").focus();
		// });
		//Start Listening
		// rhit.fbMovieQuotesManager.beginListening(this.updateList.bind(this));
	// }

	// _createCard(movieQuote) {
	// 	return htmlToElement(`<div class="card">
    //     <div class="card-body">
    //       <h5 class="card-title">${movieQuote.quote}</h5>
    //       <h6 class="card-subtitle mb-2 text-muted">${movieQuote.movie}</h6>
    //     </div>
    //   </div>`);
	// }

	// updateList() {
	// 	if (rhit.fbMovieQuotesManager.uid) {
	// 		if (!rhit.fbUserManager.isListening) {
	// 			rhit.fbUserManager.beginListening(rhit.fbMovieQuotesManager.uid, () => {
	// 				document.querySelector("#userSpecificHeading").innerHTML = `Showing quote made by ${rhit.fbUserManager.name}`;
	// 			});				
	// 		}
	// 	}
	// 	const newList = htmlToElement('<div id="quoteListContainer"></div>');
	// 	for (let i = 0; i < rhit.fbMovieQuotesManager.length; i++) {
	// 		const mq = rhit.fbMovieQuotesManager.getMovieQuoteAtIndex(i);
	// 		const newCard = this._createCard(mq);

	// 		newCard.onclick = (event) => {
	// 			// console.log(`You clicked on ${mq.id}`);
	// 			// rhit.storage.setMovieQuoteId(mq.id);

	// 			window.location.href = `/moviequote.html?id=${mq.id}`;
	// 		};

	// 		newList.appendChild(newCard);

	// 	}
	// 	const oldList = document.querySelector("#quoteListContainer");
	// 	oldList.removeAttribute("id");
	// 	oldList.hidden = true;
	// 	oldList.parentElement.appendChild(newList);

	}
}

// rhit.MovieQuote = class {
// 	constructor(id, quote, movie) {
// 		this.id = id;
// 		this.quote = quote;
// 		this.movie = movie;
// 	}
// }

// rhit.FbMovieQuotesManager = class {
// 	constructor(uid) {
// 		this.uid = uid;
// 		this._documentSnapshots = [];
// 		this._ref = firebase.firestore().collection(rhit.FB_COLLECTION_MOVIEQUOTE);
// 		this._unsubscribe = null;
// 	}

// 	add(quote, movie) {
// 		this._ref.add({
// 				[rhit.FB_KEY_QUOTE]: quote,
// 				[rhit.FB_KEY_MOVIE]: movie,
// 				[rhit.FB_KEY_AUTHOR]: rhit.fbAuthManager.uid,
// 				[rhit.FB_KEY_LAST_TOUCHED]: firebase.firestore.Timestamp.now(),

// 			})
// 			.then(function (docRef) {
// 				console.log("Document written with ID: ", docRef.id);
// 			})
// 			.catch(function (error) {
// 				console.log("Error adding document: ", error);
// 			});
// 	}
// 	beginListening(changeListener) {
// 		let query = this._ref.orderBy(rhit.FB_KEY_LAST_TOUCHED, "desc").limit(50);
// 		if (this.uid) {
// 			console.log("uid = ", this.uid);
// 			query = query.where(rhit.FB_KEY_AUTHOR, "==", this.uid);
// 		}
// 		this._unsubscribe = query.onSnapshot((querySnapshot) => {
// 			this._documentSnapshots = querySnapshot.docs;
// 			// querySnapshot.forEach((doc) => {
// 			// 	console.log(doc.data());				
// 			// });
// 			if (changeListener) {
// 				changeListener();
// 			}
// 		});
// 	}
// 	stopListening() {
// 		this._unsubscribe();
// 	}
// 	// update(id, quote, movie) {	}
// 	// delete(id) {	}
// 	get length() {
// 		return this._documentSnapshots.length;
// 	}
// 	getMovieQuoteAtIndex(index) {
// 		const docSnapshot = this._documentSnapshots[index];
// 		const mq = new rhit.MovieQuote(
// 			docSnapshot.id,
// 			docSnapshot.get(rhit.FB_KEY_QUOTE),
// 			docSnapshot.get(rhit.FB_KEY_MOVIE),
// 		);
// 		return mq;
// 	}
// }

rhit.DetailPageController = class {
	constructor() {
		// document.querySelector("#submitEditQuote").onclick = (event) => {
		// 	const quote = document.querySelector("#inputQuote").value;
		// 	const movie = document.querySelector("#inputMovie").value;
		// 	rhit.fbSingleQuoteManager.update(quote, movie);
		// };
		// document.querySelector("#submitAddQuote").addEventListener("click", (params) => {});
		// $("#editQuoteDialog").on("show.bs.modal", (event) => {
		// 	document.querySelector("#inputQuote").value = rhit.fbSingleQuoteManager.quote;
		// 	document.querySelector("#inputMovie").value = rhit.fbSingleQuoteManager.movie;
		// });
		// $("#editQuoteDialog").on("shown.bs.modal", (event) => {
		// 	document.querySelector("#inputQuote").focus();
		// });

		// document.querySelector("#submitDeleteQuote").onclick = (event) => {
		// 	rhit.fbSingleQuoteManager.delete().then(() => {
		// 			console.log("Document successfully deleted!");
		// 			window.location.href = "/home.html";
		// 		})
		// 		.catch(function (error) {
		// 			console.log("Error removing document: ", error);
		// 		});
		// };
		// document.querySelector("#menuSignOut").onclick = (event) => {
		// 	rhit.fbAuthManager.signOut();
		// };

		// rhit.fbSingleQuoteManager.beginListening(this.updateView.bind(this));
	}
	// updateView() {
	// 	if (!rhit.fbUserManager.isListening) {
	// 		rhit.fbUserManager.beginListening(rhit.fbSingleQuoteManager.author, this.updateAuthorBox.bind(this));
	// 	}
		// document.querySelector("#cardQuote").innerHTML = rhit.fbSingleQuoteManager.quote;
		// document.querySelector("#cardQuote").innerHTML = rhit.fbSingleQuoteManager.quote;
		// document.querySelector("#cardMovie").innerHTML = rhit.fbSingleQuoteManager.movie;
		// if (rhit.fbSingleQuoteManager.author == rhit.fbAuthManager.uid) {
		// 	document.querySelector("#menuEdit").style.display = "flex";
		// 	document.querySelector("#menuDelete").style.display = "flex";
		// }
	// }
	// updateAuthorBox() {
	// 	if (rhit.fbUserManager.name) {
	// 		document.querySelector("#authorName").innerHTML = rhit.fbUserManager.name;
	// 	}
	// 	document.querySelector("#authorBox").onclick = (event) => {
	// 		// if (rhit.fbSingleQuoteManager.author == rhit.fbAuthManager.uid) {
	// 		// 	window.location.href = "/profile.html";
	// 		// } else {
	// 		// 	window.location.href = `/home.html`;
	// 		// 	// ?uid=${rhit.fbSingleQuoteManager.author}
	// 		// }
	// 	};
	// }
	 
}

// rhit.FbSingleQuoteManager = class {
// 	constructor(movieQuoteId) {
// 		this._documentSnapshot = {};
// 		this._unsubscribe = null;
// 		this._ref = firebase.firestore().collection(rhit.FB_COLLECTION_MOVIEQUOTE).doc(movieQuoteId);
// 	}
// 	beginListening(changeListener) {
// 		this._unsubscribe = this._ref.onSnapshot((doc) => {
// 			if (doc.exists) {
// 				console.log("Document data:", doc.data());
// 				this._documentSnapshot = doc;
// 				changeListener();
// 			} else {
// 				console.log("No such document!");
// 				// window.location.href = "/list.html";
// 			}
// 		});
// 	}
// 	stopListening() {
// 		this._unsubscribe();
// 	}
// 	update(quote, movie) {
// 		this._ref.update({
// 				[rhit.FB_KEY_QUOTE]: quote,
// 				[rhit.FB_KEY_MOVIE]: movie,
// 				[rhit.FB_KEY_LAST_TOUCHED]: firebase.firestore.Timestamp.now(),
// 			})
// 			.then(() => {
// 				console.log("Document successfully updated!");
// 			})
// 			.catch(function (error) {
// 				console.log("Error updating document: ", error);
// 			});
// 	}
// 	delete() {
// 		return this._ref.delete();
// 	}

// 	get quote() {
// 		return this._documentSnapshot.get(rhit.FB_KEY_QUOTE);
// 	}
// 	get movie() {
// 		return this._documentSnapshot.get(rhit.FB_KEY_MOVIE);
// 	}
// 	get author() {
// 		return this._documentSnapshot.get(rhit.FB_KEY_AUTHOR);
// 	}
// }

rhit.LoginPageController = class {
	constructor() {
		document.querySelector("#rosefireButton").onclick = (event) => {
			rhit.fbAuthManager.signIn();
		};
		if(rhit.fbAuthManager.isSignedIn){
			window.location.href = "/home.html";
				return;
		}
		// rhit.fbAuthManager.startFirebaseUI();

	}
}

rhit.FbAuthManager = class {
	constructor() {
		this._user = null;
		this._name = "";
	}
	beginListening(changeListener) {
		firebase.auth().onAuthStateChanged((user) => {
			this._user = user;
			console.log("this._user is:" + this._user);
			changeListener();
		});
	}
	signIn() {
		console.log("Sign in using Rosefire");
		Rosefire.signIn("a0f48f28-ddda-41c0-b426-5213c2e3ed02", (err, rfUser) => {
			if (err) {
				console.log("Rosefire error!", err);
				return;
			}
			console.log("Rosefire success!", rfUser);
			this._name = rfUser.name;
			// firebase.auth().signInWithCustomToken(rfUser.token).catch((error) => {
			// 	const errorCode = error.code;
			// 	const errorMessage = error.message;
			// 	if (errorCode === 'auth/invalid-custom-token') {
			// 		alert('The token you provided is not valid')
			// 	} else {
			// 		console.error("Custom Auth error", errorCode, errorMessage);
			// 	}
			// });
		});

	}
	signOut() {
		firebase.auth().signOut().catch((error) => {
			console.log("Sign out erreor");
		});
	}

	// startFirebaseUI = function () {
	// 	var uiConfig = {
	// 		signInSuccessUrl: '/',
	// 		signInOptions: [
	// 			firebase.auth.GoogleAuthProvider.PROVIDER_ID,
	// 			firebase.auth.EmailAuthProvider.PROVIDER_ID,
	// 			firebase.auth.PhoneAuthProvider.PROVIDER_ID,
	// 			firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID
	// 		],
	// 	};
	// 	const ui = new firebaseui.auth.AuthUI(firebase.auth());
	// 	ui.start('#firebaseui-auth-container', uiConfig);
	// };

	get isSignedIn() {
		return !!this._user;
	}
	get uid() {
		return this._user.uid;
	}
	get name() {
		return this._name || this._user.displayName;
	}
}

rhit.ProfilePageController = class {
	constructor() {
		console.log("Created Profile page controller");

		document.querySelector("#submitName").onclick = (event) => {
			const name = document.querySelector("#inputName").value;
			rhit.fbUserManager.updateName(name).then((params) => {
				window.location.href = "/home.html";
			});
		}
		rhit.fbUserManager.beginListening(rhit.fbAuthManager.uid, this.updateView.bind(this));
	}
	updateView() {
		if (rhit.fbUserManager.name) {
			document.querySelector("#inputName").value = rhit.fbUserManager.name;
		}
	}
}

rhit.FbUserManager = class {
	constructor() {
		this._collectionRef = firebase.firestore().collection(rhit.FB_COLLECTION_USERS);
		this._document = null;
		this._unsubscribe = null;
	}
	addNewUserMaybe(uid, name) {
		const userRef = this._collectionRef.doc(uid);
		return userRef.get().then((doc) => {
			if (doc.exists) {
				console.log("User already exists:", doc.data());
				return false;
			} else {
				console.log("Created this user!");
				return userRef.set({
						[rhit.FB_KEY_NAME]: name,
					})
					.then(() => {
						console.log("Document Successfully written!");
						return true;
					})
					.catch((error) => {
						console.error("Error writing document: ", error);
					})
			}
		}).catch((error) => {
			console.log("Error getting document:", error);
		});
	}
	beginListening(uid, changeListener) {
		const userRef = this._collectionRef.doc(uid);
		this._unsubscribe = userRef.onSnapshot((doc) => {
			if (doc.exists) {
				console.log("Document data:", doc.data());
				this._document = doc;
				changeListener();
			} else {
				console.log("No User! That is bad!");
			}
		});
	}
	stopListening() {
		this._unsubscribe();
	}

	get isListening() {
		return !!this._unsubscribe;
	}

	updateName(name) {
		const userRef = this._collectionRef.doc(rhit.fbAuthManager.uid);
		return userRef.update({
				[rhit.FB_KEY_NAME]: name,
			})
			.then(() => {
				console.log("Document successfully updated!");
			})
			.catch(function (error) {
				console.log("Error updating document: ", error);
			});
	}
	get name() {
		return this._document.get(rhit.FB_KEY_NAME);
	}
}

rhit.checkForRedirects = function () {
	// if (document.querySelector("#loginPage") && rhit.fbAuthManager.isSignedIn) {
	// 	window.location.href = "/home.html";
	// }
	// if (!document.querySelector("#loginPage") && !rhit.fbAuthManager.isSignedIn) {
	// 	window.location.href = "/";
	// }
	// if (document.querySelector("#loginPage")) {

	// }
};

rhit.initializePage = function () {
	const urlParams = new URLSearchParams(window.location.search);
	new rhit.SideNavController();
	if (document.querySelector("#homePage")) {
		console.log("You are on the home page.");
		const uid = urlParams.get("uid");
		// rhit.fbMovieQuotesManager = new rhit.FbMovieQuotesManager(uid);
		new rhit.HomePageController();
	}

	if (document.querySelector("#detailPage")) {
		console.log("You are on the detail page.");
		// const movieQuoteId = urlParams.get("id");

		// if (!movieQuoteId) {
		// 	window.location.href = "/home.html";
		// }
		// rhit.fbSingleQuoteManager = new rhit.FbSingleQuoteManager(movieQuoteId);
		new rhit.DetailPageController();
	}

	if (document.querySelector("#loginPage")) {
		console.log("You are on the login page.");
		new rhit.LoginPageController();
	}
	if (document.querySelector("#profilePage")) {
		console.log("You are on the profile page.");
		new rhit.ProfilePageController();
	}
};

rhit.createUserObjectIfNeeded = function () {
	return new Promise((resolve, reject) => {
		if (!rhit.fbAuthManager.isSignedIn) {
			console.log("No user. So no User check needed");
			resolve(false);
			return;
		}
		if (!document.querySelector("#loginPage")) {
			console.log("Not on login page. So no User check needed");
			resolve(false);
			return;
		}
		console.log("Checking User");
		rhit.fbUserManager.addNewUserMaybe(
			rhit.fbAuthManager.uid,
			rhit.fbAuthManager.name,
		).then((isUserNew) => {
			resolve(isUserNew);
		});
	});
};

rhit.updateProgress = function() {
	const numb = document.querySelector(".number");
	let counter = 0;
	setInterval(() => {
  	if(counter == 100 ){
    	clearInterval();
  	}else{
    	counter+=1;
    	numb.textContent = counter + "%";
  	}
	}, 80);
}

/* Main */
rhit.main = function () {
	console.log("Ready");
	rhit.fbAuthManager = new rhit.FbAuthManager();
	rhit.fbUserManager = new rhit.FbUserManager();
	rhit.fbAuthManager.beginListening(() => {
		console.log("isSignedIn = ", rhit.fbAuthManager.isSignedIn);
		rhit.createUserObjectIfNeeded().then((isUserNew) => {
			console.log('isUserNew :>> ', isUserNew);
			if (isUserNew) {
				window.location.href = "/profile.html";
				return;
			}
			rhit.checkForRedirects();
			rhit.initializePage();
		});
	});
};

rhit.main();