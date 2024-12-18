import React, { useState, useEffect } from "react";
import {
  Avatar,
  List,
  Text,
  Box,
  Page,
  Button,
  Header,
  Spinner,
  Modal,
  Icon,
} from "zmp-ui";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import {
  faCoins,
  faTransgender,
  faSchool,
  faGraduationCap,
} from "@fortawesome/free-solid-svg-icons";
import { getStudentInfo, getSchoolName, getTransaction } from "api/userInfo";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useNavigate } from "react-router-dom";
import { Phone } from "@mui/icons-material";

const UserPage = ({ studentId, accountId, info }) => {
  const [userInfo, setUserInfo] = useState(null);
  const [schoolName, setSchoolName] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [loadingTransactions, setLoadingTransactions] = useState(true); // Add loading state
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();
  const { Item } = List;

  console.log('userInfo', userInfo)


  const paymentLink = "https://vga-payment.vercel.app";

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
    return (
      <Box
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Spinner />
        <Text>Đang tải...</Text>
      </Box>
    );
  }
  // info?.userInfo?.avatar
  return (
    <>
      <Page className="page">
        <Header title="Thông tin cá nhân" showBackIcon={false} />
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
          <Modal
            visible={visible}
            title="Nạp điểm"
            onClose={() => setVisible(false)}
          >
            <Text style={{ marginBottom: "10px" }}>
              Để nạp điểm, hãy copy link dưới đây và dán vào trình duyệt để thực
              hiện nạp điểm.
            </Text>
            <Box
              style={{
                display: "flex",
                alignItems: "center",
                padding: "10px",
                backgroundColor: "#F9F9F9",
                justifyContent: "space-between",
              }}
            >
              <Text>{paymentLink}</Text>
              <CopyToClipboard text={paymentLink}>
                <Icon
                  icon="zi-copy"
                  onClick={() => alert("Đã sao chép link!")}
                />
              </CopyToClipboard>
            </Box>
          </Modal>
          <Avatar
            src={userInfo?.data?.image_Url || "default-avatar-url"}
            size="large"
            style={{ width: "80px", height: "80px" }}
          />

          <div>
            <Text size="large" style={{ fontWeight: "bold", fontSize: "20px" }}>
              {userInfo.data.account.name}
            </Text>
            <Text
              style={{ color: "grey", marginTop: "6px" }}
              onClick={() =>
                navigate("/userInfo", {
                  state: {
                    gender: userInfo.data.gender,
                    schoolName: schoolName?.data?.account?.name,
                    schoolYears: userInfo.data.schoolYears,
                    date: userInfo.data.dateOfBirth,
                    name: userInfo.data.account.name,
                    phone: userInfo.data.account.phone,
                    avatar: userInfo?.data?.image_Url || "default-avatar-url",
                  },
                })
              }
            >
              Xem thông tin
            </Text>
          </div>
        </Box>
        <Box
          style={{
            display: "flex",
            alignItems: "center",
            padding: "10px",
            backgroundImage:
              "url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-3bjkd32XySUSA_7HFCvui8pjysieOdWfUA&s)",
            gap: "80px",
            backgroundColor: "white",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
            borderBottom: "1px solid #ddd",
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
          <Button
            style={{ backgroundColor: "#FF6600", color: "white" }}
            onClick={() => {
              setVisible(true);
            }}
          // onClick={() =>
          //   (window.location.href = "https://vga-payment.vercel.app")
          // }
          >
            Nạp điểm
          </Button>
        </Box>

        {/* <div style={{ overflowY: "auto", maxHeight: "300px" }}>
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
                    {transaction?.transactionType === 1
                      ? "+"
                      : transaction?.transactionType === 7
                      ? "+"
                      : transaction?.transactionType === 4
                      ? " "
                      : transaction?.transactionType === 5
                      ? " "
                      : "-"}
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
        </div> */}
        {/* <Box
        style={{
          padding: "10px",
          backgroundColor: "white",
          marginTop: "2px",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
        onClick={() => navigate("/transaction")}
      >
        <Text bold size="xLarge" style={{ padding: "10px" }}>
          Lịch sử giao dịch
        </Text>
        <Icon
          icon="zi-chevron-right"
          style={{ color: "grey", fontSize: "30px" }}
        />
      </Box>
      <Box
        style={{
          padding: "10px",
          backgroundColor: "white",
          marginTop: "2px",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
        onClick={() => navigate("/expert")}
      >
        <Text bold size="xLarge" style={{ padding: "10px" }}>
          Lịch sử đã đặt tư vấn
        </Text>
        <Icon
          icon="zi-chevron-right"
          style={{ color: "grey", fontSize: "30px" }}
        />
      </Box>
      <Box
        style={{
          padding: "10px",
          backgroundColor: "white",
          marginTop: "2px",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
        onClick={() => navigate("/personal")}
      >
        <Text bold size="xLarge" style={{ padding: "10px" }}>
          Tính cách cá nhân
        </Text>
        <Icon
          icon="zi-chevron-right"
          style={{ color: "grey", fontSize: "30px" }}
        />
      </Box>
      <Box
        style={{
          padding: "10px",
          backgroundColor: "white",
          marginTop: "2px",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
          display: "flex",
          alignItems: "center",
          whiteSpace: "nowrap",
          justifyContent: "space-between",
        }}
        onClick={() => navigate("/majorCare")}
      >
        <Text bold size="xLarge" style={{ padding: "10px" }}>
          Ngành học quan tâm
        </Text>
        <Icon
          icon="zi-chevron-right"
          style={{ color: "grey", fontSize: "30px" }}
        />
      </Box>
      <Box
        style={{
          padding: "10px",
          backgroundColor: "white",
          marginTop: "2px",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
          display: "flex",
          alignItems: "center",
          whiteSpace: "nowrap",
          justifyContent: "space-between",
        }}
        onClick={() => navigate("/occupationCare")}
      >
        <Text bold size="xLarge" style={{ padding: "10px" }}>
          Nghề nghiệp quan tâm
        </Text>
        <Icon
          icon="zi-chevron-right"
          style={{ color: "grey", fontSize: "30px" }}
        />
      </Box> */}
        <Box style={{ backgroundColor: "white", marginTop: "10px" }}>
          <List>
            <Item
              style={{ marginBottom: "0px" }}
              title="Lịch sử giao dịch"
              prefix={<Icon icon="zi-poll" style={{ color: "orange" }} />}
              suffix={<Icon icon="zi-chevron-right" />}
              onClick={() => navigate("/transaction")}
            />
            <Item
              style={{ marginBottom: "0px" }}
              title="Lịch sử đã đặt tư vấn"
              prefix={<Icon icon="zi-calendar" style={{ color: "green" }} />}
              suffix={<Icon icon="zi-chevron-right" />}
              onClick={() => navigate("/expert")}
            />
            <Item
              style={{ marginBottom: "0px" }}
              title="Tính cách cá nhân"
              prefix={<Icon icon="zi-stranger" style={{ color: "blue" }} />}
              suffix={<Icon icon="zi-chevron-right" />}
              onClick={() => navigate("/personal")}
            />
            <Item
              style={{ marginBottom: "0px" }}
              title="Ngành học quan tâm"
              prefix={<Icon icon="zi-heart" style={{ color: "red" }} />}
              suffix={<Icon icon="zi-chevron-right" />}
              onClick={() => navigate("/majorCare")}
            />
            <Item
              title="Nghề nghiệp quan tâm"
              prefix={<Icon icon="zi-star" style={{ color: "darkmagenta" }} />}
              suffix={<Icon icon="zi-chevron-right" />}
              onClick={() => navigate("/occupationCare")}
            />
          </List>
        </Box>

        {/* <Box
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
      </Box> */}
      </Page>
    </>
  );
};

export default UserPage;
