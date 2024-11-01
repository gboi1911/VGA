import React, { useEffect, useState } from "react";
import { Page, Box, Text, Input, Grid } from "zmp-ui";
import { Link } from "react-router-dom";
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
      <Text className=" mt-3" bold style={{ fontSize: "1.2em", marginBottom: '15px' }}>
        Tin tức mới nhất
      </Text>
      {filteredNews.map((news) => (
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

    </Page>
  );
};

export default HomePage;
