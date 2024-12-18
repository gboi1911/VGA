import React, { useState, useEffect } from "react";
import { Page, Box, Text, Header, Spinner, Modal } from "zmp-ui";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoins } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import { getTransaction } from "api/userInfo";

const Transaction = ({ accountId }) => {
  const [transactions, setTransactions] = useState([]);
  const [loadingTransactions, setLoadingTransactions] = useState(true);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        setLoadingTransactions(true);
        const response = await getTransaction(accountId);
        setTransactions(response.data.transactions);
      } catch (error) {
        console.error("Error in fetching transaction:", error);
      } finally {
        setLoadingTransactions(false);
      }
    };

    fetchTransactions();
  }, []);

  return (
    <>
      <Page className="page">
        <Header title="Lịch sử giao dịch" style={{ textAlign: "start" }} />
        <Box>
          {loadingTransactions ? (
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
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  padding: "15px",
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  marginTop: "5px",
                  backgroundColor: "#F9F9F9",
                  width: "95%",
                  margin: "auto",
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
                {transaction.image && (
                  <Text
                    style={{
                      color: "blue",
                      textDecoration: "underline",
                      marginTop: 5,
                    }}
                    onClick={() => setSelectedTransaction(transaction)}
                  >
                    Xem hình ảnh thanh toán
                  </Text>
                )}
              </Box>
            ))
          )}
        </Box>
      </Page>

      {/* Modal for displaying the selected image */}
      {selectedTransaction && (
        <Modal
          visible={!!selectedTransaction}
          onClose={() => setSelectedTransaction(null)}
          style={{ padding: 0 }}
          title="Hình ảnh thanh toán"
        >
          <Box
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              style={{
                width: "100%",
                objectFit: "contain",
                borderRadius: "8px",
              }}
              src={selectedTransaction.image}
              alt="Payment Image"
            />
          </Box>
        </Modal>
      )}
    </>
  );
};

export default Transaction;
