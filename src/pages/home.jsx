import React, { useEffect, useState } from "react";
import { Page, Box, Text, Input, Grid, Swiper, Header, Icon } from "zmp-ui";
import { useNavigate } from "react-router-dom";
import EastIcon from "@mui/icons-material/East";
import { Link } from "react-router-dom";
import { Carousel } from "antd";
import { getNews } from "api/news";
import "./home.css";

import { getMajorCategory } from "api/major";

import { getOccupationalGroup } from "api/occupation";

const HomePage = () => {
  const [news, setNews] = useState([]);
  const [filteredNews, setFilteredNews] = useState([]);
  const [occupationGroup, setOccupationGroup] = useState([]);
  const [majorCategories, setMajorCategories] = useState([]);
  const [visibleCount, setVisibleCount] = useState(4);

  const exploreCardData = [
    {
      id: "mbtiTest",
      title: "Bài kiểm tra tính cách MBTI",
      imageUrl:
        "https://tracuuthansohoc.com/wp-content/uploads/2023/07/bai-trac-nghiem-tinh-cach-mbti.jpg",
      route: "/mbtiList",
    },
    {
      id: "hollandTest",
      title: "Bài kiểm tra nghề nghiệp Holland",
      imageUrl:
        "https://res.cloudinary.com/team-odeon/images/w_1640,h_1586,c_scale/f_webp/v1667316862/degreechoices/self-directed-search-sds/self-directed-search-sds.png?_i=AA",
      route: "/hollandList",
    },
  ];

  useEffect(() => {
    const fetchMajorCategories = async () => {
      try {
        const response = await getMajorCategory();
        setMajorCategories(response.data.majorCategorys || []);
      } catch (error) {
        console.error("Error fetching major categories:", error);
      }
    };

    fetchMajorCategories();
  }, []);

  const navigate = useNavigate();

  const contentStyle = {
    height: "250px",
    color: "#fff",
    lineHeight: "400px",
    textAlign: "center",
    background: "#364d79",
    marginTop: "0px",
  };

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await getNews();
        if (
          response.data &&
          response.data._news &&
          response.data._news.length > 0
        ) {
          setNews(response.data._news); // Store all news items
          setFilteredNews(response.data._news); // Initially, set filtered news to all news
        } else {
          console.log("No news data found");
        }
      } catch (error) {
        console.log("Error in fetch news:", error);
      }
    };

    fetchNews();
  }, []);

  useEffect(() => {
    const fetchOccupationGroup = async () => {
      try {
        const response = await getOccupationalGroup();
        setOccupationGroup(response.data.occupationalGroups || []);
      } catch (error) {
        console.error("Error in fetch occupation group: ", error);
      }
    };

    fetchOccupationGroup();
  }, []);

  if (!news || !occupationGroup || !majorCategories) {
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
        <Text>Đang tải...</Text>
      </Box>
    );
  }

  // const handleSearch = (text) => {
  //   if (text.length < 2) {
  //     setFilteredNews(news);
  //   } else {
  //     const results = news.filter((item) =>
  //       item.title.toLowerCase().includes(text.toLowerCase())
  //     );
  //     setFilteredNews(results);
  //   }
  // };

  return (
    // <>
    //   <Box
    //     style={{
    //       position: "relative",
    //       height: "42px",
    //       backgroundColor: "#0369a1",
    //     }}
    //   ></Box>
    <Page className="page">
      <Header title={"Trang chủ"} showBackIcon={false} />
      <Box
        className=""
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

      {/* <Box style={{ padding: "10px" }}>
        <Input.Search
          label="Label"
          placeholder="Tìm kiếm..."
          onChange={(e) => handleSearch(e.target.value)} // Call handleSearch on input change
          style={{ marginTop: "10px" }}
        />
      </Box> */}
      <Box style={{ padding: "10px" }}>
        <Box
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "10px",
          }}
        >
          <Text className=" mt-3" bold size="normal">
            Danh mục nghề nghiệp
          </Text>
          <button
            onClick={() => navigate(`/occupation`)}
            className=" mt-3"
            size="xSmall"
            style={{ borderBottom: "1px solid blue" }}
          >
            Xem tất cả
          </button>
        </Box>

        <div
          style={{
            display: "grid",
            gridTemplateRows: "1fr 1fr", // Chia thành 2 hàng
            gridAutoFlow: "column", // Bố trí theo chiều ngang
            gap: "10px", // Khoảng cách giữa các phần tử
            overflowX: "auto", // Cho phép cuộn ngang
            width: "100%", // Chiều rộng container
            height: "220px", // Chiều cao cố định
            justifyContent: "center",
          }}
        >
          {occupationGroup
            .filter((group) => group?.status)
            .slice(0, 10)
            .map((group) => (
              <Link
                to={`/occupation/${group.id}`}
                key={group.id}
                style={{ textDecoration: "none" }}
              >
                <Box
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    width: "60px", // Chiều rộng cố định
                    gap: "5px", // Khoảng cách giữa ảnh và chữ
                    overflow: "hidden", // Ngăn chữ vượt quá container
                    textAlign: "center",
                  }}
                >
                  <img
                    src={group.image}
                    alt={group.name}
                    style={{
                      width: "100%",
                      height: "60px", // Chiều cao cố định cho ảnh
                      objectFit: "cover",
                      borderRadius: "10%", // Bo tròn ảnh
                      backgroundColor: "rgba(0, 0, 0, 0.1)", // Màu nền ảnh
                      padding: 5,
                    }}
                  />
                  <Text
                    size="xxxSmall M"
                    bold
                    style={{
                      textAlign: "center", // Căn giữa chữ
                      wordWrap: "break-word", // Tự động xuống dòng
                      wordBreak: "break-word", // Ngắt từ dài
                      width: "100%", // Giới hạn chiều rộng
                      overflow: "hidden", // Giới hạn nội dung bên trong
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                    }}
                  >
                    {group.name}
                  </Text>
                </Box>
              </Link>
            ))}
        </div>
      </Box>
      <Box style={{ padding: "10px" }}>
        <Box
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "10px",
          }}
        >
          <Text className=" mt-3" bold size="normal">
            Bài kiểm tra tính cách
          </Text>
          {/* <button onClick={() => navigate(`/news`)} className=" mt-3" bold size="xSmall" style={{ borderBottom: '1px solid blue' }}>
            Xem tất cả
          </button> */}
        </Box>
        <div
          style={{
            display: "flex",
            gap: "10px", // Khoảng cách giữa các Box
            overflowX: "auto", // Cho phép cuộn ngang khi nội dung vượt khỏi m
          }}
        >
          {exploreCardData.map((card, key) => (
            <Link style={{ marginTop: "10px" }} key={key} to={card.route}>
              <Box
                key={card.id}
                style={{
                  background: "#f8f9fa",
                  padding: "10px",
                  borderRadius: "8px",
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                  marginBottom: "8px",
                  alignItems: "center",
                  flex: "0 0 auto",
                  marginRight: "10px",
                  width: "220px",
                }}
                // onClick={() => navigate(`/newsdetail/${newsItem.id}`)}
              >
                <img
                  src={card.imageUrl}
                  alt={card.title}
                  style={{
                    width: "100%",
                    borderRadius: "8px",
                    marginBottom: "10px",
                    objectFit: "cover",
                    height: "150px", // Điều chỉnh chiều cao hình ảnh
                  }}
                />
                <Box
                  style={{
                    padding: "10px",
                    fontSize: "16px",
                    fontWeight: "bold",
                    textAlign: "center",
                    height: "50px",
                  }}
                >
                  <Text bold>
                    {card.title.charAt(0) + card.title.slice(1).slice(0, 40)}
                    {card.title.length > 40 && "..."}{" "}
                    {/* Thêm ba chấm nếu tiêu đề dài hơn 40 ký tự */}
                  </Text>
                </Box>
              </Box>
            </Link>
          ))}
        </div>
      </Box>
      <Box style={{ padding: "10px" }}>
        <Box
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "10px",
          }}
        >
          <Text className=" mt-3" bold size="normal">
            Danh mục ngành học
          </Text>
          <button
            onClick={() => navigate(`/major`)}
            className=" mt-3"
            size="xSmall"
            style={{ borderBottom: "1px solid blue" }}
          >
            Xem tất cả
          </button>
        </Box>
        <div
          style={{
            display: "grid",
            gridTemplateRows: "1fr 1fr", // Chia thành 2 hàng
            gridAutoFlow: "column", // Bố trí theo chiều ngang
            gap: "10px", // Khoảng cách giữa các phần tử
            overflowX: "auto", // Cho phép cuộn ngang
            width: "100%", // Chiều rộng container
            height: "220px", // Chiều cao cố định
            justifyContent: "center",
          }}
        >
          {majorCategories
            ?.filter((majorcategory) => majorcategory?.status)
            .slice(0, 10)
            .map((category) => (
              <Link
                to={`/major/${category?.id}`}
                key={category.id}
                style={{ textDecoration: "none" }}
              >
                <Box
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    width: "60px", // Chiều rộng phần tử
                    gap: "5px", // Khoảng cách giữa ảnh và chữ
                  }}
                >
                  <img
                    src={category.image}
                    alt={category.name}
                    style={{
                      width: "100%",
                      height: "60px", // Chiều cao cố định cho ảnh
                      objectFit: "cover",
                      borderRadius: "10%", // Bo tròn ảnh
                      backgroundColor: "rgba(0, 0, 0, 0.1)", // Màu nền ảnh
                      padding: 5,
                    }}
                  />
                  <Text
                    size="xxxSmall M"
                    bold
                    style={{
                      textAlign: "center",
                      overflow: "hidden", // Ẩn chữ vượt quá giới hạn
                      width: "100%", // Đảm bảo text nằm trong container
                      wordWrap: "break-word", // Tự động xuống dòng
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                    }}
                  >
                    {category.name}
                  </Text>
                </Box>
              </Link>
            ))}
        </div>
      </Box>

      <Box style={{ padding: "10px" }}>
        <Box
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "10px",
          }}
        >
          <Text className=" mt-3" bold size="normal">
            Tin tức mới nhất
          </Text>
          <button
            onClick={() => navigate(`/news`)}
            className=" mt-3"
            size="xSmall"
            style={{ borderBottom: "1px solid blue" }}
          >
            Xem tất cả
          </button>
        </Box>
        <div
          style={{
            display: "flex",
            gap: "10px", // Khoảng cách giữa các Box
            overflowX: "auto", // Cho phép cuộn ngang khi nội dung vượt khỏi m
          }}
        >
          {news.slice(0, visibleCount).map((newsItem) => (
            <Link
              style={{ marginTop: "10px" }}
              key={newsItem.id}
              to={`/newsdetail/${newsItem.id}`}
            >
              <Box
                key={newsItem.id}
                style={{
                  background: "#f8f9fa",
                  padding: "10px",
                  borderRadius: "8px",
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                  marginBottom: "8px",
                  alignItems: "center",
                  flex: "0 0 auto",
                  marginRight: "10px",
                  width: "220px",
                }}
                // onClick={() => navigate(`/newsdetail/${newsItem.id}`)}
              >
                <img
                  src={
                    newsItem?.imageNews?.[0]?.imageUrl ||
                    "https://trungtamnnth.ctuet.edu.vn/wp-content/uploads/2020/10/tin-tuc-giao-dich-ngoai-hoi-clarity.jpg"
                  }
                  alt={newsItem.title || "Default news image"}
                  style={{
                    width: "100%",
                    borderRadius: "8px",
                    marginBottom: "10px",
                    objectFit: "cover",
                    height: "150px",
                  }}
                  loading="lazy"
                  onError={(e) => {
                    e.target.onerror = null; // Prevents infinite loop in case fallback also fails
                    e.target.src =
                      "https://trungtamnnth.ctuet.edu.vn/wp-content/uploads/2020/10/tin-tuc-giao-dich-ngoai-hoi-clarity.jpg";
                  }}
                />
                <Box
                  style={{
                    padding: "10px",
                    fontSize: "16px",
                    fontWeight: "bold",
                    textAlign: "center",
                    height: "50px",
                  }}
                >
                  <Text bold>
                    {newsItem.title.charAt(0).toUpperCase() +
                      newsItem.title.slice(1).toLowerCase().slice(0, 40)}
                    {newsItem.title.length > 40 && "..."}{" "}
                    {/* Thêm ba chấm nếu tiêu đề dài hơn 40 ký tự */}
                  </Text>
                </Box>
              </Box>
            </Link>
          ))}
          <Box
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <button
              onClick={() => navigate(`/news`)}
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.8)",
                border: "none",
                borderRadius: "50%",
                padding: "10px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.15)",
                width: "40px",
                height: "40px",
                margin: "20px auto",
                transition: "background-color 0.3s ease", // Thêm hiệu ứng cho nút
              }}
            >
              <EastIcon style={{ fontSize: "20px", color: "#007bff" }} />
            </button>
          </Box>

          {/* Nút "Xem thêm" */}
          {/* {visibleCount < news.length && (
            <button
              onClick={handleShowMore}
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.8)",
                border: "none",
                borderRadius: "50%",
                padding: "10px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.15)",
                width: "40px",
                height: "40px",
                margin: "20px auto",
                transition: "background-color 0.3s ease", // Thêm hiệu ứng cho nút
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = "rgba(255, 255, 255, 1)"} // Đổi màu khi hover
              onMouseLeave={(e) => e.target.style.backgroundColor = "rgba(255, 255, 255, 0.8)"}
            >
              <EastIcon style={{ fontSize: "20px", color: "#007bff" }} />
            </button>
          )} */}
        </div>
      </Box>
    </Page>
    // </>
  );
};

export default HomePage;
