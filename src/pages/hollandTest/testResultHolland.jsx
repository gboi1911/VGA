import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Page, Box, Text, Button } from 'zmp-ui';

const TestResultHolland = () => {
  const location = useLocation();
  const { resultData } = location.state || {}; // Ensure resultData is properly destructured
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/test");
  };

  if (!resultData) {
    return (
      <Page className="page bg-theme-image2" style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
        <Text size="large" style={{ color: "red", textAlign: "center" }}>Error: No result data available.</Text>
      </Page>
    );
  }

  return (
    <Page
      className="page bg-theme-image2"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: "url('https://image.slidesdocs.com/responsive-images/background/virtual-learning-made-easy-an-illustration-of-a-student-engaged-in-an-online-classroom-powerpoint-background_7e7cee49f8__960_540.jpg')",
        backgroundSize: "cover",
        minHeight: "100vh",
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
            color: "#27AE60",
            fontSize: "2em",
            marginTop: "20px",
          }}
        >
          {resultData.name} - {resultData.code}
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
        <Button
          style={{
            backgroundColor: "#FF7675",
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
  );
};

export default TestResultHolland;
