import React, { useEffect, useState } from "react";
import { Page, Box, Text, Input, Grid, Header, Swiper } from "zmp-ui";
import { Link } from "react-router-dom";
import { getNews } from "api/news";

export default function News() {
  const [news, setNews] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await getNews({ searchValue });
        setNews(response.data._news || []);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };
    fetchNews();
  }, [searchValue]);

  // Xử lý khi người dùng nhập vào ô tìm kiếm
  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
    console.log("Search value:", e.target.value); // Thay bằng logic xử lý tìm kiếm
  };

  return (
    <Page className="page" style={{ marginTop: "40px", marginBottom: "70px" }}>
      <Header
        showBackIcon={true}
        style={{ textAlign: "center" }}
        textColor="white" // Truyền textColor vào header
        title={
          <div className="header-title">
            <Input.Search
              style={{
                width: "90%",
                height: "36px",
                border: "1px solid #ccc",
                borderRadius: "8px",
                padding: "0 12px",
                fontSize: "14px",
                outline: "none",
                background: "transparent", // Đặt nền của input thành trong suốt
                color: "white",
              }}
              type="text"
              placeholder="Tìm kiếm tin tức..."
              value={searchValue}
              onChange={handleSearchChange}
              className="header-search-input"
            />
          </div>
        }
      />
      <Box
        flex
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <Swiper autoplay duration={2000} loop>
          <Swiper.Slide>
            <img
              className="slide-img"
              src="https://dnuni.fpt.edu.vn/wp-content/uploads/2022/02/Untitled-design-12-min-1600x900.png"
              alt="slide-1"
            />
          </Swiper.Slide>
          <Swiper.Slide>
            <img
              className="slide-img"
              src="https://tuyensinh.ueh.edu.vn/wp-content/uploads/2024/06/1920x1080.png"
              alt="slide-2"
            />
          </Swiper.Slide>
          <Swiper.Slide>
            <img
              className="slide-img"
              src="https://vluwebmedia.s3.ap-southeast-1.amazonaws.com/large_xet_hoc_ba_1920x1080_01_5d8328bee8.jpg"
              alt="slide-3"
            />
          </Swiper.Slide>
          <Swiper.Slide>
            <img
              className="slide-img"
              src="https://www.hoasen.edu.vn/tuyensinh/wp-content/uploads/sites/7/2024/07/tuyensinh.png"
              alt="slide-4"
            />
          </Swiper.Slide>
          <Swiper.Slide>
            <img
              className="slide-img"
              src="https://westernsydney.edu.vn/wp-content/uploads/2020/05/wsu-tuyen-sinh-cu-nhan-kinh-doan-western-sydney-bbus-1.png"
              alt="slide-5"
            />
          </Swiper.Slide>
        </Swiper>
      </Box>
      <Box style={{ padding: "10px" }}>
        {/* <Input.Search
          label="Label"
          placeholder="Tìm kiếm tin tức ?"
          onChange={(e) => handleSearch(e.target.value)}
          style={{ marginTop: "10px" }}
          maxLength={25}
          clearable
        /> */}
        <Text
          className=" mt-3"
          bold
          style={{ fontSize: "1.2em", marginBottom: "15px" }}
        >
          Tin tức
        </Text>
        {news.map((news) => (
          <Link
            style={{ marginTop: "10px" }}
            key={news.id}
            to={`/newsdetail/${news.id}`}
          >
            <Box
              style={{
                height: "150px",
                borderTop: "1px solid rgba(0, 0, 0, 0.2)",
                alignItems: "center",
                display: "flex",
                padding: "10px",
              }}
            >
              <Box
                flex
                style={{ display: "flex", alignItems: "center", width: "100%" }}
              >
                {/* Text Section */}
                <Box
                  style={{
                    marginRight: "10px",
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
                  <Text
                    bold
                    size="large"
                    style={{ wordWrap: "break-word", textAlign: "justify" }}
                  >
                    {news.title?.length > 50
                      ? news.title.slice(0, 50) + "..."
                      : news.title}
                  </Text>
                  <Text
                    className="text-gray-500"
                    style={{
                      marginTop: "5px",
                      textAlign: "justify",
                    }}
                  >
                    {new Date(news.createdAt).toLocaleDateString("vi-VN")}
                  </Text>
                  <Text
                    className="text-gray-500"
                    style={{
                      marginTop: "5px",
                      textAlign: "justify",
                    }}
                  >
                    {news?.universityName}
                  </Text>
                  {/* <Text
                    className="text-gray-500"
                    style={{
                      marginTop: "5px",
                      textAlign: "justify",
                    }}
                  >
                    {news?._HashTag?.map((tag) => `#${tag?.values} `)}
                  </Text> */}
                </Box>

                {/* Image Section */}
                <img
                  style={{
                    borderRadius: "10px",
                    flexShrink: 0,
                    width: "120px",
                    height: "120px",
                    objectFit: "cover",
                  }}
                  src={
                    news?.imageNews?.[0]?.imageUrl ||
                    "https://trungtamnnth.ctuet.edu.vn/wp-content/uploads/2020/10/tin-tuc-giao-dich-ngoai-hoi-clarity.jpg"
                  }
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src =
                      "https://trungtamnnth.ctuet.edu.vn/wp-content/uploads/2020/10/tin-tuc-giao-dich-ngoai-hoi-clarity.jpg";
                  }}
                  alt="image"
                />
              </Box>
            </Box>
          </Link>
        ))}
      </Box>
    </Page>
  );
}
