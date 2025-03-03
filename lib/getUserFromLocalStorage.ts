export const getUserFromLocalStorage = (): UserType | null => {
  try {
    const userString = localStorage.getItem("user-storage");
    if (userString) {
      const userObject = JSON.parse(userString);
      if (userObject && userObject.state && userObject.state.user) {
        return userObject.state.user as UserType;
      }
    }
  } catch (error) {
    console.error("Error getting user from local storage:", error);
  }
  return null;
};
