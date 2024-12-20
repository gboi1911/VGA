import React from "react";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Page, Text, Box, Header, Input, Spinner } from "zmp-ui";

import { getMajorCategoryId } from "api/major";

export default function Majorbycategory() {
  const [major, setMajor] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  const { id } = useParams();

  useEffect(() => {
    const getmajorbycategory = async () => {
      try {
        const response = await getMajorCategoryId(id, searchValue);
        setMajor(response.data.majors);
      } catch (error) {
        console.error("Error fetching major details:", error);
      }
    };
    getmajorbycategory();
  }, [id, searchValue]);

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
    console.log("Search value:", e.target.value); // Thay bằng logic xử lý tìm kiếm
  };

  if (!major) {
    return (
      <Box
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Spinner />
        <Text>Loading...</Text>
      </Box>
    );
  }

  return (
    <>
      <Page className="page">
        <Header
          showBackIcon={true}
          textColor="white" // Truyền textColor vào header
          title={
            <div className="header-title">
              <Input.Search
                style={{
                  width: "70%",
                  height: "36px",
                  border: "1px solid ",
                  borderRadius: "8px",
                  padding: "0 12px",
                  fontSize: "14px",
                  outline: "none",
                  background: "transparent", // Đặt nền của input thành trong suốt
                  color: "white",
                }}
                type="text"
                placeholder="Tìm kiếm ngành học..."
                value={searchValue}
                onChange={handleSearchChange}
                className="header-search-input"
              />
            </div>
          }
        />
        {/* <Box
                style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "16px",
                    padding: "16px",
                }}
            >
                {major.map((item) => (
                    <Link to={`/majorDetail/${item.id}`} key={item.id} style={{ textDecoration: "none" }}>
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
                                src="https://work247.vn/pictures/images/major-la-gi-6.jpg"
                                alt="hello"
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
                                {item.name}
                            </Text>
                        </Box>
                    </Link>
                ))}
            </Box> */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            //  gap: "10px",
          }}
        >
          {major
            ?.filter((major) => major?.status)
            .map((item) => (
              <Link
                to={`/majorDetail/${item.id}`}
                key={item.id}
                style={{ textDecoration: "none" }}
              >
                <Box
                  key={item.id}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "10px",
                    padding: "10px",
                    backgroundColor: "#fff",
                    borderBottom: "1px solid #e0e0e0",

                    // boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  {/* Icon */}
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{
                      width: "40px",
                      height: "40px",
                      objectFit: "cover",
                      borderRadius: "10%",
                    }}
                  />

                  {/* Nội dung */}
                  <Box
                    style={{
                      width: "100%", // Đảm bảo Box chiếm hết chiều rộng
                    }}
                  >
                    <Text size="small" bold style={{ marginBottom: "5px" }}>
                      {item.name}
                    </Text>
                    <Text size="xxSmall" color="text.secondary">
                      {item?.description.length > 100
                        ? `${item.description.slice(0, 100)}...`
                        : item.description}
                    </Text>
                  </Box>
                </Box>
              </Link>
            ))}
        </div>
      </Page>
    </>
  );
}
