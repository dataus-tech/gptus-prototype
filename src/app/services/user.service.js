import { instance } from "../instance/axios.instance";

const getUserProfile = (accessToken) => {
  return instance.get("user", {
    headers: {
      Authorization: accessToken ? `Bearer ${accessToken}` : accessToken,
    },
  });
};

const editProfile = (username, password, accessToken) => {
  return instance
    .put(
      "user",
      {
        username,
        password,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )
    .then((response) => {
      const { username } = response.data;
      if (response.status === 200) {
        localStorage.setItem("username", username);
      }
      return response.data;
    });
};

const UserService = {
  getUserProfile,
  editProfile,
};

export default UserService;
