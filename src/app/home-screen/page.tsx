"use client";

import {
  useAppSelector
} from "@/src/redux/hooks";

export default function HomeScreen() {

  const user =
    useAppSelector(
      state => state.auth.profile
    );

  return (

    <div
      style={{
        padding: "30px"
      }}
    >

      <h1>
        Home Screen
      </h1>

      <br />

      <h2>
        Welcome {user?.name}
      </h2>

      <br />

      <p>
        Mobile :
        {user?.contactNumber}
      </p>

      <p>
        Merchant :
        {user?.merchantId}
      </p>

      <p>
        Address :
        {user?.address}
      </p>

      <img
        src={user?.imageUrl}
        width={150}
        alt="profile"
      />

    </div>
  );
}