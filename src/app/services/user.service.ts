import { instance } from 'app/instance/axios.instance';

const getUserProfile = (accessToken: string) => {
  return instance
    .get('user', {
      headers: {
        Authorization: accessToken ? `Bearer ${accessToken}` : accessToken,
      },
    })
    .then((response) => {
      return response;
    });
};

const editProfile = (
  username: string,
  password: string,
  accessToken: string,
) => {
  return instance
    .put(
      'user',
      {
        username,
        password,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    )
    .then((response) => {
      const { username } = response.data;
      if (response.status === 200) {
        localStorage.setItem('username', username);
      }
      return response.data;
    });
};

const UserService = {
  getUserProfile,
  editProfile,
};

export default UserService;
