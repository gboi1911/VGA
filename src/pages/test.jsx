// src/pages/TestPage.js
import React, { useState } from 'react';
import { Page, Box, Button, Text, Modal, Tabs } from 'zmp-ui';
import { useNavigate } from 'react-router-dom';

const TestPage = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigate = useNavigate();
  const handleStartTest = () => {
    setIsModalVisible(true);
    console.log('Test Started');
  };

  const handleYes = () => {
    setIsModalVisible(false);
    console.log('User clicked Yes');
    navigate('/testExecute');
  };

  const handleNo = () => {
    setIsModalVisible(false);
    console.log('User clicked No');
    // Add logic for No action here
  };

  return (
    <Page className="page bg-theme-image1">
      <Tabs>
        <Tabs.Tab key="mbti" label="MBTI">
          <Box className="bg-white rounded-lg shadow-md overflow-hidden">
          <img
          src="https://freequizgames.com/wp-content/uploads/2022/09/mbti-test-1024x581.jpg" 
          alt='image'          
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
          role='presentation'
          />
            <div className="p-4">
              <Text bold className="" size='xLarge'>Bài kiểm tra MBTI</Text>
              <Text className="text-gray-600 mt-2 mb-3">
              Bài kiểm tra tính cách Myers-Briggs Type Indicator (MBTI) là một công cụ đánh giá tâm lý, 
              dựa trên lý thuyết phân loại của Carl Gustav Jung, được phát triển bởi Isabel Briggs Myers và mẹ bà, Katharine Cook Briggs. 
              Bài kiểm tra này phân loại tính cách con người thành 16 nhóm.
              </Text>
              <Button
                fullWidth           
                onClick={handleStartTest}
              >
                Bắt đầu
              </Button>
            </div>
          </Box>
        </Tabs.Tab>
        <Tabs.Tab key="holland" label="Holland">
          <Box className="bg-white rounded-lg shadow-md overflow-hidden">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ44FPSOf4JQ1EvVqK43LjHXnd9pOrZJlnmj8qC7_NZnebwkSkQPICqZY-dRdXKbxXLfs4&usqp=CAU" 
            alt='image'          
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
            role='presentation'
          />
          <div className="p-4">
            <Text bold className="" size='xLarge'>Bài kiểm tra Holland</Text>
            <Text className="text-gray-600 mt-2 mb-3">
            Lý thuyết lựa chọn nghề nghiệp Holland xuất hiện lần đầu tiên vào năm 1959. Đây là công trình của Tiến sỹ Tâm lý người Mỹ John L. Holland (1919-2008). Theo lý thuyết, được chọn công việc hoặc môi trường có chương trình giáo dục phù hợp, hoặc tương đồng với sở thích và tính cách của bạn, rất có thể giúp bạn cảm thấy hài lòng trong công việc và thành công trong sự nghiệp. Việc này có nghĩa là nếu bạn có thể làm việc mình thích, và còn được làm việc với những người cùng chí hướng, thì đó là môi trường lý tưởng để bạn trau dồi đam mê và phát triển tài năng của bạn.
Trắc nghiệm Holland có thể giúp bạn không chỉ chú ý hơn đến các đặc điểm tính cách và môi trường làm việc tương ứng mà còn có thể liệt kê một loạt các nghề nghiệp mà trước đây bạn có thể chưa nghĩ đến. Hơn nữa, trắc nghiệm này cũng có thể giúp bạn xác định một số đặc điểm phẩm chất còn tiềm ẩn mà bạn chưa khám phá ra.
Lý thuyết lựa chọn nghề nghiệp Holland chia con người ra 6 loại tính cách-viết tắt là RIASEC, tương ứng với 6 loại ngành nghề phù hợp.
            </Text>
            <Button
              fullWidth           
              onClick={handleStartTest}
            >
              Bắt đầu
            </Button>
          </div>
          </Box>
        </Tabs.Tab>
      </Tabs>
      <Modal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        title="Thông báo"
      >
        <div className="p-4">
          <Text className="text-lg">Thực hiện bài kiểm tra này sẽ tốn 20 gold. Bạn đã sẵn sàng ?</Text>
          <div className="flex justify-end mt-4">
            <Button
              className="mr-2"
              type="primary"
              onClick={handleYes}
            >
              Yes
            </Button>
            <Button
              className="mr-2"
              type="danger"
              onClick={handleNo}
            >
              No
            </Button>
          </div>
        </div>
      </Modal>
    </Page>
  );
};

export default TestPage;
