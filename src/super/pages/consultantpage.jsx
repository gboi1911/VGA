import React, { useState, useEffect } from "react";
import { Avatar, List, Text, Box, Page, Button, Header } from "zmp-ui";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import {
  faCoins,
  faTransgender,
  faSchool,
  faGraduationCap,
} from "@fortawesome/free-solid-svg-icons";
import { getConsultantInfo, getSchoolName, getTransaction } from "api/userInfo";

const ConsultantPage = ({ consultantId, accountId }) => {
  const [userInfo, setUserInfo] = useState(null);
  // const [schoolName, setSchoolName] = useState(null);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await getConsultantInfo(consultantId);
        setUserInfo(response.data);
        console.log("Consultant info: ", response.data);

        // Call fetchSchoolName after userInfo is set
        // const highSchoolId = data.data.highSchoolId;
        // console.log("Highschool ID:", highSchoolId);
        // const schoolName = await getSchoolName(highSchoolId);
        // setSchoolName(schoolName);
        // console.log("School info: ", schoolName);
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };

    const fetchTransactions = async () => {
      try {
        const response = await getTransaction(accountId);
        setTransactions(response.data.transactions);
        console.log("Transaction info: ", response.data.transactions);
      } catch (error) {
        console.error("Error in fetching transaction:", error);
      }
    };

    fetchUserInfo();
    fetchTransactions();
  }, []);

  if (!userInfo) {
    return <div>Loading...</div>;
  }

  return (
    <Page className="page" style={{ marginTop: '40px' }}>
      <Header title="Thông tin cá nhân" showBackIcon={false} style={{ textAlign: 'center' }} />
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
          src={userInfo?.avatar}
          size="large"
          style={{ width: "80px", height: "80px" }}
        />
        <Text size="Normal" style={{ fontWeight: "bold", fontSize: "20px" }}>
          {userInfo?.name}
        </Text>
      </Box>
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
          marginTop: "5px",
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
          <Text bold size="large" style={{ color: "#FFCC00" }}>
            {/* {userInfo?.account.wallet.goldBalance} */}
            50000
          </Text>
          <FontAwesomeIcon
            icon={faCoins}
            size="xl"
            style={{
              marginRight: "10px",
              color: "#FFD700",
              marginLeft: "15px",
            }}
          />
        </Box>
        <Button style={{ backgroundColor: "#FF6600", color: "white" }}>
          Đổi điểm
        </Button>
      </Box>
      <Box
        style={{
          padding: "10px",
          borderRadius: "5px",
          backgroundColor: "white",
          marginTop: "5px",
          // Limit height to 300px
          // Enable vertical scrolling
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Text bold size="xLarge" style={{ padding: "10px" }}>
          Lịch sử giao dịch
        </Text>
        <div style={{ overflowY: "auto", maxHeight: "300px" }}>
          {transactions.map((transaction) => (
            <Box
              key={transaction.id}
              style={{
                justifyContent: "space-between",
                alignItems: "center",
                padding: "10px",
                borderBottom: "1px solid #ddd",
                marginTop: "5px",
                backgroundColor: "#F9F9F9",
                borderRadius: "5px",
              }}
            >
              <Box
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Text style={{ fontWeight: "bold", color: "#FFCC00" }}>
                  + {transaction?.goldAmount}{" "}
                  <FontAwesomeIcon
                    icon={faCoins}
                    size="xl"
                    style={{
                      marginRight: "10px",
                      color: "#FFD700",
                      marginLeft: "5px",
                    }}
                  />
                </Text>
                <Text
                  size="small"
                  style={{ color: "#888", textAlign: "right" }}
                >
                  {moment(transaction?.transactionDateTime).format(
                    "DD/MM/YYYY HH:mm"
                  )}
                </Text>
              </Box>
              <Text size="large" style={{ color: "#555", marginTop: "8px" }}>
                {transaction?.description}
              </Text>
            </Box>
          ))}
        </div>
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
          marginTop: "5px",
        }}
      >
        <FontAwesomeIcon
          icon={faTransgender}
          size="lg"
          style={{ marginRight: "10px" }}
        />
        <Text bold>Giới tính: </Text>
        <Text style={{ marginLeft: "5px" }}>
          {userInfo?.gender ? "Nam" : "Nữ"}
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
          marginTop: "5px",
        }}
      >
        <FontAwesomeIcon
          icon={faSchool}
          size="lg"
          style={{ marginRight: "10px" }}
        />
        <Text size="large">{userInfo?.email}</Text>
      </Box>
      <Box
        style={{
          display: "flex",
          alignItems: "center",
          padding: "10px",
          borderRadius: "5px",
          backgroundColor: "white", // White background
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)", // Subtle shadow
          marginTop: "5px",
        }}
      >
        <FontAwesomeIcon
          icon={faGraduationCap}
          size="lg"
          style={{ marginRight: "10px" }}
        />
        <Text bold>Tư vấn viên: </Text>
        <Text style={{ marginLeft: "5px" }}>{userInfo?.description}</Text>
      </Box>
      <Box
        style={{
          display: "flex",
          alignItems: "center",
          padding: "10px",
          borderRadius: "5px",
          backgroundColor: "white", // White background
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)", // Subtle shadow
          marginTop: "5px",
        }}
      >
        <FontAwesomeIcon
          icon={faGraduationCap}
          size="lg"
          style={{ marginRight: "10px" }}
        />
        <Text bold>Tư vấn viên: </Text>
        <Text style={{ marginLeft: "5px" }}>
          {userInfo?.consultantLevel?.name}
        </Text>
      </Box>
    </Page>
  );
};

export default ConsultantPage;
