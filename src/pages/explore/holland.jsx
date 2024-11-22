import React, { useState, useCallback, useEffect } from "react";
import { Page, Text, Box, Modal, Button, Header } from "zmp-ui";
import { useNavigate } from "react-router-dom";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import { getTestType } from "api/test";
import { getStudentInfo } from "api/userInfo";

const HollandTest = ({ studentId }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [testType, setTestType] = useState("mbti");
  const [testTypeData, setTestTypeData] = useState({});
  const [userInfo, setUserInfo] = useState(null);
  const [isBalanceModalVisible, setIsBalanceModalVisible] = useState(false);
  const navigate = useNavigate();

  const handleStartTest = useCallback((type) => {
    setTestType(type);
    setIsModalVisible(true);
    console.log("Test Started", type);
  }, []);

  useEffect(() => {
    const fetchTestTypeData = async () => {
      const id = "b3d9e9d7-6e2a-4d5b-9b35-4f28f9b0a0e8";
      try {
        const response = await getTestType(id);
        setTestTypeData(response.data);
      } catch (error) {
        console.error("Error in fetching test type data:", error);
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

    fetchTestTypeData();
    fetchUserInfo();
  }, []);

  const handleYes = useCallback(() => {
    setIsModalVisible(false);

    if (userInfo && testTypeData) {
      // Safely access nested properties
      const goldBalance = userInfo?.account?.wallet?.goldBalance || 0;
      console.log("Gold Balance:", goldBalance);

      const requiredGold = testTypeData?.point || 0;
      console.log("Required Gold:", requiredGold);

      if (goldBalance >= requiredGold) {
        // User has enough gold, proceed to the test page
        console.log("Sufficient balance. Starting test:", testType);
        if (testType === "mbti") {
          navigate("/testExecute");
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
  }, [testType, navigate, userInfo, testTypeData]);

  const handleNo = useCallback(() => {
    setIsModalVisible(false);
    console.log("User clicked No");
  }, []);
  return (
    <Page
      style={{
        display: "flex",
        justifyContent: "center",
        marginTop: "150px",
        marginBottom: "40px",
      }}
    >
      <Header title="Holland" />
      <Box style={{ width: "70%" }}>
        {/* <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ44FPSOf4JQ1EvVqK43LjHXnd9pOrZJlnmj8qC7_NZnebwkSkQPICqZY-dRdXKbxXLfs4&usqp=CAU"
          alt="image"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
          role="presentation"
        /> */}
        <LightbulbIcon
          style={{
            width: "100%",
            height: "200px",
            objectFit: "cover",
            borderRadius: "8px",
            color: "#0066CC",
          }}
        />
        <div className="p-4">
          <Text
            bold
            className=""
            size="xLarge"
            style={{ textAlign: "center", fontSize: "26px" }}
          >
            Bài kiểm tra Holland
          </Text>
          <Text
            className="text-gray-600 mt-4 mb-6"
            style={{ textAlign: "center" }}
          >
            Lý thuyết lựa chọn nghề nghiệp Holland xuất hiện lần đầu tiên vào
            năm 1959. Đây là công trình của Tiến sỹ Tâm lý người Mỹ John L.
            Holland (1919-2008). Theo lý thuyết, được chọn công việc hoặc môi
            trường có chương trình giáo dục phù hợp, hoặc tương đồng với sở
            thích và tính cách của bạn, rất có thể giúp bạn cảm thấy hài lòng
            trong công việc và thành công trong sự nghiệp.
          </Text>

          <Button
            fullWidth
            onClick={() => handleStartTest("holland")}
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
            gold.
          </Text>
          <div className="flex justify-end mt-4">
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
  );
};

export default HollandTest;

// Việc này có nghĩa là
//             nếu bạn có thể làm việc mình thích, và còn được làm việc với những
//             người cùng chí hướng, thì đó là môi trường lý tưởng để bạn trau dồi
//             đam mê và phát triển tài năng của bạn. Trắc nghiệm Holland có thể
//             giúp bạn không chỉ chú ý hơn đến các đặc điểm tính cách và môi
//             trường làm việc tương ứng mà còn có thể liệt kê một loạt các nghề
//             nghiệp mà trước đây bạn có thể chưa nghĩ đến. Hơn nữa, trắc nghiệm
//             này cũng có thể giúp bạn xác định một số đặc điểm phẩm chất còn tiềm
//             ẩn mà bạn chưa khám phá ra. Lý thuyết lựa chọn nghề nghiệp Holland
//             chia con người ra 6 loại tính cách-viết tắt là RIASEC, tương ứng với
//             6 loại ngành nghề phù hợp.
