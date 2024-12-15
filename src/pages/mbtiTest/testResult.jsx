import React from "react";
import { Page, Text, Box, Button } from "zmp-ui";
import { useNavigate, useLocation } from "react-router-dom";

const TestResult = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { resultData } = location.state || {};
  console.log(resultData);

  const handleBack = () => {
    navigate("/explore");
  };

  return (
    <>
      <Box
        style={{
          position: "relative",
          height: "42px",
          backgroundColor: "#0369a1",
        }}
      ></Box>
      <Page
        className="page"
        style={{ justifyContent: "center", display: "flex", padding: 10 }}
      >
        <Box
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            borderRadius: "15px",
            padding: "10px",
            boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
            marginTop: "50px",
          }}
        >
          <img
            src="https://images.ctfassets.net/cnu0m8re1exe/3Rom6Wl30JAyXQfPBR2kgx/357c8172c06a2f45b1e5222c1b69d764/shutterstock_2070009056.jpg"
            alt="Result"
            style={{
              width: "100%",
              height: "300px",
              objectFit: "fill",
              borderRadius: "15px 15px 0 0",
            }}
          />
          <Text
            bold
            size="xLarge"
            style={{
              color: "black",
              fontSize: "2em",
              marginTop: "20px",
              textAlign: "center",
            }}
          >
            {resultData.name} - {resultData.code}
          </Text>
          <Text
            bold
            size="large"
            style={{
              color: "#26966b",
              fontSize: "1em",
              marginTop: "30px",
              textAlign: "justify",
            }}
          >
            {resultData.about.split(/\(\d+\)/).map(
              (part, index) =>
                part.trim() && (
                  <React.Fragment key={index}>
                    <span style={{ display: "block", marginBottom: "10px" }}>
                      {part.trim()}
                    </span>
                  </React.Fragment>
                )
            )}
          </Text>
          <Text
            style={{
              color: "#34495E",
              fontSize: "1.3em",
              marginTop: "30px",
              lineHeight: "1.2",
              textAlign: "justify",
            }}
          >
            {resultData.des}
          </Text>
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
            Kết thúc
          </Button>
        </Box>
      </Page>
    </>
  );
};

export default TestResult;
