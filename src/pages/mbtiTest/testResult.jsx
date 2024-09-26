import React from "react";
import { Page, Text, Box, Button } from "zmp-ui";
import { useNavigate, useLocation } from "react-router-dom";

const TestResult = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { resultData } = location.state || {};

    const handleBack = () => {
        navigate("/test");
    };

    return (
        <Page
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
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
                        color: "#339999",
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
                        lineHeight: "1.6",
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
    );
};

export default TestResult;
