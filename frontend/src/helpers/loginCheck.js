

export const isLoggedIn = () => {
    const token = localStorage.getItem('Authorization');
    if (!token || !token.startsWith('Bearer ')) {
        return false;
    }
    return true;
}
