import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Page, Box, Text, Button, Progress, Icon } from "zmp-ui";

const careerGroupData = {
  artistic: {
    name: "Người sáng tạo(A)",
    image: "https://rightpath.edu.vn/images/Audiobook-pana.png",
    characterist: [
      {
        content:
          "Người sáng tạo chủ yếu quan tâm đến những công việc liên quan đến “sự sáng tạo, độc đáo và thể hiện nghệ thuật”. Bạn thường là người giàu trí tưởng tượng, trực quan, và thích tạo ra thứ gì đó sáng tạo và độc đáo. Bạn có thể thích các hoạt động như vẽ, viết sáng tạo hoặc chơi một nhạc cụ. Dù không phải là nghệ sĩ nhưng bạn có thể sẽ thích được trải nghiệm nghệ thuật, âm nhạc hoặc kịch.",
        id: 1,
      },
      {
        content:
          "Người sáng tạo nổi loạn chống lại 'cấu trúc và quy tắc', và không thích các nhiệm vụ liên quan đến con người hoặc kỹ năng thể chất. Do đó, bạn thích làm việc trong một môi trường không bị gò bó, nơi mà bạn có thể tạo ra thứ gì đó độc đáo và mang bản sắc của riêng mình.",
        id: 2,
      },
    ],
    majors: [
      "Marketing",
      "Truyền thông đa phương tiện",
      "Thiết kế thời trang",
      "Kiến trúc",
      "Nhiếp ảnh",
      "Biên kịch điện ảnh, truyền hình",
      "Diễn viên kịch, điện ảnh",
      "Biên đạo múa",
      "Thiết kế đồ họa",
      "Thiết kế mỹ thuật, sân khấu, điện ảnh",
    ],
    careers: [
      "Chuyên viên Marketing",
      "Chuyên viên Thiết kế đồ họa",
      "Chuyên viên Thiết kế quảng cáo",
      "Nhạc sĩ / Ca sĩ / Nhà văn",
      "Kiến trúc sư",
      "Nhiếp ảnh gia",
      "Giám đốc âm nhạc",
      "Nhà tạo mẫu thời trang - Fashion stylist",
      "Thiết kế thời trang",
    ],
    improvements: [
      {
        content:
          "Bạn có thể thích các nghề nghiệp trong các trong các lĩnh vực nghệ thuật, thiết kế, biểu diễn, âm nhạc, viết lách và ngôn ngữ.",
        title: "NGHỀ NGHIỆP YÊU THÍCH",
        id: 1,
      },
      {
        content:
          "Bạn có thể cảm thấy chán khi làm những công việc đơn điệu, lặp đi lặp lại mỗi ngày như hành chính văn phòng. Bạn có thể bị stress khi phải làm những công việc yêu cầu tính toán, thiếu sự sáng tạo, ít thể hiện cảm xúc như các nghề trong lĩnh vực kế toán, kinh doanh, kỹ thuật, quản lý…",
        title: "NGHỀ NGHIỆP NÊN CÂN NHẮC",
        id: 2,
      },
      {
        content:
          "Anh văn, Xã hội, Âm nhạc, Kịch, Nghệ thuật, Thiết kế đồ họa, Tin học, Kinh doanh học, Văn học",
        title: "CÁC MÔN HỌC PHÁT HUY TÀI NĂNG",
        id: 3,
      },
      {
        content:
          "Tư duy phản biện, Nhận biết và kiểm soát cảm xúc, Kỹ năng đối mặt với áp lực, Kỹ năng tự phục hồi, Kỹ năng tạo động lực cho bản thân, Kỹ năng giao tiếp, Kỹ năng tiếp thu và phản hồi thông tin, Kỹ năng làm việc nhóm, Kỹ năng tạo dựng mối quan hệ, Kỹ năng quản lý thời gian, Kỹ năng quản lý dự án, Kỹ năng sắp xếp công việc hiệu quả, Kỹ năng giải quyết vấn đề",
        title: "KHÓA HỌC GIÚP BẠN TRAU DỒI",
        id: 4,
      },
    ],
  },
  social: {
    name: "Người giúp đỡ(S)",
    image: "https://rightpath.edu.vn/images/Group-bro.png",
    characterist: [
      {
        content:
          "Người giúp đỡ là người có mối quan tâm xã hội và chủ yếu quan tâm đến những công việc giúp đỡ hoặc phục vụ người khác. Những người giúp đỡ thường là những người có lòng nhân ái, biết quan tâm.",
        id: 1,
      },
      {
        content:
          "Nếu bạn là Người giúp đỡ, bạn có thể sẽ thích làm việc chặt chẽ với những người khác theo cách cho phép bạn tạo ra tác động tích cực đến cuộc sống của họ. Bạn có thể thích giảng dạy, tư vấn và chăm sóc người khác. Chọn công việc cho phép bạn sống đúng với giá trị cá nhân của mình là điều rất quan trọng đối với bạn. Bạn thường không thích làm việc một mình. Bạn rất coi trọng các mối quan hệ của mình và muốn làm việc trong sự hợp tác và hòa hợp với những người khác.",
        id: 2,
      },
    ],
    majors: [
      "Quản lý Thể dục thể thao",
      "Báo chí",
      "Quản trị văn phòng",
      "Triết học",
      "Xã hội học",
      "Quản trị dịch vụ du lịch và lữ hành",
      "Quan hệ công chúng",
      "Lịch sử",
      "Sư phạm",
      "Ngoại giao",
    ],
    careers: [
      "Chuyên viên Tổ chức sự kiện",
      "Huấn luyện viên thể thao",
      "Chuyên viên quan hệ đối ngoại",
      "Chuyên viên quan hệ khách hàng",
      "Chuyên gia chiến lược PR",
      "Nhà báo",
      "Điều dưỡng",
      "Nhân viên Công tác xã hội",
      "Quản lý nhân sự",
      "Luật sư",
      "MC",
      "Bác sĩ",
      "Nhân viên hành chính",
    ],
    improvements: [
      {
        content:
          "Bạn có thể thích các nghề nghiệp trong lĩnh vực chăm sóc sức khỏe, dịch vụ xã hội, tư vấn, nhân sự và chăm sóc cá nhân.",
        title: "NGHỀ NGHIỆP YÊU THÍCH",
        id: 1,
      },
      {
        content:
          "Người giúp đỡ thích những công việc có tính kết nối xã hội và giúp đỡ được nhiều người. Những nghề nghiệp làm việc độc lập hoặc dựa trên dữ liệu như Tài xế xe tải, Thợ mộc, Lập trình viên máy tính... có thể làm cho bạn cảm thấy buồn chán.",
        title: "NGHỀ NGHIỆP NÊN CÂN NHẮC",
        id: 2,
      },
      {
        content:
          "Tiếng Anh, Xã hội học, Toán, Khoa học, Giáo dục thể chất, Nghệ thuật, Máy tính, Kinh doanh, Ngôn ngữ",
        title: "CÁC MÔN HỌC PHÁT HUY TÀI NĂNG",
        id: 3,
      },
      {
        content:
          "Tư duy phân tích, Kỹ năng đối mặt với áp lực, Kỹ năng làm việc độc lập, Kỹ năng quản lý thời gian, Kỹ năng công nghệ, Kỹ năng thu thập và xử lý thông tin, Kỹ năng quản lý dự án, Kỹ năng giải quyết vấn đề, Kỹ năng thiết lập mục tiêu và ra quyết định, Kỹ năng Tư duy tập trung vào kết quả",
        title: "KHÓA HỌC GIÚP BẠN TRAU DỒI",
        id: 4,
      },
    ],
  },
  investigate: {
    name: "Người tư duy(I)",
    image: "https://rightpath.edu.vn/images/Woman%20reading-bro.png",
    characterist: [
      {
        content:
          "Người Tư duy thường là những người trí thức, ham học hỏi, thích tìm kiếm dữ kiện và nghiên cứu. Bạn cũng bị thu hút để làm việc với 'dữ liệu' hơn làm việc với 'con người'.",
        id: 1,
      },
      {
        content:
          "Nếu bạn là một Người tư duy, bạn có thể sẽ thích làm việc với các ý tưởng và lý thuyết. Bạn sẽ thích tìm tòi thông tin, tích lũy các kiến thức để có thể hiểu biết nhiều hơn về các vấn đề. Bạn có thể sẽ quan tâm đến khoa học và công nghệ.",
        id: 2,
      },
    ],
    majors: [
      "Công nghệ thông tin",
      "Truyền thông đa phương tiện",
      "Y khoa",
      "Kỹ thuật hàng không",
      "Luật",
      "Điện - điện tử",
      "Tâm lý học",
      "Quân đội",
      "Nghiệp vụ an ninh",
      "Giao thông vận tải",
      "Kỹ thuật công nghiệp",
    ],
    careers: [
      "Lập trình viên phần mềm",
      "Chuyên viên kiểm thử phần mềm",
      "Chuyên viên quản trị mạng",
      "Kỹ sư AI nghiên cứu trí tuệ nhân tạo",
      "Chuyên viên phát triển ứng dụng",
      "Kỹ thuật viên Thiết kế đồ họa",
      "Nhà kinh tế học",
      "Chuyên gia phân tích tài chính",
      "Kế toán - Kiểm toán",
      "Kỹ sư xây dựng",
      "Kiến trúc sư",
      "Kỹ sư hàng không",
      "Kỹ sư dầu khí",
      "Kỹ sư công nghiệp",
      "Nhà Sinh vật học/Hóa học/Vật lý/Toán học/Thiên văn học",
      "Giáo sư đại học",
      "Luật sư",
      "Bác sĩ",
    ],
    improvements: [
      {
        content:
          "Bạn có thể thích các nghề nghiệp trong lĩnh vực khoa học, công nghệ, kỹ thuật, toán học, nghiên cứu, học thuật và y học.",
        title: "NGHỀ NGHIỆP YÊU THÍCH",
        id: 1,
      },
      {
        content:
          "Người tư duy không hợp các công việc phức tạp, không có dữ liệu hướng dẫn và hay phải giải quyết vấn đề, bạn nên cân nhắc các công việc như Đại lý kinh doanh, Đại lý bảo hiểm...",
        title: "NGHỀ NGHIỆP NÊN CÂN NHẮC",
        id: 2,
      },
      {
        content: "Anh văn, Toán, Khoa học, Kỹ thuật, Công nghệ thông tin",
        title: "CÁC MÔN HỌC PHÁT HUY TÀI NĂNG",
        id: 3,
      },
      {
        content:
          "Nhận biết và kiểm soát cảm xúc, Khả năng thấu cảm, Kỹ năng làm việc nhóm, Kỹ năng hợp tác, Kỹ năng giao tiếp, Kỹ năng ra quyết định, Kỹ năng đàm phán và thuyết phục, Kỹ năng quản lý, Kỹ năng giải quyết vấn đề, Kỹ năng quản trị rủi ro, Kỹ năng lập kế hoạch và tổ chức công việc, Kỹ năng phân công và ủy thác công việc, Kỹ năng tạo dựng mối quan hệ",
        title: "KHÓA HỌC GIÚP BẠN TRAU DỒI",
        id: 4,
      },
    ],
  },
  enterprising: {
    name: "Người thuyết phục(E)",
    image: "https://rightpath.edu.vn/images/Coding%20workshop-pana.png",
    characterist: [
      {
        content:
          "Người thuyết phục là một người năng nổ, có tố chất lãnh đạo, mạnh mẽ, và luôn biết cách tự tạo động lực trong công việc. Nếu bạn là một Người thuyết phục, bạn có thể sẽ thích làm việc ở những vị trí có quyền lực và tầm ảnh hưởng. Bạn có tài ăn nói và có thể vận dụng kỹ năng này để lãnh đạo hoặc thuyết phục người khác. Hầu hết những người thuyết phục đều thích công việc có 1 ít mạo hiểm nhất định. Do đó những công việc có 1 chút thử thách có thể khiến cho bạn cảm thấy hứng thú.",
        id: 1,
      },
      {
        content:
          "Người thuyết phục là người thích làm việc với 'con người và dữ liệu'. Bạn không thích chỉ làm việc một mình với các dữ liệu, dự án mà bạn thích hợp tác với những người khác để hoàn thành các dự án và đạt được các mục tiêu của tổ chức.",
        id: 2,
      },
    ],
    majors: [
      "Quản trị Kinh doanh",
      "Kinh doanh quốc tế",
      "Bất động sản",
      "Kinh tế tài chính",
      "Tài chính - Ngân hàng",
      "Quản trị nguồn nhân lực",
      "Kinh doanh thương mại",
      "Quản trị dịch vụ du lịch và lữ hành",
      "Logistics và Quản lý chuỗi cung ứng",
      "Kế toán",
      "Ngoại thương",
    ],
    careers: [
      "Giám đốc đào tạo kinh doanh",
      "Quản lý Công nghệ thông tin",
      "Chuyên viên lập trình máy tính",
      "Đại lý Bất động sản",
      "Trưởng phòng hành chính",
      "Giám đốc tài chính",
      "Giám đốc quan hệ công chúng",
      "Giám đốc sản xuất công nghiệp",
      "Trưởng phòng nhân sự",
      "Kế toán trưởng",
      "Kiểm soát viên không lưu",
      "Diễn giả",
      "Giáo viên",
    ],
    improvements: [
      {
        content:
          "Bạn có thể thích các công việc có liên quan đến kinh doanh, quản lý, chính trị, luật hoặc lãnh đạo. Bạn có đủ khả năng lập kế hoạch phát triển bản thân để có thể thăng tiến lên các vị trí quản lý.",
        title: "NGHỀ NGHIỆP YÊU THÍCH",
        id: 1,
      },
      {
        content:
          "Vốn hòa đồng và thích làm việc với nhiều người khác nhau, bạn có khả năng gặp khó khăn trong những nghề nghiệp đòi hỏi ít giao tiếp xã hội hoặc cơ hội để ảnh hưởng đến người khác. Do đó, các nghề như nhà khoa học, lập trình viên máy tính, thủ thư hoặc kỹ sư mạng có thể làm nản lòng bạn.",
        title: "NGHỀ NGHIỆP NÊN CÂN NHẮC",
        id: 2,
      },
      {
        content:
          "Anh văn, Toán, Kinh tế, Kế toán, Kinh doanh, Xã hội học, Tin học, Ngôn ngữ",
        title: "CÁC MÔN HỌC PHÁT HUY TÀI NĂNG",
        id: 3,
      },
      {
        content:
          "Nhận biết và kiểm soát cảm xúc, Khả năng thấu cảm, Kỹ năng đối mặt với áp lực, Kỹ năng công nghệ, Kỹ năng quản lý dự án, Kỹ năng Tư duy tập trung vào kết quả, Kỹ năng phân công và ủy thác công việc, Kỹ năng Quản trị hiệu suất làm việc, Kỹ năng tiếp thu và phản hồi thông tin hiệu quả",
        title: "KHÓA HỌC GIÚP BẠN TRAU DỒI",
        id: 4,
      },
    ],
  },
  conventional: {
    name: "Người tổ chức(C)",
    image: "https://rightpath.edu.vn/images/Business%20analytics-bro.png",
    characterist: [
      {
        content:
          "Người tổ chức có tính tự chủ cao và sẽ làm việc một cách có tổ chức và bài bản để hoàn thành mọi việc đúng thời hạn. Bạn có thể thích làm việc với các con số, dữ liệu và các tệp hồ sơ.",
        id: 1,
      },
      {
        content:
          "Bạn coi trọng độ chính xác và rõ ràng trong công việc, và thích tuân theo các quy tắc. Bạn có thể có sở thích và có khả năng làm việc trong môi trường yêu cầu làm việc với nhiều người, nhiều công việc, và đòi hỏi có tính nghiệp vụ như công việc hành chính, văn phòng.",
        id: 2,
      },
    ],
    majors: [
      "Quản trị Kinh doanh",
      "Kinh doanh quốc tế",
      "Bất động sản",
      "Kinh tế tài chính",
      "Marketing",
      "Công nghệ thông tin",
      "Hàng không",
      "Kỹ thuật cơ khí",
      "Logistics và Quản lý chuỗi cung ứng",
      "Kế toán",
      "Xây dựng",
      "Kỹ thuật dầu khí",
      "Kiến trúc",
      "Sư phạm",
    ],
    careers: [
      "Quản lý Marketing",
      "Đại lý bất động sản",
      "Lập trình viên máy tính",
      "Chuyên gia kiểm thử phần mềm",
      "Nhân viên hỗ trợ IT",
      "Kiến trúc sư phần mềm",
      "Giám đốc Logistics",
      "Chuyên gia phân tích tài chính",
      "Giao dịch viên ngân hàng",
      "Nhân viên thẩm định bảo hiểm",
      "Kế toán, Kiểm toán",
      "Thư ký",
      "Quản lý trưng bày triển lãm",
      "Phi công",
      "Tiếp viên Hàng không",
      "Giám đốc điều hành COO",
      "Kỹ sư Môi trường",
    ],
    improvements: [
      {
        content:
          "Người tổ chức thường chọn các ngành nghề kinh doanh, quản trị, kế toán, công nghệ thông tin và quản lý văn phòng.",
        title: "NGHỀ NGHIỆP YÊU THÍCH",
        id: 1,
      },
      {
        content:
          "Bạn có thể gặp khó khăn với các nghề nghiệp quá nhàn hạ, có nhiều thay đổi đột xuất hoặc phát sinh các yếu tố bất ngờ như nghệ sĩ, dancer, nhà sản xuất truyền thông…Tương tự, những công việc có nhiều tình huống không thể đoán trước như lính cứu hỏa hoặc nhân viên y tế có thể gây căng thẳng cho bạn.",
        title: "NGHỀ NGHIỆP NÊN CÂN NHẮC",
        id: 2,
      },
      {
        content:
          "Anh văn, Toán, Kinh tế, Kế toán, Kinh doanh, Tin học, Ngôn ngữ, Quản trị hệ thống thông tin",
        title: "CÁC MÔN HỌC PHÁT HUY TÀI NĂNG",
        id: 3,
      },
      {
        content:
          "Tư duy linh hoạt, Năng lực sáng tạo và đổi mới, Kỹ năng quản lý thời gian, Kỹ năng xử lý tình huống, Kỹ năng sắp xếp công việc hiệu quả, Kỹ năng giải quyết vấn đề, Kỹ năng quản lý sự thay đổi, Kỹ năng quản trị rủi ro",
        title: "KHÓA HỌC GIÚP BẠN TRAU DỒI",
        id: 4,
      },
    ],
  },
  realistic: {
    name: "Người hành động(R)",
    image: "https://rightpath.edu.vn/images/Data%20extraction-rafiki.png",
    characterist: [
      {
        content:
          "Đa số Người hành động thường thích làm công việc với có tương tác với máy móc, đồ vật hơn là con người. Nếu bạn là mẫu Người hành động, bạn có thể sẽ thích các hoạt động ngoài trời, chơi thể thao, và công việc có liên quan đến cây cối hoặc động vật. Bạn cũng sẽ thích việc xây dựng hoặc chế tạo đồ thủ công và làm việc với các dụng cụ.",
        id: 1,
      },
      {
        content:
          "Thích làm hơn thích nói. Người hành động là mẫu người thực tế, có khuynh hướng hành động để đạt được kết quả cụ thể. Bạn có xu hướng tập trung vào 'các hoạt động đòi hỏi sự phối hợp vận động, kỹ năng và sức mạnh', và 'thích giải quyết vấn đề bằng cách làm điều gì đó, hơn là nói về nó hoặc ngồi và suy nghĩ về nó.'",
        id: 2,
      },
    ],
    majors: [
      "Quản lý Thể dục thể thao",
      "Công nghệ thông tin",
      "Truyền thông đa phương tiện",
      "Chế tạo Robot và cơ điện tử",
      "Sửa chữa cơ khí",
      "Cơ khí ô tô",
      "Kỹ thuật hàng không",
      "Xây dựng",
      "Logistics và Quản lý chuỗi cung ứng",
      "Thủy lợi",
      "Xây dựng",
      "Lâm nghiệp",
      "Khoa học môi trường",
      "Thú y",
      "Quân đội",
      "Nghiệp vụ an ninh",
      "Chế biến thực phẩm",
    ],
    careers: [
      "Quản lý thể dục thể thao",
      "Lập trình viên phần mềm",
      "Kỹ sư AI nghiên cứu trí tuệ nhân tạo",
      "Chuyên gia kiểm thử phần mềm",
      "Chuyên viên phân tích dữ liệu",
      "Chuyên viên kỹ xảo điện ảnh Visual Effects-VF",
      "Kỹ sư điện - điện tử",
      "Chuyên gia phân tích tài chính",
      "Kỹ sư cơ khí/ô tô",
      "Kỹ sư Vận hành nhà máy điện",
      "Kỹ sư hàng không",
      "Phi công",
      "Bác sỹ",
      "Phi công",
      "Huấn luyện viên thể thao",
      "Công an",
      "Lính cứu hỏa",
      "Chuyên gia chăn nuôi/trồng trọt",
      "Chuyên gia ẩm thực",
      "Nghệ nhân Thủ công mỹ nghệ",
      "Nhà hóa học",
    ],
    improvements: [
      {
        content:
          "Bạn có thể thích các công việc có liên quan đến Cơ khí, Máy móc, Sản xuất, Luật, Quân đội và Thể thao.",
        title: "NGHỀ NGHIỆP YÊU THÍCH",
        id: 1,
      },
      {
        content:
          "Những công việc như tư vấn hoặc giảng dạy có thể khiến cho bạn cảm thấy quá áp lực và khó chịu vì những công việc này đòi hỏi bạn phải tiếp xúc nhiều người và bộc lộ cảm xúc nhiều.",
        title: "NGHỀ NGHIỆP NÊN CÂN NHẮC",
        id: 2,
      },
      {
        content:
          "Anh văn, Toán, Khoa học, Kỹ thuật, Công nghệ Thông tin, Kinh doanh học, Tin học, Nông nghiệp, Lâm nghiệp, Giáo dục thể chất",
        title: "CÁC MÔN HỌC PHÁT HUY TÀI NĂNG",
        id: 3,
      },
      {
        content:
          "Nhận biết và kiểm soát cảm xúc, Khả năng thấu cảm, Kỹ năng lắng nghe tích cực, Kỹ năng giao tiếp, Kỹ năng đàm phán và thuyết phục, Kỹ năng phản hồi hiệu quả, Kỹ năng tạo dựng mối quan hệ, Tư duy sáng tạo, Tư duy linh hoạt, Kỹ năng làm việc nhóm, Kỹ năng thuyết trình, Kỹ năng quản lý, Kỹ năng giải quyết vấn đề, Kỹ năng điều phối",
        title: "KHÓA HỌC GIÚP BẠN TRAU DỒI",
        id: 4,
      },
    ],
  },
};

