export const getUserIdLocal = () => {
    return window.localStorage.getItem('idLogin');
};

export const getUserNameLocal = () => {
    return window.localStorage.getItem('nameUser');
};

export const getTokenUserLocal = () => {
    return window.localStorage.getItem('token');
};
