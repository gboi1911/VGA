import React, { useState, useEffect, useCallback } from "react";
import { Page, Text, Box, Modal, Button, Header } from "zmp-ui";
import { useNavigate } from "react-router-dom";
import { getTestList } from "api/test";
import { getStudentInfo } from "api/userInfo";

const Holland = ({ studentId }) => {
  const [testList, setTestList] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [testType, setTestType] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [point, setPoint] = useState(0);
  const [isBalanceModalVisible, setIsBalanceModalVisible] = useState(false);
  const [selectedTestId, setSelectedTestId] = useState(null);
  const testTypeId = "b3d9e9d7-6e2a-4d5b-9b35-4f28f9b0a0e8";
  const navigate = useNavigate();
  useEffect(() => {
    const fetchTestList = async () => {
      try {
        const response = await getTestList();
        const questions = response.data.questions;
        const filteredTests = questions.filter(
          (test) => test.testTypeId === testTypeId
        );
        console.log("Filtered Tests:", filteredTests);

        setTestList(
          filteredTests.map((test) => ({
            ...test,
            point: test.point || 0, // Ensure point is set, fallback to 0 if undefined
          }))
        );
      } catch (error) {
        console.error("Error in get test list:", error.message);
      }
    };

    const fetchUserInfo = async () => {
      try {
        const data = await getStudentInfo(studentId);
        console.log("Fetched userInfo:", data); // Debug log
        setUserInfo(data?.data || {});
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };

    fetchUserInfo();
    fetchTestList();
  }, []);

  useEffect(() => {
    if (selectedTestId) {
      console.log("Updated Selected Test ID:", selectedTestId);
    }
  }, [selectedTestId]);

  const handleStart = useCallback(
    (type, testId) => {
      const selectedTest = testList.find((test) => test.id === testId);
      if (selectedTest) {
        setPoint(selectedTest.point); // Set the point for the selected test
      }
      setTestType(type);
      setSelectedTestId(testId);
      setIsModalVisible(true);
      console.log("Test Started", type);
      console.log("Test ID:", testId); // Log the passed test ID
    },
    [testList]
  );

  const handleYes = useCallback(() => {
    if (!selectedTestId) {
      console.error("No test ID selected!");
      console.log(selectedTestId);
      return;
    }
    if (selectedTestId) {
      console.log(selectedTestId);
    }
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
          navigate("/testExecute");
        } else if (testType === "holland") {
          navigate("/testExecuteHolland", { state: { id: selectedTestId } });
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
      <Page className="page">
        <Header title="Holland" />
        <Box>
          {" "}
          {testList.map((test) => (
            <Box
              key={test.id}
              style={{
                border: "1px solid #ddd",
                borderRadius: "8px",
                padding: "16px",
                marginBottom: "16px",
                backgroundColor: "white",
              }}
            >
              {" "}
              <img
                src="https://letstalkscience.ca/sites/default/files/2020-10/Holland_hexagon_0.png"
                alt={test.name}
                style={{ width: "100%", borderRadius: "8px" }}
              />{" "}
              <Text
                bold
                style={{
                  textAlign: "center",
                  fontSize: "26px",
                  marginTop: "20px",
                }}
              >
                {test.name}
              </Text>
              <Text
                className="text-gray-600 mt-4 mb-6"
                style={{ textAlign: "center" }}
              >
                {test.description}
              </Text>{" "}
              <Button
                fullWidth
                style={{
                  backgroundColor: "#0066CC",
                }}
                onClick={() => handleStart("holland", test.id)} // Pass function reference here
              >
                Bắt đầu
              </Button>
            </Box>
          ))}{" "}
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

export default Holland;
