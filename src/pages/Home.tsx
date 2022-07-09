import { Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import { useUserAuth } from "../context/UserAuthContext";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase-config";
import { useEffect, useState } from "react";
import MyImage from '../assets/the-jar.png';

import "../css/Home.css";



const Home = () => {
  const { logOut, user } = useUserAuth();
  const navigate = useNavigate();

  const [loading, setLoading] = useState<Boolean>(true)
  const [userList, setUserList] = useState<String[]>([])
  const [chosenItem, setChosenItem] = useState<String>('Shake the Jar!')

  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (error : any) {
      console.log(error.message);
    }
  };

  const fetchData = async () => {
    if(user.email){
      const q = query(collection(db, "userbucketlist"), 
        where("userEmail", "==", user.email)
      );

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUserList(doc.data().items)
      });

      setLoading(false)
    }
  }

  const shakeTheJar = () => {
    if(!loading){
      setLoading(true)
      setTimeout(() => {
        const randomItem = userList[Math.floor(Math.random() * userList.length)];
        setLoading(false)
        setChosenItem(randomItem)
      }, 1000)
    }
  }

  useEffect(() => {
    if(user.email){fetchData();}
  }, [user?.email])

  return (
    <>
      <span className="header-title">THE JAR</span>
      <span className="header-subtitle">Welcome {user.displayName}</span>
      <div className="d-grid gap-2">
        <Button variant="primary" onClick={handleLogout}>
          Log out
        </Button>
      </div>
      <div className="selected-activity">
        { loading && userList.length > 0 ? (
          <span>Picking from the Jar...</span>
        ) : loading && userList.length == 0 ? (
          <span>Loading...</span>
        ) : (
          <span>{chosenItem}</span>
        )}
      </div>
      <img src={MyImage} alt="the jar" className="the-jar" onClick={shakeTheJar} />
    </>
  );
};

export default Home;