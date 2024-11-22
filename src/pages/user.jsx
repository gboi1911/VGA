import React, { useState, useEffect } from "react";
import { Avatar, List, Text, Box, Page, Button, Header, Spinner } from "zmp-ui";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import {
  faCoins,
  faTransgender,
  faSchool,
  faGraduationCap,
} from "@fortawesome/free-solid-svg-icons";
import { getStudentInfo, getSchoolName, getTransaction } from "api/userInfo";

const UserPage = ({ studentId, accountId }) => {
  const [userInfo, setUserInfo] = useState(null);
  const [schoolName, setSchoolName] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [loadingTransactions, setLoadingTransactions] = useState(true); // Add loading state

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const data = await getStudentInfo(studentId);
        setUserInfo(data);

        const highSchoolId = data.data.highSchoolId;
        const schoolName = await getSchoolName(highSchoolId);
        setSchoolName(schoolName);
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };

    const fetchTransactions = async () => {
      try {
        setLoadingTransactions(true); // Start loading
        const response = await getTransaction(accountId);
        setTransactions(response.data.transactions);
      } catch (error) {
        console.error("Error in fetching transaction:", error);
      } finally {
        setLoadingTransactions(false); // End loading
      }
    };

    fetchUserInfo();
    fetchTransactions();
  }, []);

  if (!userInfo) {
    return <div>Loading user info...</div>;
  }

  return (
    <Page className="page" style={{ marginBottom: "48px", marginTop: "40px" }}>
      <Header
        title="Thông tin cá nhân"
        showBackIcon={false}
        style={{ textAlign: "center" }}
      />
      <Box
        style={{
          display: "flex",
          alignItems: "center",
          gap: "20px",
          padding: "20px",
          borderRadius: "5px",
          backgroundColor: "white",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
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

      <Box
        style={{
          display: "flex",
          alignItems: "center",
          padding: "10px",
          backgroundImage:
            "url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-3bjkd32XySUSA_7HFCvui8pjysieOdWfUA&s)",
          gap: "80px",
          borderRadius: "5px",
          backgroundColor: "white",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
          borderBottom: "1px solid #ddd",
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
            {userInfo.data.account.wallet.goldBalance}
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
          Mua
        </Button>
      </Box>

      <Box
        style={{
          padding: "10px",
          borderRadius: "5px",
          backgroundColor: "white",
          marginTop: "5px",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Text bold size="xLarge" style={{ padding: "10px" }}>
          Lịch sử giao dịch
        </Text>
        <div style={{ overflowY: "auto", maxHeight: "300px" }}>
          {loadingTransactions ? ( // Show loading spinner or message
            <div style={{ textAlign: "center", padding: "20px" }}>
              <Spinner size="large" color="primary" />
              <Text size="medium" style={{ marginTop: "10px" }}>
                Đang tải giao dịch...
              </Text>
            </div>
          ) : (
            transactions.map((transaction) => (
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
                    {transaction?.transactionType === 1 ? "+" : "-"}{" "}
                    {transaction?.goldAmount}{" "}
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
                    {moment(transaction.transactionDateTime).format(
                      "DD/MM/YYYY HH:mm"
                    )}
                  </Text>
                </Box>
                <Text size="large" style={{ color: "#555", marginTop: "8px" }}>
                  {transaction.description}
                </Text>
              </Box>
            ))
          )}
        </div>
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
          icon={faTransgender}
          size="lg"
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
          marginTop: "5px",
        }}
      >
        <FontAwesomeIcon
          icon={faSchool}
          size="lg"
          style={{ marginRight: "10px" }}
        />
        <Text bold>Trường: </Text>
        <Text style={{ marginLeft: "5px" }}>
          {schoolName?.data?.account?.name}
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
          icon={faGraduationCap}
          size="lg"
          style={{ marginRight: "10px" }}
        />
        <Text bold>Năm học: </Text>
        <Text style={{ marginLeft: "5px" }}>{userInfo.data.schoolYears}</Text>
      </Box>
    </Page>
  );
};

export default UserPage;
