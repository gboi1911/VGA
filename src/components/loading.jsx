import React, { useState, useEffect } from "react";
import { Page, Spinner, Box, Text } from "zmp-ui";

export default function LoadingPage() {
    const [isLoading, setIsLoading] = useState(true);
    debugger


    useEffect(() => {
        // Đảm bảo spinner hiển thị ít nhất 3 giây
        const minLoadingTime = new Promise((resolve) => setTimeout(resolve, 3000));

        // Giả lập việc tải dữ liệu
        const fetchData = new Promise((resolve) => {
            // Thay dòng này bằng logic thực tế để tải dữ liệu
            resolve("Dữ liệu đã sẵn sàng!");
        });

        // Kết hợp cả hai promise để đảm bảo đủ thời gian loading
        Promise.all([minLoadingTime, fetchData]).then(() => {
            setIsLoading(false);
        });
    }, []);

    return (
        <Page className="section-container">
            {isLoading ? (
                <>
                    <Text.Title size="small">Loading</Text.Title>
                    <Box
                        mt={12}
                        flex
                        flexDirection="column"
                        justifyContent="center"
                        alignItems="center"
                    >
                        <Spinner visible size="large" />
                    </Box>
                </>
            ) : (
                <Text.Title size="small">Dữ liệu đã sẵn sàng!</Text.Title>
            )}
        </Page>
    );
}
