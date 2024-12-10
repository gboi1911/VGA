import React from "react";
import { Avatar, List, Text, Box, Page, Header } from "zmp-ui";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import moment from "moment";
import "moment/locale/vi";

const UserInfoConst = () => {
  const [dateVn, setDateVn] = useState("");
  const location = useLocation();
  const { gender, schoolName, name, date, phone, avatar, email, description } =
    location.state || {};

  console.log(schoolName);

  useEffect(() => {
    moment.locale("vi"); // Set locale to Vietnamese
    if (date) {
      const formattedDate = moment(date).format("LL"); // Format the date
      setDateVn(formattedDate);
    }
  }, [date]);

  return (
    <Page style={{ marginBottom: "48px", marginTop: "40px" }}>
      <Header title="Thông tin cá nhân" />
      <Box
        style={{
          width: "100%",
          height: "200px",
          backgroundImage:
            'url("https://t3.ftcdn.net/jpg/01/56/47/38/360_F_156473812_UwzjWThkgMozpRPcN2YFMQQO9qSU17pM.webp")',
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Box
          style={{
            position: "absolute",
            marginTop: "130px",
            left: "16px",
            display: "flex",
            alignItems: "center",
          }}
        >
          {/* Avatar */}
          <Avatar
            src={avatar} // Replace with user's profile image URL
            size="large"
            style={{ width: "60px", height: "60px" }}
          />
          {/* Name */}
          <Text
            style={{
              fontSize: "18px",
              fontWeight: "bold",
              marginLeft: "12px",
              color: "white",
            }}
          >
            {name}
          </Text>
        </Box>
      </Box>

      {/* User Info Section */}
      <Box
        style={{
          padding: "16px",
          backgroundColor: "white",
          borderRadius: "8px",
        }}
      >
        <Text
          style={{ fontSize: "16px", fontWeight: "bold", marginBottom: "8px" }}
        >
          Thông tin cá nhân
        </Text>
        <List>
          <List.Item style={{ marginBottom: "0px" }}>
            <Box
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <Text style={{ color: "grey" }}>Giới tính</Text>
              <Text>{gender ? "Nam" : "Nữ"}</Text>
            </Box>
          </List.Item>
          <List.Item style={{ marginBottom: "0px" }}>
            <Box
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <Text style={{ color: "grey" }}>Ngày sinh</Text>
              <Text>{dateVn}</Text>
            </Box>
          </List.Item>
          <List.Item style={{ marginBottom: "0px" }}>
            <Box
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <Text style={{ color: "grey" }}>Điện thoại</Text>
              <Text>+{phone}</Text>
            </Box>
          </List.Item>
          <List.Item style={{ marginBottom: "0px" }}>
            <Box
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <Text style={{ color: "grey" }}>Email</Text>
              <Text>{email}</Text>
            </Box>
          </List.Item>
          <List.Item style={{ marginBottom: "0px" }}>
            <Box
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <Text style={{ color: "grey" }}>Đại học</Text>
              <Box>
                {schoolName.map((university) => (
                  <Text key={university.id} style={{ textAlign: "right" }}>
                    {university.universityName}
                  </Text>
                ))}
              </Box>
            </Box>
          </List.Item>

          <List.Item style={{ marginBottom: "0px" }}>
            <Box
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <Text style={{ color: "grey" }}>Chi tiết</Text>
              <Text>{description}</Text>
            </Box>
          </List.Item>
        </List>
      </Box>
    </Page>
  );
};

export default UserInfoConst;
