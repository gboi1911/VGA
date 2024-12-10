import React, { useState, useEffect } from "react";
import {
  Avatar,
  List,
  Text,
  Box,
  Page,
  Button,
  Header,
  Modal,
  Input,
  Icon,
} from "zmp-ui";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import {
  faCoins,
  faTransgender,
  faSchool,
  faGraduationCap,
  faAddressCard,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import {
  getConsultantInfo,
  getSchoolName,
  getTransaction,
  postWithdrawRequest,
  getGoldBallanceConsultant,
} from "api/userInfo";
import { useNavigate } from "react-router-dom";

const ConsultantPage = ({ consultantId, accountId }) => {
  const [userInfo, setUserInfo] = useState(null);
  // const [schoolName, setSchoolName] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [goldAmount, setGoldAmount] = useState("");
  const [isInputModalOpen, setIsInputModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [goldBallance, setGoldBallance] = useState({});
  const [resultModal, setResultModal] = useState({ open: false, message: "" });
  const [errorText, setErrorText] = useState("");
  const [status, setStatus] = useState("");

  const { Item } = List;
  const navigate = useNavigate();

  // const fetchTransactions = async () => {
  //   try {
  //     const response = await getTransaction(accountId);
  //     setTransactions(response.data.transactions);
  //     console.log("Transaction info: ", response.data.transactions);
  //   } catch (error) {
  //     console.error("Error in fetching transaction:", error);
  //   }
  // };

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

    // const fetchTransactions = async () => {
    //   try {
    //     const response = await getTransaction(accountId);
    //     setTransactions(response.data.transactions);
    //     console.log("Transaction info: ", response.data.transactions);
    //   } catch (error) {
    //     console.error("Error in fetching transaction:", error);
    //   }
    // };

    const fetchGoldBallance = async () => {
      try {
        const response = await getGoldBallanceConsultant(accountId);
        setGoldBallance(response.data);
      } catch (error) {
        console.error("Error in fetching gold balance:", error);
      }
    };

    fetchUserInfo();
    // fetchTransactions();
    fetchGoldBallance();
  }, []);

  const handleWithdraw = async () => {
    try {
      // Ensure proper arguments are passed to the API function
      const response = await postWithdrawRequest(
        consultantId,
        Number(goldAmount)
      );
      // Check the success status and set the message accordingly
      if (response.isSuccess) {
        setResultModal({
          open: true,
          message: "Yêu cầu đổi điểm của bạn đã thành công!",
        });
      } else {
        setResultModal({
          open: true,
          message: "Yêu cầu không thành công. Vui lòng thử lại.",
        });
      }
    } catch (error) {
      // Show error message
      setResultModal({
        open: true,
        message:
          error.response?.data?.message ||
          "Đã xảy ra lỗi khi xử lý yêu cầu của bạn.",
      });
    } finally {
      // Reset modal and input state
      setIsConfirmModalOpen(false);
      setGoldAmount("");
    }
  };

  const handleGoldAmountInput = () => {
    if (Number(goldAmount) > goldBallance.goldBalance) {
      setResultModal({
        open: true,
        message: "Số điểm trong ví không đủ, vui lòng nhập lại số điểm phù hợp",
      });
      setGoldAmount("");
      // Stay in the input modal
    } else {
      setIsInputModalOpen(false); // Close input modal
      setIsConfirmModalOpen(true); // Open confirm modal
    }
  };

  const handleModalClose = () => {
    // Reload the page if the exchange was successful
    if (resultModal.message === "Yêu cầu đổi điểm của bạn đã thành công!") {
      // window.location.reload();
      fetchTransactions();
    }
    setResultModal({ open: false, message: "" });
  };

  if (!userInfo) {
    return <div>Loading...</div>;
  }

  return (
    <Page className="page" style={{ marginTop: "40px" }}>
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
          backgroundColor: "white", // White background
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)", // Subtle shadow
        }}
      >
        <Avatar
          src={userInfo?.image_Url}
          size="large"
          style={{ width: "80px", height: "80px" }}
        />
        <div>
          <Text size="Normal" style={{ fontWeight: "bold", fontSize: "20px" }}>
            {userInfo?.name}
          </Text>
          <Text
            style={{ color: "grey", marginTop: "6px" }}
            onClick={() =>
              navigate("/userInfoConst", {
                state: {
                  gender: userInfo?.gender,
                  schoolName: userInfo?.consultantRelations,
                  date: userInfo?.dateOfBirth,
                  name: userInfo?.name,
                  phone: userInfo?.phone,
                  avatar: userInfo?.image_Url,
                  email: userInfo?.email,
                  description: userInfo?.description,
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
          <Text bold size="large" style={{ color: "#FFCC00" }}>
            {/* {userInfo?.account.wallet.goldBalance} */}
            {goldBallance.goldBalance}
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
          onClick={() => setIsInputModalOpen(true)}
        >
          Đổi điểm
        </Button>
      </Box>
      {/* <Box
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
                  {transaction?.transactionType === 1
                    ? "+"
                    : transaction?.transactionType === 4
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
      </Box> */}

      {/* User Details Section (Following Boxes) */}
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
          icon={faEnvelope}
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
          icon={faAddressCard}
          size="lg"
          style={{ marginRight: "10px" }}
        />
        <Text bold>Mô tả: </Text>
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
        <Text bold>Cấp độ tư vấn viên: </Text>
        <Text style={{ marginLeft: "5px" }}>
          {userInfo?.consultantLevel?.name}
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
          marginTop: "5px",
        }}
      >
        <FontAwesomeIcon
          icon={faSchool}
          size="lg"
          style={{ marginRight: "10px" }}
        />
        <Text bold>Đại học: </Text>
        <Text style={{ marginLeft: "5px" }}>
          {userInfo?.university?.account?.name}
        </Text>
      </Box> */}
      <Box style={{ backgroundColor: "white", marginTop: "10px" }}>
        <List>
          <Item
            style={{ marginBottom: "0px" }}
            title="Lịch sử giao dịch"
            prefix={<Icon icon="zi-poll" style={{ color: "blue" }} />}
            suffix={<Icon icon="zi-chevron-right" />}
            onClick={() => navigate("/transaction")}
          />
        </List>
      </Box>
      {/* Input Modal */}
      <Modal
        visible={isInputModalOpen}
        onClose={() => {
          setIsInputModalOpen(false); // Close the modal
          setGoldAmount(""); // Clear the input
          setErrorText(""); // Clear the error message
          setStatus("");
        }}
        title="Đổi điểm"
      >
        <Box mt={5}>
          <Input
            type="text"
            value={goldAmount}
            onChange={(e) => {
              const value = e.target.value;
              const numericValue = value.replace(/[^0-9]/g, "");

              if (numericValue.length <= 6) {
                setGoldAmount(numericValue);
                setErrorText("");
                setStatus("");
              } else {
                setStatus("error");
                setErrorText("Chỉ được nhập tối đa 6 chữ số.");
              }

              if (value !== numericValue) {
                setStatus("error");
                setErrorText("Chỉ được nhập số.");
              }
            }}
            placeholder="Nhập số điểm"
            label="Nhập số điểm muốn đổi"
            helperText="1 điểm = 1.000 VNĐ"
            errorText={errorText}
            status={status}
          />

          <Box
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "30px",
            }}
          >
            <Button
              onClick={() => {
                const normalizedGoldAmount = goldAmount.replace(/^0+/, "");

                if (
                  !normalizedGoldAmount ||
                  parseInt(normalizedGoldAmount) <= 0
                ) {
                  setErrorText("Số điểm phải lớn hơn 0.");
                  setStatus("error");
                  return;
                }

                setGoldAmount(normalizedGoldAmount);
                handleGoldAmountInput();
              }}
            >
              Xác nhận
            </Button>
          </Box>
        </Box>
      </Modal>

      {/* Confirm Modal */}
      <Modal
        visible={isConfirmModalOpen}
        title="Xác nhận"
        onClose={() => setIsConfirmModalOpen(false)}
      >
        <Box
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "20px",
          }}
        >
          <Text size="large">Bạn có xác nhận muốn đổi {goldAmount} điểm ?</Text>
          <Box style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
            <Button
              style={{
                marginTop: "10px",
                backgroundColor: "red",
                color: "white",
              }}
              onClick={() => {
                setIsConfirmModalOpen(false); // Close Confirm modal
                setIsInputModalOpen(true); // Reopen Input modal
              }}
            >
              Hủy
            </Button>
            <Button style={{ marginTop: "10px" }} onClick={handleWithdraw}>
              Đồng ý
            </Button>
          </Box>
        </Box>
      </Modal>

      {/* Result Modal */}
      <Modal
        visible={resultModal.open}
        title="Thông báo"
        onClose={handleModalClose}
      >
        <Box>
          <Text size="large" style={{ textAlign: "center" }}>
            {resultModal.message}
          </Text>
        </Box>
      </Modal>
    </Page>
  );
};

export default ConsultantPage;
