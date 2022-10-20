import useFetch from "../hooks/useFetch";
import useSendData from "../hooks/useSendData";
import useSendDataNotAuth from "../hooks/useSendDataNotAuth";

//Métodos que no se envía body
export const useGetLinks = (key) =>
  useFetch(`${process.env.REACT_APP_BACKEND}/links`, key);

export const useGetMyLinks = () =>
  useFetch(`${process.env.REACT_APP_BACKEND}/mylinks`);

export const useGetSearch = (params, order, direction, key) =>
  useFetch(
    `${process.env.REACT_APP_BACKEND}/links?search=${params}&order=${order}&direction=${direction}`,
    key
  );
export const useGetUser = (id) =>
  useFetch(`${process.env.REACT_APP_BACKEND}/users/${id}`);
export const useGetFavorites = () =>
  useFetch(`${process.env.REACT_APP_BACKEND}/favorites/`);

//métodos que necesitan autorización en el header y no es método get.
export const useLogin = () =>
  useSendData(`${process.env.REACT_APP_BACKEND}/users/login`);
export const useNewLink = () =>
  useSendData(`${process.env.REACT_APP_BACKEND}/links/`);
export const useEditLink = (id) =>
  useSendData(`${process.env.REACT_APP_BACKEND}/links/${id}`);
export const useDeleteUser = (id) =>
  useSendData(`${process.env.REACT_APP_BACKEND}/users/${id}`);
export const useEditPass = (id) =>
  useSendData(`${process.env.REACT_APP_BACKEND}/users/${id}/password`);

export const useDeleteLink = (id) =>
  useSendData(`${process.env.REACT_APP_BACKEND}/links/${id}`);
export const useVote = (id) =>
  useSendData(`${process.env.REACT_APP_BACKEND}/links/${id}/votes`);
export const useAddFavorite = () =>
  useSendData(`${process.env.REACT_APP_BACKEND}/favorites`);
export const useDeleteFavorite = (id) =>
  useSendData(`${process.env.REACT_APP_BACKEND}/favorites/${id}`);

//métodos que no necesitan autorización en el header y  no es método get.
export const useRecoverPass = () =>
  useSendDataNotAuth(`${process.env.REACT_APP_BACKEND}/users/recover_password`);
export const useRecoverNewPass = () =>
  useSendDataNotAuth(`${process.env.REACT_APP_BACKEND}/users/reset_password`);
