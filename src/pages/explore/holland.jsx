import React, { useState, useCallback } from "react";
import { Page, Text, Box, Modal, Button } from "zmp-ui";
import { useNavigate } from "react-router-dom";

const HollandTest = () => {
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
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ44FPSOf4JQ1EvVqK43LjHXnd9pOrZJlnmj8qC7_NZnebwkSkQPICqZY-dRdXKbxXLfs4&usqp=CAU"
          alt="image"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
          role="presentation"
        />
        <div className="p-4">
          <Text bold className="" size="xLarge">
            Bài kiểm tra Holland
          </Text>
          <Text className="text-gray-600 mt-2 mb-3">
            Lý thuyết lựa chọn nghề nghiệp Holland xuất hiện lần đầu tiên vào
            năm 1959. Đây là công trình của Tiến sỹ Tâm lý người Mỹ John L.
            Holland (1919-2008). Theo lý thuyết, được chọn công việc hoặc môi
            trường có chương trình giáo dục phù hợp, hoặc tương đồng với sở
            thích và tính cách của bạn, rất có thể giúp bạn cảm thấy hài lòng
            trong công việc và thành công trong sự nghiệp. Việc này có nghĩa là
            nếu bạn có thể làm việc mình thích, và còn được làm việc với những
            người cùng chí hướng, thì đó là môi trường lý tưởng để bạn trau dồi
            đam mê và phát triển tài năng của bạn. Trắc nghiệm Holland có thể
            giúp bạn không chỉ chú ý hơn đến các đặc điểm tính cách và môi
            trường làm việc tương ứng mà còn có thể liệt kê một loạt các nghề
            nghiệp mà trước đây bạn có thể chưa nghĩ đến. Hơn nữa, trắc nghiệm
            này cũng có thể giúp bạn xác định một số đặc điểm phẩm chất còn tiềm
            ẩn mà bạn chưa khám phá ra. Lý thuyết lựa chọn nghề nghiệp Holland
            chia con người ra 6 loại tính cách-viết tắt là RIASEC, tương ứng với
            6 loại ngành nghề phù hợp.
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

export default HollandTest;
