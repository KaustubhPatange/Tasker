import React, { useEffect } from "react";
import { actionTypes } from "../provider/reducer";
import { useStateValue } from "../provider/StateProvider";

function Home() {
  const [state, dispatch] = useStateValue();
  useEffect(() => {
    dispatch({
      type: actionTypes.SET_SHOW_SEARCH,
      showSearchBar: false,
    });
  }, []);
  return (
    <>
      <div>Home</div>
    </>
  );
}

export default Home;
