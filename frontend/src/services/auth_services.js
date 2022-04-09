import axios from "axios";

const api = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}`,
  withCredentials: true,
  headers: {
    "Content-type": "application/json",
    Accept: "application/json",
  },
});

export const register = async ({
  username,
  email,
  password,
  confirmPassword,
}) =>
  await api.post("/auth/register", {
    username,
    email,
    password,
    confirmPassword,
  });

export const activate = async (email, code) =>
  await api.post("/auth/activate", {
    email,
    code,
  });

export const resendCode = async (email) =>
  await api.post("/auth/sendCode", {
    email,
  });

export const login = async (email, password) =>
  await api.post("/auth/login", {
    email,
    password,
  });


  // Interceptors
api.interceptors.response.use(
    (config) => {
        return config;
    },
    async (error) => {
        const originalRequest = error.config;
        if (
            error.response.status === 401 &&
            originalRequest &&
            !originalRequest._isRetry
        ) {
            originalRequest.isRetry = true;
            try {
                await axios.get(
                  `${process.env.REACT_APP_API_URL}/auth/refresh`,
                  {
                    withCredentials: true,
                  }
                );

                return api.request(originalRequest);
            } catch (err) {
                console.log(err.message);
            }
        }
        throw error;
    }
);