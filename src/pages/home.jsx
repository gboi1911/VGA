import React, { useEffect, useState } from "react";
import { Page, Box, Text, Input } from "zmp-ui";
import { getNews } from "api/news";

const HomePage = () => {
  const [news, setNews] = useState([]);
  const [filteredNews, setFilteredNews] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await getNews();
        if (response.data && response.data._news && response.data._news.length > 0) {
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

  const handleSearch = (text) => {
    if (text.length < 2) {
      setFilteredNews(news); 
    } else {
      const results = news.filter((item) =>
        item.title.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredNews(results);
    }
  };

  return (
    <Page className="page p-4 bg-gray-100 w-full">
      <img
        src="https://cdn.123job.vn/123job/uploads/2021/04/22/2021_04_22______02612dd7ec3826597c3e6f46c945ed07.jpg"
        alt="FPT Polytechnic uniform"
        className="w-100 h-34 rounded-md mt-3"
      />
      <Input.Search
        label="Label"
        placeholder="Trường đại học bạn muốn tìm ?"
        onChange={(e) => handleSearch(e.target.value)} // Call handleSearch on input change
        style={{ marginTop: "10px" }}
      />
      <Text className="ml-2 mt-3" bold style={{ fontSize: "1.2em" }}>
        Tin tức mới nhất
      </Text>
      {filteredNews.length > 0 ? (
        <Box mt={3} ml={2} className="bg-white rounded-lg shadow-md">
          {filteredNews.map((item) => (
            <Box flex key={item.id}> {/* Make sure to use a unique key */}
              <img src={item.imageNews?.imageUrl} alt="image" width={120} />
              <Box ml={4} mt={1}>
                <Text bold size="large">
                  {item.title}
                </Text>
                <Text size="xxSmall" className="text-blue-600 ml-60 mb-2">
                  Xem thêm
                </Text>
              </Box>
            </Box>
          ))}
        </Box>
      ) : (
        <Text className="ml-2 mt-3">Không có tin tức phù hợp.</Text> // Message if no news found
      )}
    </Page>
  );
};

export default HomePage;
