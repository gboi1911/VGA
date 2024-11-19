
import React from "react";
import { useState, useEffect } from "react";
import { Page, Box, Text, Input } from "zmp-ui";
import { Link } from "react-router-dom";
import { getNews } from "api/news";
import './news.css';

export default function News() {
    const [news, setNews] = useState([]);
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

    return (
        <Page className=" p-4 w-full no-padding-top " style={{ paddingTop: '0px !important' }}>
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

        </Page>
    );
}
