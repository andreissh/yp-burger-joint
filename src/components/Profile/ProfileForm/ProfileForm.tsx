import React, { useEffect, useState } from "react";
import styles from "./ProfileForm.module.scss";
import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useAppDispatch, useAppSelector } from "../../../services/hooks";
import { updateUserInfo } from "../../../services/thunks/updateUserInfoThunk";
import { getUserInfo } from "../../../services/thunks/getUserInfoThunk";

const ProfileForm = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.profile);
  const [form, setForm] = useState({
    name: user?.name ?? "",
    login: user?.email ?? "",
    password: "",
  });
  const [isFormChanged, setIsFormChanged] = useState(false);

  const resetFormState = (userInfo = user) => {
    setForm({
      name: userInfo?.name ?? "",
      login: userInfo?.email ?? "",
      password: "",
    });
    setIsFormChanged(false);
  };

  const handleFormFieldChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: string,
  ) => {
    setForm({ ...form, [key]: e.target.value });
    if (!isFormChanged) {
      setIsFormChanged(true);
    }
  };

  const handleCancelClick = () => {
    resetFormState();
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await dispatch(updateUserInfo(form));
      const userInfo = await dispatch(getUserInfo()).unwrap();
      resetFormState(userInfo);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (!user) return;

    setForm({
      name: user.name,
      login: user.email,
      password: "",
    });
  }, [user]);

  return (
    <form className={styles.profileForm} onSubmit={handleSubmit}>
      <Input
        extraClass={styles.profileFormField}
        icon={"EditIcon"}
        id="name"
        placeholder="Имя"
        type="text"
        value={form.name}
        onChange={(e) => handleFormFieldChange(e, "name")}
        onPointerEnterCapture={console.log}
        onPointerLeaveCapture={console.log}
      />
      <Input
        extraClass={styles.profileFormField}
        icon={"EditIcon"}
        id="login"
        placeholder="Логин"
        type="text"
        value={form.login}
        onChange={(e) => handleFormFieldChange(e, "login")}
        onPointerEnterCapture={console.log}
        onPointerLeaveCapture={console.log}
      />
      <Input
        extraClass={styles.profileFormField}
        icon={"EditIcon"}
        id="pass"
        placeholder="Пароль"
        type="text"
        value={form.password}
        onChange={(e) => handleFormFieldChange(e, "password")}
        onPointerEnterCapture={console.log}
        onPointerLeaveCapture={console.log}
      />

      <div
        className={styles.buttonsBlock}
        style={{ display: isFormChanged ? "flex" : "none" }}
      >
        <Button
          htmlType="button"
          type="primary"
          size="medium"
          onClick={handleCancelClick}
        >
          Отмена
        </Button>
        <Button htmlType="submit" type="primary" size="medium">
          Сохранить
        </Button>
      </div>
    </form>
  );
};

export default ProfileForm;
