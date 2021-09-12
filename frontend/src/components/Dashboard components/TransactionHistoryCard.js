import React, { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import "../../styles/transaction-history-card.css";
export default function TransactionHistoryCard(props) {
  const [transactions, setTransactions] = useState(props.transactions);

  useEffect(() => {
    setTransactions(props.transactions);
  }, [props.transactions]);

  const renderCard = (card, index) => {
    return (
      <Card
        style={{
          width: "auto",
          height: "auto",
          marginBottom: "3%",
        }}
        className="card-style"
        key={index}
      >
        <Card.Body>
          <Card.Title className="transaction-card-body">
            {card.ownerId === card.userId ? (
              <>
                {card.nameFriend} paid you Rs.{card.amount}
              </>
            ) : (
              <>
                You paid {card.nameOwner} Rs.{card.amount}
              </>
            )}
          </Card.Title>

          <div className="transaction-card-date">
            {card.settledDate.substring(0, 10)}
          </div>
        </Card.Body>
      </Card>
      // <>
      //   {currentUserId === oId ? (
      //     <>
      //       {card.friends.map((transaction, i) => (
      //         <>
      //           {transaction.paymentStatus === true ? (
      //             <Card
      //               style={{
      //                 width: "auto",
      //                 height: "auto",
      //                 marginBottom: "3%",
      //               }}
      //               className="card-style"
      //               key={index}
      //             >
      //               <Card.Body>
      //                 <Card.Title className="transaction-card-body">
      //                   {transaction.userId} payed you Rs. {transaction.amount}
      //                 </Card.Title>

      //                 <div className="transaction-card-date">
      //                   {card.date.substring(0, 10)}
      //                 </div>
      //               </Card.Body>
      //             </Card>
      //           ) : null}
      //         </>
      //       ))}
      //     </>
      //   ) : null}

      //   {card.friends.map((transaction, i) => (
      //     <>
      //       {currentUserId === transaction.userId &&
      //       transaction.paymentStatus === true ? (
      //         <Card
      //           style={{ width: "auto", height: "auto", marginBottom: "3%" }}
      //           className="card-style"
      //           key={index}
      //         >
      //           <Card.Body>
      //             <Card.Title className="transaction-card-body">
      //               You payed {card.owner.ownerId} Rs. {transaction.amount}
      //             </Card.Title>
      //             <Card.Text>
      //               <div className="transaction-card-date">
      //                 {card.date.substring(0, 10)}
      //               </div>
      //             </Card.Text>
      //             <br />
      //           </Card.Body>
      //         </Card>
      //       ) : null}
      //     </>
      //   ))}
      // </>
    );
  };
  return (
    <div>
      {transactions.length > 0 ? (
        <>{transactions.map(renderCard)}</>
      ) : (
        "No records to show"
      )}
      <br />
    </div>
  );
}
