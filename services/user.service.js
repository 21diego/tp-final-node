const auth = require('../firebase.js').auth();
const db = require('../firebase.js').database();


const register = (email, password, name) => {
    console.log("Registrando al usuario: " + name)
    auth.createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        createUser(user)
        console.log("user: " + JSON.stringify(user));
        // ...
    })
    .catch((error) => {
        console.log("entro al catch")
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log("errorCode: " + errorCode);
        console.log("errorMessage: " + errorMessage);
    });
}

const createUser = ( { uid, displayName, email}) => {
    db.ref('users/' + uid).set({
        name: displayName ? displayName : "Anonimo",
        email: email
    })
}



module.exports = {
    register
}