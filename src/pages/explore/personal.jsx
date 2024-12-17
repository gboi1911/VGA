import React from "react";
import { Page, Text, Box, Header } from "zmp-ui";
import { Link } from "react-router-dom";

const Personal = () => {
  return (
    <>
      <Page className="page">
        <Header title="Mục cá nhân" style={{ textAlign: "start" }} />
        <Box
          style={{
            backgroundColor: "#FFFFFF",
            padding: "10px",
            borderRadius: "8px",
          }}
        >
          <Link to={"/personality"}>
            <Box
              style={{
                width: "100%",
                height: "200px",
                backgroundImage: `url(https://img.freepik.com/free-vector/people-connecting-jigsaw-pieces-head-together_53876-64636.jpg?t=st=1730822175~exp=1730825775~hmac=da9b900ec3ec8e4d0e365b5bd4f2ef126da2fc5fc7d84c4907da60043a9960ef&w=996)`,
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
                  backgroundColor: "#ffffff",
                  padding: "10px",
                  borderRadius: "8px",
                  marginBottom: "10px",
                  marginRight: "10px",
                  width: "210px",
                  textAlign: "center",
                }}
              >
                <Text bold style={{ fontSize: "20px" }}>
                  Tính cách cá nhân
                </Text>
              </Box>
            </Box>
          </Link>
          <Link to={"/personalOccupation"}>
            <Box
              style={{
                width: "100%",
                height: "200px",
                backgroundImage: `url(https://img.freepik.com/free-vector/professional-people-work_24908-58135.jpg?t=st=1730822306~exp=1730825906~hmac=4256ea3319a36850236f64a7a50ddedca3a1a68304b8ddc7e0b2c6b9c64e804a&w=826)`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "flex-end",
                marginBottom: "16px",
                borderRadius: "8px",
                paddingLeft: "16px",
              }}
            >
              <Box
                style={{
                  backgroundColor: "#ffffff",
                  padding: "10px",
                  borderRadius: "8px",
                  marginBottom: "10px",
                  marginRight: "10px",
                }}
              >
                <Text bold style={{ fontSize: "20px" }}>
                  Ngành học phù hợp
                </Text>
              </Box>
            </Box>
          </Link>
        </Box>
      </Page>
    </>
  );
};

export default Personal;
