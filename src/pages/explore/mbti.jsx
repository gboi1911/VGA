import React, { useState, useCallback, useEffect } from "react";
import { Page, Text, Box, Modal, Button, Header } from "zmp-ui";
import { useNavigate, useLocation } from "react-router-dom";
import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates";
// import { getTestType } from "api/test";
import { getStudentInfo } from "api/userInfo";

const MBTITest = ({ studentId }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [testType, setTestType] = useState("mbti");
  // const [testTypeData, setTestTypeData] = useState({});
  const [userInfo, setUserInfo] = useState(null);
  const [isBalanceModalVisible, setIsBalanceModalVisible] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { id, point } = location.state || {};

  const handleStartTest = useCallback((type) => {
    setTestType(type);
    setIsModalVisible(true);
    console.log("Test Started", type);
  }, []);

  useEffect(() => {
    // const fetchTestTypeData = async () => {
    //   const id = "a5b0a3e1-ca71-493d-9e0d-fb8b0f7e8e84";
    //   try {
    //     const response = await getTestType(id);
    //     setTestTypeData(response.data);
    //   } catch (error) {
    //     console.error("Error in fetching test type data:", error);
    //   }
    // };

    const fetchUserInfo = async () => {
      try {
        const data = await getStudentInfo(studentId);
        console.log("Fetched userInfo:", data); // Debug log
        setUserInfo(data?.data || {});
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };

    // fetchTestTypeData();
    fetchUserInfo();
  }, []);

  const handleYes = useCallback(() => {
    setIsModalVisible(false);

    if (userInfo) {
      // Safely access nested properties
      const goldBalance = userInfo?.account?.wallet?.goldBalance || 0;
      console.log("Gold Balance:", goldBalance);

      // const requiredGold = testTypeData?.point || 0;
      // console.log("Required Gold:", requiredGold);

      if (goldBalance >= point) {
        // User has enough gold, proceed to the test page
        console.log("Sufficient balance. Starting test:", testType);
        if (testType === "mbti") {
          navigate("/testExecute", { state: { id } });
        } else if (testType === "holland") {
          navigate("/testExecuteHolland");
        }
      } else {
        // Insufficient balance, display a modal
        console.log("Insufficient balance. Staying on current page.");
        setIsBalanceModalVisible(true);
      }
    } else {
      console.error("User info or test type data is not available.");
    }
  }, [testType, navigate, userInfo]);

  const handleNo = useCallback(() => {
    setIsModalVisible(false);
    console.log("User clicked No");
  }, []);
  return (
    <>
      <Box
        style={{
          position: "relative",
          height: "42px",
          backgroundColor: "#0369a1",
        }}
      ></Box>
      <Page>
        <Header title="MBTI" />
        <Box style={{ marginTop: 20 }}>
          {/* <img
          src="https://png.pngtree.com/element_our/20200702/ourmid/pngtree-cartoon-illustration-blue-light-bulb-image_2284830.jpg"
          alt="image"
          style={{
            width: "100%",
            height: "200px",
            objectFit: "cover",
            borderRadius: "8px",
          }}
          role="presentation"
        /> */}
          <TipsAndUpdatesIcon
            style={{
              width: "100%",
              height: "200px",
              objectFit: "cover",
              borderRadius: "8px",
              color: "#0066CC",
              marginLeft: "20px",
            }}
          />
          <div className="p-4">
            <Text bold style={{ textAlign: "center", fontSize: "26px" }}>
              Bài kiểm tra MBTI
            </Text>
            <Text
              className="text-gray-600 mt-4 mb-6"
              style={{ textAlign: "center" }}
            >
              Bài kiểm tra tính cách Myers-Briggs Type Indicator (MBTI) là một
              công cụ đánh giá tâm lý, dựa trên lý thuyết phân loại của Carl
              Gustav Jung, được phát triển bởi Isabel Briggs Myers và mẹ bà,
              Katharine Cook Briggs. Bài kiểm tra này phân loại tính cách con
              người thành 16 nhóm.
            </Text>
            <Button
              fullWidth
              onClick={() => handleStartTest("mbti")}
              style={{
                backgroundColor: "#0066CC",
              }}
            >
              Bắt đầu
            </Button>
          </div>
        </Box>
        <Modal
          visible={isModalVisible}
          onClose={() => setIsModalVisible(false)}
          title="Thông báo"
        >
          <div className="p-4">
            <Text
              className="text-lg"
              style={{
                textAlign: "center",
              }}
            >
              Thực hiện bài kiểm tra này sẽ tốn {point} điểm. Bạn đã sẵn sàng ?
            </Text>
            <div className="flex justify-end mt-4" style={{ gap: "10px" }}>
              <Button className="mr-2" type="danger" onClick={handleNo}>
                Hủy
              </Button>
              <Button
                className="mr-2"
                type="primary"
                onClick={handleYes}
                style={{
                  backgroundColor: "#0066CC",
                }}
              >
                Đồng ý
              </Button>
            </div>
          </div>
        </Modal>
        <Modal
          visible={isBalanceModalVisible}
          onClose={() => setIsBalanceModalVisible(false)}
          title="Thông báo"
        >
          <div className="p-4">
            <Text
              className="text-lg"
              style={{
                textAlign: "center",
              }}
            >
              Số dư không đủ để thực hiện bài kiểm tra này. Vui lòng nạp thêm
              điểm.
            </Text>
            <div className="flex justify-end mt-4" style={{ gap: "10px" }}>
              <Button
                className="mr-2"
                type="primary"
                onClick={() => navigate("/user")}
                style={{
                  backgroundColor: "#f26d0f",
                }}
              >
                Nạp ngay
              </Button>
              <Button
                className="mr-2"
                type="primary"
                onClick={() => setIsBalanceModalVisible(false)}
                style={{
                  backgroundColor: "#0066CC",
                }}
              >
                Đóng
              </Button>
            </div>
          </div>
        </Modal>
      </Page>
    </>
  );
};

export default MBTITest;
