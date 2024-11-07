import React from "react";
import { Page, Text, Box } from "zmp-ui";
import { Link } from "react-router-dom";

const exploreCardData = {
  mbtiTest: {
    title: "Bài kiểm tra tính cách MBTI",
    backgroundImage:
      "https://tracuuthansohoc.com/wp-content/uploads/2023/07/bai-trac-nghiem-tinh-cach-mbti.jpg",
    route: "/mbtiTest",
  },
  hollandTest: {
    title: "Bài kiểm tra nghề nghiệp Holland",
    backgroundImage:
      "https://res.cloudinary.com/team-odeon/images/w_1640,h_1586,c_scale/f_webp/v1667316862/degreechoices/self-directed-search-sds/self-directed-search-sds.png?_i=AA",
    route: "/hollandTest",
  },
  major: {
    title: "Ngành học",
    backgroundImage: "https://work247.vn/pictures/images/major-la-gi-6.jpg",
    route: "/major",
  },
  occupation: {
    title: "Nghề nghiệp",
    backgroundImage:
      "https://img.freepik.com/premium-vector/group-different-occupations-standing-white-background_218660-287.jpg?w=1380",
    route: "/occupation",
  },
  university: {
    title: "Đại học",
    backgroundImage:
      "https://img.freepik.com/free-vector/student-campus-flat-composition-with-university-building-background-vector-illustration_1284-81556.jpg",
    route: "/university",
  },
  personal: {
    title: "Cá nhân",
    backgroundImage:
      "https://cdn.vietnambiz.vn/171464876016439296/2020/5/8/personal-branding-15889101272222135142228.png",
    route: "/personal",
  },
};

const Explore = () => {
  return (
    <Page className="page">
      {Object.entries(exploreCardData).map(
        ([key, { title, backgroundImage, route }]) => (
          <Link to={route} key={key} style={{ textDecoration: "none" }}>
            <Box
              style={{
                width: "100%",
                height: "150px",
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "flex-end",
                marginBottom: "16px",
                borderRadius: "8px",
              }}
            >
              <Box
                style={{
                  backgroundColor: "#FFFFFF",
                  borderRadius: "8px",
                  padding: "10px",
                  marginBottom: "10px",
                  marginRight: "10px",
                }}
              >
                <Text
                  style={{
                    fontSize: "20px",
                    fontWeight: "bold",
                  }}
                >
                  {title}
                </Text>
              </Box>
            </Box>
          </Link>
        )
      )}
    </Page>
  );
};

export default Explore;
