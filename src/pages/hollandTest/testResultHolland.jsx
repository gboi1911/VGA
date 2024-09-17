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
      <Page className="page bg-theme-image2">
        <Text>Error: No result data available.</Text>
      </Page>
    );
  }

  return (
    <Page className="page bg-theme-image2">
      <Box className="bg-white rounded-lg shadow-md overflow-hidden">
        <img
          src="https://asiasociety.org/sites/default/files/styles/1200w/public/C/cte-career-planning-tools-980x650.png" 
          alt='image'          
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
          role='presentation'/>
        <Text bold size="xLarge" style={{textAlign:"center", color:"green"}}>{resultData.name}</Text>
        <Text style={{color:"#339966", marginTop:"20px", padding:"10px"}}>{resultData.des}</Text>
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

export default TestResultHolland;
