import React, { useEffect, useState } from "react";
import * as signalR from "@microsoft/signalr";
import { Page, Box, Text, Header } from "zmp-ui";
import { getNotification, updateNotificationStatus } from "api/userInfo";
import { useNavigate } from "react-router-dom";

const Notification = ({ accountId }) => {
  const token = localStorage.getItem("token");
  const [messages, setMessages] = useState([]);
  const [status, setStatus] = useState("");
  const [notiList, setNotiList] = useState([]);
  const navigate = useNavigate();

  const accessToken = token; // Your JWT token

  useEffect(() => {
    const connection = new signalR.HubConnectionBuilder()
      .withUrl(
        `https://vgasystem-emf5a7bqfec2fjh9.southeastasia-01.azurewebsites.net/notification_hub`,
        {
          accessTokenFactory: () => accessToken,
        }
      )
      .withAutomaticReconnect()
      .build();

    connection
      .start()
      .then(() => {
        setStatus("Connected to SignalR");
        console.log("Connected to SignalR hub.");

        connection.on("ReceiveNotification", (message) => {
          console.log("Received notification:", message);
          setMessages((prevMessages) => [...prevMessages, message]);
        });
      })
      .catch((err) => {
        setStatus(`Connection failed: ${err}`);
        console.error(err);
      });

    return () => {
      connection.stop();
    };
  }, [accessToken]);

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

    // Navigate based on notification message
    if (notification.title.includes("lịch tư vấn mới")) {
      navigate("/expert", { state: { tab: "history" } });
    } else if (notification.title.includes("cập nhật số lượng xu")) {
      navigate("/user");
    } else if (notification.title.includes("yêu cầu đổi điểm thưởng")) {
      navigate("/user");
    }
  };

  return (
    <Page>
      <Header title="Thông báo" />

      <Box style={{ padding: "16px", textAlign: "center" }}>
        <Text>{status}</Text>
      </Box>

      <Box style={{ padding: "16px" }}>
        {notiList.length > 0 ? (
          notiList.map((noti, index) => (
            <Box
              key={index}
              onClick={() => handleNotificationClick(noti)}
              style={{
                border: "1px solid #ddd",
                borderRadius: "8px",
                padding: "12px",
                marginBottom: "4px",
                backgroundColor: noti.status === 0 ? "#ffe4e1" : "#fff",
                animation: noti.status === 0 ? "twinkle 2s infinite" : "none",
              }}
            >
              <Text
                style={{
                  fontWeight: "bold",
                  marginBottom: "8px",
                  fontSize: "16px",
                }}
              >
                {noti.title}
              </Text>
              <Text style={{ marginBottom: "4px" }}>{noti.message}</Text>
              <Text
                style={{ fontSize: "12px", color: "#888", textAlign: "end" }}
              >
                {new Date(noti.createdAt).toLocaleString("vi-VN")}
              </Text>
            </Box>
          ))
        ) : (
          <Text style={{ textAlign: "center", color: "#888" }}>
            Chưa có thông báo nào.
          </Text>
        )}
      </Box>

      <style>
        {`
          @keyframes twinkle {
            0%, 100% { background-color: #99FFFF; }
            50% { background-color: #33CCFF; }
          }
        `}
      </style>
    </Page>
  );
};

export default Notification;
