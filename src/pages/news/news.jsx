import React, { useEffect, useState } from "react";
import { Page, Box, Text, Input, Grid } from "zmp-ui";
import { Link } from "react-router-dom";
import { getNews } from "api/news";

export default function News() {

    const [news, setNews] = useState([]);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await getNews();
                setNews(response.data._news || []);
            } catch (error) {
                console.error("Error fetching news:", error);
            }
        };
        fetchNews();
    }, []);

    return (
        <Page className="page">
            <Box style={{ padding: '10px' }}>
                <Input.Search
                    label="Label"
                    placeholder="Tìm kiếm tin tức ?"
                    onChange={(e) => handleSearch(e.target.value)} // Call handleSearch on input change
                    style={{ marginTop: "10px" }}
                />
                <Text className=" mt-3" bold style={{ fontSize: "1.2em", marginBottom: '15px' }}>
                    Tin tức
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


            </Box>
        </Page>
    );
}