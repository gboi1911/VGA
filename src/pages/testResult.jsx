import React from "react";
import { Page, Text, Box, Button } from "zmp-ui";
import { useNavigate } from "react-router-dom";

const TestResult = () => {
    const navigate = useNavigate(); 
    const handleBack = () => {
        navigate("/test");
    };
    return(
        <Page className="page bg-theme-image2">
            <Box className="bg-white rounded-lg shadow-md overflow-hidden">
                <img
                src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/94d7e5fc-1f42-48bc-9e12-0c81b9bd40c8/dfwfe8g-63f3ffeb-463d-43c4-bab5-e7a1f21fd5a5.png/v1/fill/w_848,h_942,q_70,strp/i_n_f_j_by_lireii_dfwfe8g-pre.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTQyMiIsInBhdGgiOiJcL2ZcLzk0ZDdlNWZjLTFmNDItNDhiYy05ZTEyLTBjODFiOWJkNDBjOFwvZGZ3ZmU4Zy02M2YzZmZlYi00NjNkLTQzYzQtYmFiNS1lN2ExZjIxZmQ1YTUucG5nIiwid2lkdGgiOiI8PTEyODAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.ZpJ_z7J6rX-hp8oule9AMbJNvfLFQ8ER47oE-fIBBho" 
                alt='image'          
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                role='presentation'/>
                <Text bold size="xLarge" style={{textAlign:"center", color:"green"}}>INFJ</Text>
                <Text style={{color:"#339966"}}>Điểm mạnh
Người mang tính cách INFJ có một số điểm mạnh đáng chú ý:

Sâu sắc và nhạy bén: INFJ có thể nhìn thấu bên trong vấn đề và nhìn nhận sự phức tạp của nó. Họ có khả năng cảm nhận, hiểu cảm xúc, nhu cầu và suy nghĩ của người khác, giúp tạo ra sự kết nối sâu sắc và ý thức đến những khía cạnh tâm lý của con người.

Trực giác mạnh mẽ: INFJ có khả năng nhìn xa trước và đọc hiểu những tình huống phức tạp mà người khác có thể không nhận thấy. Họ thường có trực giác tốt và khả năng đưa ra những quyết định thông minh dựa trên những hiểu biết ẩn trong bản thân.

Sự quan tâm và trợ giúp: INFJ thường là những người quan tâm đến người khác và có khả năng tạo ra môi trường thoải mái cho mọi người xung quanh. Họ thường sẵn lòng lắng nghe và giúp đỡ người khác, đồng thời có khả năng đưa ra lời khuyên và hỗ trợ để giải quyết các vấn đề.

Sự sáng tạo: INFJ thường có một trí tưởng tượng mạnh mẽ và tài năng sáng tạo. Họ có khả năng suy nghĩ ngoại biên và tìm kiếm giải pháp sáng tạo cho các vấn đề phức tạp. INFJ thường có óc tưởng tượng giàu sức mạnh và có thể tạo ra những ý tưởng độc đáo và đột phá.

Trung thành và đáng tin cậy: INFJ là những người rất trung thành với những nguyên tắc và giá trị cá nhân của mình. Họ cam kết với mối quan hệ và sẵn lòng đặt lợi ích của người khác lên hàng đầu.

Tuy nhiên, hãy nhớ rằng mỗi người mang tính cách INFJ là một cá nhân độc lập và có thể có những đặc điểm riêng biệt.

          

Điểm yếu
Mặc dù mỗi người mang tính cách INFJ là một cá nhân độc lập và có những đặc điểm riêng biệt, có một số điểm yếu phổ biến mà người INFJ có thể gặp phải:

Dễ bị áp lực: INFJ có xu hướng đặt nhiều áp lực lên bản thân, thường cảm thấy trách nhiệm với những nguyên tắc và mục tiêu mà họ đã đặt ra. Dẫn đến việc họ thường bị căng thẳng, lo lắng và căng thẳng tinh thần.

Quá nhạy cảm: INFJ có khả năng cảm nhận mạnh mẽ và có thể bị ảnh hưởng bởi cảm xúc của người khác. Vi thế, họ dễ bị quá tải cảm xúc và khó khăn trong việc lấy lợi ích của bản thân.

Dễ bị kiểm soát: Vì INFJ có xu hướng lo lắng về ý kiến, cảm xúc của người khác, họ có thể dễ dàng bị ảnh hưởng và kiểm soát bởi ý kiến mong đợi của người khác. Điều này có thể khiến họ khó khăn trong việc tự khẳng định và đáp ứng nhu cầu của bản thân.

Khó chấp nhận sự thay đổi: INFJ có xu hướng ưa thích sự ổn định và sự sắp xếp. Họ có thể cảm thấy bất an hoặc không thoải mái khi đối mặt với sự thay đổi lớn và khó khăn trong việc thích ứng với những tình huống mới.

Quá phụ thuộc vào người khác: INFJ có thể dễ dàng rơi vào mẫu mực quá phụ thuộc và đặt quá nhiều kỳ vọng vào người khác. Khiến họ cảm thấy thất vọng và cảm thấy không thể tự mình đáp ứng nhu cầu và mong đợi của mình.

Tuy nhiên, điểm yếu không phải là một định rõ có thể được vượt qua hoặc cải thiện thông qua việc nhận thức về chúng để phát triển kỹ năng và chiến lược thích hợp.</Text>
            </Box>
            <div className="flex justify-center items-center mt-6 mb-12">
            <Button 
            style={{                
                backgroundColor: "#FF9999", 
                borderRadius: "8px", 
                color: "#333333"
            }}
            onClick={handleBack}>
                Kết thúc 
            </Button>
            </div>
        </Page>
    );
};

export default TestResult;