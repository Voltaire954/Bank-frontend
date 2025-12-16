import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Transaction() {
  const navigate = useNavigate();

  // Get user from Redux
  const user = useSelector((state) => state.session.user);

  if (!user) {
    return <p>Loading transactions...</p>;
  }

  const transactions = user.transactions || [];

  return (
    <div style={{ padding: "20px" }}>
      <h2>Transaction History</h2>

      {transactions.length === 0 ? (
        <p>No transactions found.</p>
      ) : (
        <table border="1" cellPadding="10" cellSpacing="0">
          <thead>
            <tr>
              <th>Type</th>
              <th>Amount ($)</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx) => (
              <tr key={tx.id}>
                <td>{tx.transaction_type}</td>
                <td>{tx.amount.toFixed(2)}</td>
                <td>{new Date(tx.created_at).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <br />

      <button onClick={() => navigate("/user")}>
        ← Back to Profile
      </button>
    </div>
  );
}
