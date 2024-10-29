import React, { useState, useEffect } from "react";
import { Avatar, List, Text, Box, Page, Button } from "zmp-ui";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCoins,
  faTransgender,
  faSchool,
  faGraduationCap,
} from "@fortawesome/free-solid-svg-icons";
import { getStudentInfo, getSchoolName } from "api/userInfo";

const UserPage = ({ studentId }) => {
  const [userInfo, setUserInfo] = useState(null);
  const [schoolName, setSchoolName] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const data = await getStudentInfo(studentId);
        setUserInfo(data);
        console.log("Student info: ", data);

        // Call fetchSchoolName after userInfo is set
        const highSchoolId = data.data.highSchoolId;
        console.log("Highschool ID:", highSchoolId);
        const schoolName = await getSchoolName(highSchoolId);
        setSchoolName(schoolName);
        console.log("School info: ", schoolName);
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };

    fetchUserInfo();
  }, []);

  if (!userInfo) {
    return <div>Loading...</div>;
  }

  return (
    <Page className="page">
      {/* User Info Section (First Box) */}
      <Box
        style={{
          display: "flex",
          alignItems: "center",
          gap: "20px",
          padding: "20px",
          borderRadius: "5px",
          backgroundColor: "white", // White background
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)", // Subtle shadow
        }}
      >
        <Avatar
          src={userInfo.avatar}
          size="large"
          style={{ width: "80px", height: "80px" }}
        />
        <Text size="large" style={{ fontWeight: "bold", fontSize: "20px" }}>
          {userInfo.data.account.name}
        </Text>
      </Box>

      {/* Gold Info Section (Second Box) */}
      <Box
        style={{
          display: "flex",
          alignItems: "center",
          padding: "10px",
          backgroundImage:
            "url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-3bjkd32XySUSA_7HFCvui8pjysieOdWfUA&s)",
          gap: "80px",
          borderRadius: "5px",
          backgroundColor: "white", // White background
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)", // Subtle shadow
          borderBottom: "1px solid #ddd", // Divider line
          marginTop: "10px",
        }}
      >
        <Box
          style={{
            display: "flex",
            backgroundColor: "white",
            borderRadius: "20px",
            marginLeft: "30px",
            padding: "10px",
            boxShadow: "inset -2px 2px 4px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Text size="large">{userInfo.data.account.wallet.goldBalance}</Text>
          <FontAwesomeIcon
            icon={faCoins}
            size="large"
            style={{
              marginRight: "10px",
              color: "#FFD700",
              marginLeft: "15px",
            }}
          />
        </Box>
        <Button style={{ backgroundColor: "#FF6600", color: "white" }}>
          Mua
        </Button>
      </Box>

      {/* User Details Section (Following Boxes) */}
      <Box
        style={{
          display: "flex",
          alignItems: "center",
          padding: "10px",
          borderRadius: "5px",
          backgroundColor: "white", // White background
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)", // Subtle shadow
          borderBottom: "1px solid #ddd", // Divider line
          marginTop: "10px",
        }}
      >
        <FontAwesomeIcon
          icon={faTransgender}
          size="large"
          style={{ marginRight: "10px" }}
        />
        <Text bold>Giới tính: </Text>
        <Text style={{ marginLeft: "5px" }}>
          {userInfo.data.gender ? "Nam" : "Nữ"}
        </Text>
      </Box>
      <Box
        style={{
          display: "flex",
          alignItems: "center",
          padding: "10px",
          borderRadius: "5px",
          backgroundColor: "white", // White background
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)", // Subtle shadow
          borderBottom: "1px solid #ddd", // Divider line
          marginTop: "10px",
        }}
      >
        <FontAwesomeIcon
          icon={faSchool}
          size="large"
          style={{ marginRight: "10px" }}
        />
        {schoolName && <Text size="large">{schoolName.data.account.name}</Text>}
        {!schoolName && <Text>Đang lấy thông tin trường...</Text>}
      </Box>
      <Box
        style={{
          display: "flex",
          alignItems: "center",
          padding: "10px",
          borderRadius: "5px",
          backgroundColor: "white", // White background
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)", // Subtle shadow
          marginTop: "10px",
        }}
      >
        <FontAwesomeIcon
          icon={faGraduationCap}
          size="large"
          style={{ marginRight: "10px" }}
        />
        <Text bold>Năm tốt nghiệp: </Text>
        <Text style={{ marginLeft: "5px" }}>{userInfo.data.schoolYears}</Text>
      </Box>
    </Page>
  );
};

export default UserPage;
