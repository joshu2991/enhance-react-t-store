import React, { useEffect } from "react";
import { toast } from "react-toastify";

//Redux
import { useSelector , useDispatch } from "react-redux";
import { setUserId } from "../features/counter/userSlice";

const Dashboard = ({ setAuth }) => {
  const userid = useSelector((state) => state.user.userId);
  console.log('-->userid:', userid);
  const dispatch = useDispatch();


  const logout = async e => {
    e.preventDefault();
    try {
      localStorage.removeItem("token");
      setAuth(false);
      toast.success("Logout successfully");
    } catch (err) {
      console.error(err.message);
    }
  };
// eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => {
    const getProfile = async () => {
      try {
        const res = await fetch("http://localhost:4500/dashboard/", {
          method: "POST",
          headers: { jwt_token: localStorage.token }
        });
  
        const parseData = await res.json();
        console.log('-->parsedData.user_id got:', parseData.user_id);
        dispatch(setUserId(parseData.user_id))

        // setName(parseData.user_name);
      } catch (err) {
        console.error(err.message);
      }
    };
    getProfile();
  }, []);// eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      <h1 className="mt-5">Daaashboard</h1>
      <h2>Weelcomeee baack: {userid}</h2>
      <button onClick={e => logout(e)} className="btn btn-primary">
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
