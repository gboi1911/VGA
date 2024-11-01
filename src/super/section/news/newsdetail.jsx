import { useEffect, useState } from "react";
import { Page, Text, List, Box } from "zmp-ui";
import { Link, Route, useParams } from 'react-router-dom';
import axios from "axios";

export default function NewDetail() {
    const [newsDetail, setNewsDetail] = useState(null);
    const { id } = useParams();
    console.log(newsDetail);

    useEffect(() => {
        const fetchNewsDetail = async () => {
            try {
                const response = await axios.get(`https://vgasystem-emf5a7bqfec2fjh9.southeastasia-01.azurewebsites.net/api/v1/news/${id}`);
                setNewsDetail(response.data);
            } catch (error) {
                console.log("Error fetching news detail:", error);
            }
        };
        fetchNewsDetail();
    }, [id]);

    return (
        <Page style={{ marginLeft: '10px', marginRight: '10px', width: '97%' }}>
            <Box>
                <Text size="large" bold>
                    {newsDetail?.title}
                </Text>
                <Text style={{ marginTop: '10px', marginBottom: "10px" }} size="small" className="text-gray-500">
                    {newsDetail?.createdAt}
                </Text>
            </Box>
            <Box style={{ whiteSpace: "normal" }}>
                {newsDetail?.content.split('\n').map((paragraph, index) => (
                    <Text key={index} style={{ marginBottom: '8px' }}>
                        {paragraph}
                    </Text>
                ))}
            </Box>
            <Box style={{ height: 'auto', overflow: 'hidden', marginTop: '10px', marginBottom: '10px' }}>
                {newsDetail?.imageNews?.map((image, index) => (
                    <Box key={index}>
                        <img src={image.imageUrl} alt="image" style={{ width: '100%', height: '200px' }} />
                        <Text style={{ textAlign: 'center' }}>
                            {image?.descriptionTitle}
                        </Text>
                    </Box>
                ))}
            </Box>
        </Page>
    )
}