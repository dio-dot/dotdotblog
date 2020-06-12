import { useState, useEffect } from "react";
import gql from "graphql-tag";
import { useLazyQuery } from "@apollo/react-hooks";

const LOGIN_USER = gql`
  query loginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      id
      email
      type
      jwt
    }
  }
`;

const UseAuth = () => {
  const [user, setUser] = useState(null);
  const [loginUserQuery, { data, error, loading }] = useLazyQuery(LOGIN_USER);

  const signIn = (email, password) => {
    loginUserQuery({
      variables: { email, password },
    });
    if (data) {
      setUser(data);
    }
  };
  useEffect(() => {
    console.log("asdasd" + data);
    if (data) {
      setUser(data?.loginUser);
    }
  }, [data]);
  return {
    user,
    signIn,
  };
};

export default UseAuth;
