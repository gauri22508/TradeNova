import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";

const Home = () => {
    const navigate = useNavigate();
    const [cookies, removeCookie] = useCookies(["token"]);

    useEffect(() => {
        const verifyCookie = async () => {
            if (!cookies.token) {
                navigate("/login");
                return;
            }

            try {
                const { data } = await axios.post(
                    "http://localhost:3002/verify",
                    {},
                    { withCredentials: true }
                );

                if (!data.status) {
                    removeCookie("token");
                    navigate("/login");
                    return;
                }

                window.location.href = "http://localhost:3001/";
            } catch (error) {
                removeCookie("token");
                navigate("/login");
            }
        };

        verifyCookie();
    }, [cookies.token, navigate, removeCookie]);

    return <p>Opening dashboard...</p>;
};

export default Home;