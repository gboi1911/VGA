import React, { useEffect, useState } from "react";
import * as signalR from "@microsoft/signalr";
import { Page, Box, Text, Header, Spinner } from "zmp-ui";
import { getNotification, updateNotificationStatus } from "api/userInfo";
import { useNavigate } from "react-router-dom";

const Notification = ({ accountId, role }) => {
  const token = localStorage.getItem("token");
  const [messages, setMessages] = useState([]);
  const [status, setStatus] = useState("");
  const [notiList, setNotiList] = useState([]);
  const navigate = useNavigate();

  const accessToken = token; // Your JWT token

  // useEffect(() => {
  //   const connection = new signalR.HubConnectionBuilder()
  //     .withUrl(
  //       `https://vgasystem-emf5a7bqfec2fjh9.southeastasia-01.azurewebsites.net/notification_hub`,
  //       {
  //         accessTokenFactory: () => accessToken,
  //       }
  //     )
  //     .withAutomaticReconnect()
  //     .build();

  //   connection
  //     .start()
  //     .then(() => {
  //       setStatus("Connected to SignalR");
  //       console.log("Connected to SignalR hub.");

  //       connection.on("ReceiveNotification", (message) => {
  //         console.log("Received notification:", message);
  //         setMessages((prevMessages) => [...prevMessages, message]);
  //       });
  //     })
  //     .catch((err) => {
  //       setStatus(`Connection failed: ${err}`);
  //       console.error(err);
  //     });

  //   return () => {
  //     connection.stop();
  //   };
  // }, [accessToken]);

  useEffect(() => {
    const fetchNotification = async () => {
      try {
        const response = await getNotification(accountId);
        setNotiList(response.data);
      } catch (error) {
        console.error("Error fetching notification list:", error);
      }
    };

    fetchNotification();
  }, [accountId]);

  const handleNotificationClick = async (notification) => {
    if (notification.status === 0) {
      try {
        await updateNotificationStatus(notification.id, 1);
        setNotiList((prevList) =>
          prevList.map((noti) =>
            noti.id === notification.id ? { ...noti, status: 1 } : noti
          )
        );
      } catch (error) {
        console.error("Error updating notification status:", error);
        return;
      }
    }

    // Parse notification message
    const [messageText, newsId] = notification.message.split("|");

    if (newsId) {
      // Navigate to the news page
      navigate(`/newsdetail/${newsId.trim()}`);
    } else if (
      notification.title.includes("cập nhật thông tin điểm") ||
      notification.title.includes("đã sử dụng điểm")
    ) {
      if (role === 2) {
        navigate("/transaction");
      } else if (role === 4) {
        navigate("/consultantpage");
      }
    } else if (
      notification.title.includes("yêu cầu rút tiền đã xử lý thành công")
    ) {
      navigate("/consultantpage");
    } else if (notification.title.includes("có lịch tư vấn đã được đặt")) {
      navigate("/consultantScheldule", { state: { tab: "tab2" } });
    }
  };

  return (
    <>
      <Page className="page">
        <Header title="Thông báo" showBackIcon={false} />
        <Box style={{ padding: "16px" }}>
          {notiList.length > 0 ? (
            notiList.map((noti, index) => (
              <Box
                key={index}
                onClick={() => handleNotificationClick(noti)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  padding: "12px",
                  marginBottom: "4px",
                  backgroundColor: noti.status === 0 ? "#66CCFF" : "#fff",
                  // animation: noti.status === 0 ? "twinkle 2s infinite" : "none",
                }}
              >
                <img
                  src="https://cdn-icons-png.freepik.com/256/9187/9187529.png?ga=GA1.1.1580058560.1730717628&semt=ais_hybrid"
                  style={{
                    height: "50px",
                    width: "50px",
                  }}
                />
                <div style={{ marginLeft: "10px" }}>
                  <Text
                    style={{
                      fontWeight: "bold",
                      marginBottom: "8px",
                      fontSize: "16px",
                    }}
                  >
                    {noti.title}
                  </Text>
                  <Text style={{ marginBottom: "4px" }}>
                    {noti.message.split("|")[0]} {/* Display text before `|` */}
                  </Text>

                  <Text
                    style={{
                      fontSize: "12px",
                      color: "#888",
                      textAlign: "end",
                    }}
                  >
                    {new Date(noti.createdAt).toLocaleString("vi-VN")}
                  </Text>
                </div>
              </Box>
            ))
          ) : (
            <Box
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Spinner />
              <Text>Đang tải...</Text>
            </Box>
          )}
        </Box>

        {/* <style>
        {`
          @keyframes twinkle {
            0%, 100% { background-color: #99FFFF; }
            50% { background-color: #33CCFF; }
          }
        `}
      </style> */}
      </Page>
    </>
  );
};

export default Notification;
