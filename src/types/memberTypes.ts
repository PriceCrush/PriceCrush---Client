export interface userInfoAndCheckProps {
  handleUserInfo: Function;
  passOrNot: Function;
}

export interface MemberInputFormProps extends userInfoAndCheckProps {
  type: string;
  children: string;
  name: string;
}
