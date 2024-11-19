import React from "react";
import { Page, Text, Header } from "zmp-ui";
import { Link } from "react-router-dom";
import Grid from "@mui/system/Grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { borderBottom, height } from "@mui/system";


// const exploreCardData = {
//   mbtiTest: {
//     title: "Bài kiểm tra tính cách MBTI",
//     imageUrl:
//       "https://tracuuthansohoc.com/wp-content/uploads/2023/07/bai-trac-nghiem-tinh-cach-mbti.jpg",
//     route: "/mbtiTest",
//   },
//   hollandTest: {
//     title: "Bài kiểm tra nghề nghiệp Holland",
//     imageUrl:
//       "https://res.cloudinary.com/team-odeon/images/w_1640,h_1586,c_scale/f_webp/v1667316862/degreechoices/self-directed-search-sds/self-directed-search-sds.png?_i=AA",
//     route: "/hollandTest",
//   },
//   major: {
//     title: "Ngành học",
//     imageUrl: "https://work247.vn/pictures/images/major-la-gi-6.jpg",
//     route: "/major",
//   },
//   occupation: {
//     title: "Nghề nghiệp",
//     imageUrl:
//       "https://img.freepik.com/premium-vector/group-different-occupations-standing-white-background_218660-287.jpg?w=1380",
//     route: "/occupation",
//   },
//   university: {
//     title: "Đại học",
//     imageUrl:
//       "https://img.freepik.com/free-vector/student-campus-flat-composition-with-university-building-background-vector-illustration_1284-81556.jpg",
//     route: "/university",
//   },
//   personal: {
//     title: "Cá nhân",
//     imageUrl:
//       "https://cdn.vietnambiz.vn/171464876016439296/2020/5/8/personal-branding-15889101272222135142228.png",
//     route: "/personal",
//   },
// };

const exploreCardData = [
  {
    id: "mbtiTest",
    title: "Bài kiểm tra tính cách MBTI",
    description: "Khám phá tính cách qua bài kiểm tra MBTI phổ biến.",
    imageUrl:
      "https://tracuuthansohoc.com/wp-content/uploads/2023/07/bai-trac-nghiem-tinh-cach-mbti.jpg",
    route: "/mbtiTest",
  },
  {
    id: "hollandTest",
    title: "Bài kiểm tra nghề nghiệp Holland",
    description: "Tìm hiểu nghề nghiệp phù hợp với bài kiểm tra Holland.",
    imageUrl:
      "https://res.cloudinary.com/team-odeon/images/w_1640,h_1586,c_scale/f_webp/v1667316862/degreechoices/self-directed-search-sds/self-directed-search-sds.png?_i=AA",
    route: "/hollandTest",
  },
  {
    id: "major",
    title: "Ngành học",
    description: "Tìm hiểu thông tin chi tiết về các ngành học.",
    imageUrl: "https://work247.vn/pictures/images/major-la-gi-6.jpg",
    route: "/major",
  },
  {
    id: "occupation",
    title: "Nghề nghiệp",
    description: "Khám phá các lĩnh vực nghề nghiệp đa dạng.",
    imageUrl:
      "https://img.freepik.com/premium-vector/group-different-occupations-standing-white-background_218660-287.jpg?w=1380",
    route: "/occupation",
  },
  {
    id: "university",
    title: "Đại học",
    description: "Thông tin về các trường đại học hàng đầu.",
    imageUrl:
      "https://img.freepik.com/free-vector/student-campus-flat-composition-with-university-building-background-vector-illustration_1284-81556.jpg",
    route: "/university",
  },
  {
    id: "personal",
    title: "Cá nhân",
    description: "Quản lý và phát triển thương hiệu cá nhân.",
    imageUrl:
      "https://cdn.vietnambiz.vn/171464876016439296/2020/5/8/personal-branding-15889101272222135142228.png",
    route: "/personal",
  },
];
;

const Explore = () => {
  return (
    <Page className="page" style={{ marginTop: "40px" }}>
      <Header title="Khám phá" showBackIcon={false} style={{ textAlign: 'center' }} />
      {/* <Box
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "16px",
          padding: "16px",
        }}
      >
        {Object.entries(exploreCardData).map(
          ([key, { title, imageUrl, route }]) => (
            <Link to={route} key={key} style={{ textDecoration: "none" }}>
              <Box
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  borderRadius: "8px",
                  overflow: "hidden",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                }}
              >
                <img
                  src={imageUrl}
                  alt={title}
                  style={{
                    width: "100%",
                    height: "150px",
                    objectFit: "cover",
                  }}
                />
                <Text
                  style={{
                    padding: "10px",
                    fontSize: "16px",
                    fontWeight: "bold",
                    textAlign: "center",
                    height: "50px",
                  }}
                >
                  {title}
                </Text>
              </Box>
            </Link>
          )
        )}
      </Box> */}
      {/* <Box className="mb-6">
        <Text
          bold
          className="text-center mb-8 mt-8"
          style={{
            fontSize: "2.5em",
            textShadow: "1px 1px 2px rgba(0, 0, 0, 0.3)",
          }}
        >
          Khám phá
        </Text>
      </Box> */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "5px",
          margin: "5px",
        }}
      >
        {exploreCardData?.map((card, key) => (
          <Link to={card.route} key={key} style={{ textDecoration: "none" }}>
            <Box
              key={card.id}
              style={{
                display: "flex",
                height: '80px',
                alignItems: "center",
                gap: "10px",
                padding: "10px",
                backgroundColor: "#fff",
                borderRadius: "8px",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
              }}
            >
              {/* Icon */}
              <img
                src={card.imageUrl}
                alt={card.title}
                style={{
                  width: "50px",
                  height: "50px",
                  objectFit: "cover",
                  borderRadius: "50%",
                }}
              />

              {/* Nội dung */}
              <Box>
                <Text size="small" bold>
                  {card.title}
                </Text>
                <Text size="xxSmall" color="text.secondary">
                  {card.description}
                </Text>
              </Box>
            </Box>
          </Link>
        ))}
      </div>
    </Page>
  );
};

export default Explore;
