import React, { useEffect, useState } from "react";
import { Page, Box, Text, Input, Grid } from "zmp-ui";
import { Link } from "react-router-dom";
import { getNews } from "api/news";

const HomePage = () => {
  const [news, setNews] = useState([]);
  console.log("news", news);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await getNews();
        if (
          response.data &&
          response.data._news &&
          response.data._news.length > 0
        ) {
          setNews(response.data._news); // Assuming you want the first news item
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
      <Text className=" mt-3" bold style={{ fontSize: "1.2em", marginBottom: '15px' }}>
        Tin tức mới nhất
      </Text>
      {news.map((news) => (
        <Link style={{ marginTop: '10px' }} key={news.id} to={`/newsdetail/${news.id}`}>
          <Box style={{ height: '150px', borderTop: '1px solid rgba(0, 0, 0, 0.2)', alignItems: 'center', display: 'flex' }}>
            <Box flex>
              <Box style={{ marginRight: '2%' }}>
                <Text bold size="large">
                  {news.title}
                </Text>
                <Text className="text-gray-500">{news.createdAt}</Text>
              </Box>
              <img style={{ borderRadius: '10px' }} src={news?.imageNews?.[0]?.imageUrl} alt="image" width={120} />
            </Box>

          </Box>
        </Link>
      ))}

      {/* {news.map((news) => (
        <Box mt={3} ml={2} className="bg-white rounded-lg shadow-md">
          <Box flex>
            <img src={news.imageNews?.imageUrl} alt="image" width={120} />
            <Box ml={4} mt={1}>
              <Text bold size="large">
                {news.title}
              </Text>
              <Text size="xxSmall" className="text-blue-600 ml-60 mb-2">
                Xem thêm
              </Text>
            </Box>
          </Box>
        </Box>
      ))

      } */}
    </Page>
  );
};

export default HomePage;