const groupMapping = {
  1: "realistic",
  2: "investigate",
  3: "artistic",
  4: "social",
  5: "enterprising",
  6: "conventional",
};

const TestResultHolland = () => {
  const location = useLocation();
  const { resultData } = location.state || {}; // Ensure resultData is properly destructured
  const percentData = resultData?.percent || [];
  const navigate = useNavigate();
  const [expandedGroupIndex, setExpandedGroupIndex] = useState(null);
  const displayedGroups = percentData.map((item) => groupMapping[item.group]);

  const handleBack = () => {
    navigate("/ratingMajor", {
      state: { resultData: resultData },
    });
  };

  const toggleExpand = (index) => {
    if (expandedGroupIndex === index) {
      setExpandedGroupIndex(null); // Collapse if clicked again
    } else {
      setExpandedGroupIndex(index); // Expand the selected section
    }
  };

  if (!resultData) {
    return (
      <Page
        className="page"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text size="large" style={{ color: "red", textAlign: "center" }}>
          Error: No result data available.
        </Text>
      </Page>
    );
  }

  return (
    <Page
      className="page"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      <Box
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          borderRadius: "15px",
          maxWidth: "350px",
          width: "100%",
          padding: "30px",
          boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
          textAlign: "center",
        }}
      >
        <img
          src="https://asiasociety.org/sites/default/files/styles/1200w/public/C/cte-career-planning-tools-980x650.png"
          alt="Result"
          style={{
            width: "100%",
            height: "300px",
            objectFit: "cover",
            borderRadius: "15px 15px 0 0",
          }}
        />
        <Text
          bold
          size="xLarge"
          style={{
            color: "#00697F",
            fontSize: "2em",
            marginTop: "20px",
          }}
        >
          {resultData.code}
        </Text>
        <Text
          style={{
            color: "#34495E",
            fontSize: "1.1em",
            marginTop: "10px",
            padding: "0 20px",
            lineHeight: "1.6",
          }}
        >
          {resultData.des}
        </Text>
        <Box>
          {displayedGroups.map((group, index) => (
            <Box key={index} className="career-group-section">
              <Text
                bold
                className="mt-12"
                style={{ fontSize: "2em", lineHeight: "1" }}
              >
                {careerGroupData[group].name}
              </Text>
              <img src={careerGroupData[group].image} alt={`${group} image`} />
              <div
                style={{
                  backgroundColor: "#EBE6E0",
                  borderRadius: "8px",
                  padding: "10px",
                  marginTop: "10px",
                }}
              >
                <Text>{careerGroupData[group].characterist[0].content}</Text>
              </div>
              <Button
                onClick={() => toggleExpand(index)}
                style={{ marginTop: 12, marginBottom: 10 }}
              >
                {expandedGroupIndex === index ? (
                  <>
                    Ẩn
                    <Icon icon="zi-chevron-up" />
                  </>
                ) : (
                  <>
                    Xem thêm
                    <Icon icon="zi-chevron-down" />
                  </>
                )}
              </Button>
              {expandedGroupIndex === index && (
                <Box className="expanded-content">
                  {/* "Đặc điểm nổi bật" Text */}
                  <Text
                    bold
                    className="mb-4 mt-6"
                    style={{ fontSize: "1.5em" }}
                  >
                    Đặc điểm nổi bật:
                  </Text>
                  <div
                    style={{
                      backgroundColor: "#DE5B87",
                      padding: "10px",
                      borderRadius: "8px",
                      marginBottom: "1em",
                    }}
                  >
                    <Text>
                      {careerGroupData[group].characterist[0].content}
                    </Text>
                  </div>

                  <Text
                    bold
                    className="mb-4 mt-6"
                    style={{ fontSize: "1.5em" }}
                  >
                    Điều bạn cần cải thiện:
                  </Text>
                  <div className="flex flex-col space-y-4">
                    {careerGroupData[group].improvements.map(
                      (improvement, index) => {
                        // Define 4 different background colors
                        const bgColors = [
                          "#E44C4E",
                          "#7FCAAC",
                          "#FED28B",
                          "#F29B70",
                        ];

                        return (
                          <div
                            key={improvement.id}
                            className={`flex items-center p-4 rounded-lg`}
                            style={{
                              backgroundColor: bgColors[index % 4], // Assign color based on index (4 colors)
                              flexDirection:
                                index % 2 === 0 ? "row" : "row-reverse", // Alternate layout between left and right
                            }}
                          >
                            {/* ID number */}
                            <div className="text-4xl font-bold w-12 flex-shrink-0 text-center">
                              {improvement.id}
                            </div>

                            {/* Title and Content */}
                            <div className="ml-4">
                              <Text
                                bold
                                className="mb-2"
                                style={{ fontSize: "1.2em" }}
                              >
                                {improvement.title}
                              </Text>
                              <p>{improvement.content}</p>
                            </div>
                          </div>
                        );
                      }
                    )}
                  </div>

                  {/* Majors */}
                  <Text
                    bold
                    className="mb-4 mt-6"
                    style={{ fontSize: "1.5em" }}
                  >
                    Ngành học phù hợp:
                  </Text>
                  <div
                    style={{
                      backgroundColor: "#91CDF9",
                      padding: "10px",
                      borderRadius: "8px",
                      marginBottom: "1em",
                    }}
                  >
                    <ul>
                      {careerGroupData[group].majors.map((major, idx) => (
                        <li key={idx}>{major}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Careers */}
                  <Text
                    bold
                    className="mb-4 mt-6"
                    style={{ fontSize: "1.5em" }}
                  >
                    Nghề nghiệp thích hợp:
                  </Text>
                  <div
                    style={{
                      backgroundColor: "#F3AAB5",
                      padding: "10px",
                      borderRadius: "8px",
                      marginBottom: "1em",
                    }}
                  >
                    <ul>
                      {careerGroupData[group].careers.map((career, idx) => (
                        <li key={idx}>{career}</li>
                      ))}
                    </ul>
                  </div>
                </Box>
              )}
            </Box>
          ))}
        </Box>
        <Button
          style={{
            backgroundColor: "#FF6600",
            color: "#FFF",
            borderRadius: "8px",
            padding: "12px 24px",
            marginTop: "30px",
            fontSize: "1.2em",
            width: "100%",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            transition: "transform 0.2s",
          }}
          onClick={handleBack}
          onMouseOver={(e) => (e.target.style.transform = "scale(1.05)")}
          onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
        >
          Tiếp theo
        </Button>
      </Box>
    </Page>
  );
};

export default TestResultHolland;
