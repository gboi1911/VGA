import React, { useState, useCallback, useEffect } from "react";
import { Page, Text, Box, Modal, Button, Header } from "zmp-ui";
import { useNavigate } from "react-router-dom";
import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates";
import { getTestType } from "api/test";

const MBTITest = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [testType, setTestType] = useState("mbti");
  const [testTypeData, setTestTypeData] = useState({});
  const navigate = useNavigate();

  const handleStartTest = useCallback((type) => {
    setTestType(type);
    setIsModalVisible(true);
    console.log("Test Started", type);
  }, []);

  useEffect(() => {
    const fetchTestTypeData = async () => {
      const id = "a5b0a3e1-ca71-493d-9e0d-fb8b0f7e8e84";
      try {
        const response = await getTestType(id);
        setTestTypeData(response.data);
      } catch (error) {
        console.error("Error in fetching test type data:", error);
      }
    };

    fetchTestTypeData();
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
    <Page
      style={{
        display: "flex",
        justifyContent: "center",
        marginTop: "60px",
        marginBottom: "40px",
      }}
    >
      <Header title="MBTI" />
      <Box style={{ width: "70%" }}>
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
            Thực hiện bài kiểm tra này sẽ tốn {testTypeData.point} gold. Bạn đã
            sẵn sàng ?
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
