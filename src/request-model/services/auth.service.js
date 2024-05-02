import api from './api';
import TokenService from './token.service';

const register = (username, email, password, artistType) => {
    let isArtist = false;
    if (!!artistType) {
        isArtist = true;
    }

    return api.post("/users/register/", {
        username: username,
        email: email,
        password: password,
        is_artist: isArtist,
        is_active: true,
        artist_type: artistType,
    });
};

const login = (username, password) => {
    return api.post('/users/login/',{
        username,
        password
    }).then((response) => {
        if (response.data.access) {
            TokenService.setUser(response.data);
        }

        return response;
    });
};

const logout = () => {
    TokenService.removeUser();
}

const editUser = (username, userId, email, accountType, tag, biolinkVisible) => {
    let isArtist = undefined;
    let artistType = undefined;
    if (accountType === "personal") {
        isArtist = false;
    } else if (accountType === "business") {
        isArtist = true;
        artistType = tag;
    }

    
    return api.put(`/users/edit/${userId}`, {
        username: username,
        email: email,
        is_artist: isArtist,
        artist_type: artistType,
        is_linkpage_visible: biolinkVisible,
    });
}

    

const changePassword = (newPassword) => {
    return api.post('/users/reset-password', {
        password: newPassword,
    });
}

const deleteAccount = (userId) => {
    return api.delete(`/users/delete/${userId}`);
}


const getCurrentUser = () => {
    return JSON.parse (localStorage.getItem("user"));
}

const forgotPassword = (email) => {
    return api.post('/users/forgot-password', {
        email: email,
    });
}

const resetPassword = (password, token, uidb64) => {
    return api.post('/users/reset-password', {
        password: password,
        token: token,
        uidb64: uidb64,
    });
}


const AuthService = {
    register,
    login,
    logout,
    editUser,
    changePassword,
    getCurrentUser,
    deleteAccount,
    forgotPassword,
    resetPassword,

};

export default AuthService;

