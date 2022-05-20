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
		
	}
}

rhit.DetailPageController = class {
	constructor() {
		
	}
}

rhit.LoginPageController = class {
	constructor() {
		document.querySelector("#rosefireButton").onclick = (event) => {
			rhit.fbAuthManager.signIn();
		};
		if(rhit.fbAuthManager.isSignedIn){
			window.location.href = "/home.html";
				return;
		}
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
			console.log("Set name to ", this._name);
			firebase.auth().signInWithCustomToken(rfUser.token).catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
				if (errorCode === 'auth/invalid-custom-token') {
					alert('The token you provided is not valid')
				} else {
					console.error("Custom Auth error", errorCode, errorMessage);
				}
			});
		});

	}
	signOut() {
		firebase.auth().signOut().catch((error) => {
			console.log("Sign out erreor");
		});
	}

	// startFirebaseUI = function () {
	// 	var uiConfig = {
	// 		signInSuccessUrl: '/home.html',
	// 		signInOptions: [],
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
};

rhit.initializePage = function () {
	const urlParams = new URLSearchParams(window.location.search);
	new rhit.SideNavController();
	if (document.querySelector("#homePage")) {
		console.log("You are on the home page.");
		const uid = urlParams.get("uid");
		new rhit.HomePageController();
	}

	if (document.querySelector("#detailPage")) {
		console.log("You are on the detail page.");
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
		if (rhit.fbAuthManager.isSignedIn) {
            rhit.fbUserManager.beginListening(rhit.fbAuthManager.uid, () => {
                console.log("User manager listening");
            })
        }
		console.log("isSignedIn = ", rhit.fbAuthManager.isSignedIn);
		rhit.createUserObjectIfNeeded().then((isUserNew) => {
			console.log('isUserNew :>> ', isUserNew);
			if (isUserNew) {
				window.location.href = "/home.html";
				return;
			}
			rhit.checkForRedirects();
			rhit.initializePage();
		});
	});
};

rhit.main();