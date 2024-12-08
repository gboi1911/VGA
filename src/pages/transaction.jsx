import React, { useState, useEffect } from "react";
import { Page, Box, Text, Header, Spinner } from "zmp-ui";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoins } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import { getTransaction } from "api/userInfo";

const Transaction = ({ accountId }) => {
  const [transactions, setTransactions] = useState([]);
  const [loadingTransactions, setLoadingTransactions] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        setLoadingTransactions(true); // Start loading
        const response = await getTransaction(accountId);
        setTransactions(response.data.transactions);
      } catch (error) {
        console.error("Error in fetching transaction:", error);
      } finally {
        setLoadingTransactions(false); // End loading
      }
    };

    fetchTransactions();
  }, []);

  return (
    <Page className="page" style={{ marginBottom: "48px", marginTop: "40px" }}>
      <Header title="Lịch sử giao dịch" />
      <Box>
        {loadingTransactions ? ( // Show loading spinner or message
          <div style={{ textAlign: "center", padding: "20px" }}>
            <Spinner size="large" color="primary" />
            <Text size="medium" style={{ marginTop: "10px" }}>
              Đang tải giao dịch...
            </Text>
          </div>
        ) : (
          transactions.map((transaction) => (
            <Box
              key={transaction.id}
              style={{
                justifyContent: "space-between",
                alignItems: "center",
                padding: "10px",
                borderBottom: "1px solid #ddd",
                marginTop: "5px",
                backgroundColor: "#F9F9F9",
                borderRadius: "5px",
              }}
            >
              <Box
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Text style={{ fontWeight: "bold", color: "#FFCC00" }}>
                  {transaction?.transactionType === 1
                    ? "+"
                    : transaction?.transactionType === 7
                    ? "+"
                    : transaction?.transactionType === 4
                    ? " "
                    : transaction?.transactionType === 5
                    ? " "
                    : "-"}
                  {transaction?.goldAmount}{" "}
                  <FontAwesomeIcon
                    icon={faCoins}
                    size="xl"
                    style={{
                      marginRight: "10px",
                      color: "#FFD700",
                      marginLeft: "5px",
                    }}
                  />
                </Text>
                <Text
                  size="small"
                  style={{ color: "#888", textAlign: "right" }}
                >
                  {moment(transaction.transactionDateTime).format(
                    "DD/MM/YYYY HH:mm"
                  )}
                </Text>
              </Box>
              <Text size="large" style={{ color: "#555", marginTop: "8px" }}>
                {transaction.description}
              </Text>
            </Box>
          ))
        )}
      </Box>
    </Page>
  );
};

export default Transaction;
