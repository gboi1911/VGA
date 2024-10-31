import React, { useEffect, useState } from "react";
import { Page, Box, Text, Input } from "zmp-ui";
import { Link } from "react-router-dom";
import { getNews } from "api/news";

const HomePage = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await getNews();
        if (
          response.data &&
          response.data._news &&
          response.data._news.length > 0
        ) {
          setNews(response.data._news[0]); // Assuming you want the first news item
        } else {
          console.log("No news data found");
        }
      } catch (error) {
        console.log("Error in fetch news:", error);
      }
    };

    fetchNews();
  }, []);

  return (
    <Page className="page p-4 bg-gray-100 w-full">
      <img
        src="https://cdn.123job.vn/123job/uploads/2021/04/22/2021_04_22______02612dd7ec3826597c3e6f46c945ed07.jpg" // Use absolute path
        alt="FPT Polytechnic uniform image" // Descriptive alt text
        className="w-100 h-34 rounded-md mt-3"
      />
      <Input.Search
        label="Label"
        placeholder="Trường đại học bạn muốn tìm ?"
        onSearch={(text) => console.log(text)}
        style={{ marginTop: "10px" }}
      />
      <Text className="ml-2 mt-3" bold style={{ fontSize: "1.2em" }}>
        Tin tức mới nhất
      </Text>

      <Box mt={3} ml={2} className="bg-white rounded-lg shadow-md">
        <Box flex>
          <img src={news.imageNews?.imageUrl} alt="image" width={120} />
          <Box ml={4} mt={1}>
            <Text bold size="large">
              {news.title}
            </Text>
            {/* <Link to={`/newsdetail/${id}`}> */}
            <Link to={`/newsdetail`}>
              <Text size="xxSmall" className="text-blue-600 ml-60 mb-2">
                Xem thêm
              </Text>
            </Link>
          </Box>
        </Box>
      </Box>
    </Page>
  );
};

export default HomePage;
