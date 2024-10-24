import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Page, Box, Text, Button } from "zmp-ui";
import { getRatingMajor } from "api/test";

const RatingMajor = () => {
  return (
    <Page
      className="page"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <Text>Heloo</Text>
    </Page>
  );
};

export default RatingMajor;
