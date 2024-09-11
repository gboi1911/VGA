import React from "react";
import { Page, Text, Box, Button } from "zmp-ui";
import { useNavigate, useLocation } from "react-router-dom";

const TestResult = () => {
    const navigate = useNavigate(); 
    const handleBack = () => {
        navigate("/test");
    };
    const location = useLocation();
    const { resultData } = location.state || {};    
    return(
        <Page className="page bg-theme-image2">
            <Box className="bg-white rounded-lg shadow-md overflow-hidden">
                <img
                src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/94d7e5fc-1f42-48bc-9e12-0c81b9bd40c8/dfwfe8g-63f3ffeb-463d-43c4-bab5-e7a1f21fd5a5.png/v1/fill/w_848,h_942,q_70,strp/i_n_f_j_by_lireii_dfwfe8g-pre.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTQyMiIsInBhdGgiOiJcL2ZcLzk0ZDdlNWZjLTFmNDItNDhiYy05ZTEyLTBjODFiOWJkNDBjOFwvZGZ3ZmU4Zy02M2YzZmZlYi00NjNkLTQzYzQtYmFiNS1lN2ExZjIxZmQ1YTUucG5nIiwid2lkdGgiOiI8PTEyODAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.ZpJ_z7J6rX-hp8oule9AMbJNvfLFQ8ER47oE-fIBBho" 
                alt='image'          
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                role='presentation'/>
                <Text bold size="xLarge" style={{textAlign:"center", color:"green"}}>INFJ</Text>
                <Text style={{color:"#339966"}}>{resultData}</Text>
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