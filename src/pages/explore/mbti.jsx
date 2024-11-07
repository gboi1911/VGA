import React, { useState, useCallback } from "react";
import { Page, Text, Box, Modal, Button } from "zmp-ui";
import { useNavigate } from "react-router-dom";

const MBTITest = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [testType, setTestType] = useState("mbti");
  const navigate = useNavigate();

  const handleStartTest = useCallback((type) => {
    setTestType(type);
    setIsModalVisible(true);
    console.log("Test Started", type);
  }, []);

  const handleYes = useCallback(() => {
    setIsModalVisible(false);
    console.log("User clicked Yes for", testType);
    if (testType === "mbti") {
      navigate("/testExecute");
    } else if (testType === "holland") {
      navigate("/testExecuteHolland");
    }
  }, [testType, navigate]);

  const handleNo = useCallback(() => {
    setIsModalVisible(false);
    console.log("User clicked No");
  }, []);
  return (
    <Page>
      <Box className="bg-white rounded-lg shadow-md overflow-hidden">
        <img
          src="https://freequizgames.com/wp-content/uploads/2022/09/mbti-test-1024x581.jpg"
          alt="image"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
          role="presentation"
        />
        <div className="p-4">
          <Text bold className="" size="xLarge">
            Bài kiểm tra MBTI
          </Text>
          <Text className="text-gray-600 mt-2 mb-3">
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
            Thực hiện bài kiểm tra này sẽ tốn 20 gold. Bạn đã sẵn sàng ?
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
    </Page>
  );
};

export default MBTITest;
