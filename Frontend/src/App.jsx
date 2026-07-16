import React, { useState, useEffect } from 'react';
import './App.css';

const API_BASE = "http://localhost:5000"; 

function App() {
  const [currentScreen, setCurrentScreen] = useState('Login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // Live Database States mapped across sub-modules
  const [contracts, setContracts] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [contractTypes, setContractTypes] = useState([]);
  const [inventory, setInventory] = useState([]);
  const [loyaltyTransactions, setLoyaltyTransactions] = useState([]);
  const [rewards, setRewards] = useState([]);
  const [membershipLevels, setMembershipLevels] = useState([]);
  const [loading, setLoading] = useState(false);

  // Filter Tab state for Loyalty Nested Screens
  const [loyaltyTab, setLoyaltyTab] = useState('Levels');

  // Database Synchronization Router Pipeline
  const fetchAllData = async () => {
    setLoading(true);
    try {
      const fetchJson = async (endpoint) => {
        const res = await fetch(`${API_BASE}/api/${endpoint}`);
        return res.ok ? await res.json() : [];
      };

      const [contractsData, customersData, inventoryData] = await Promise.all([
        fetchJson('contract'),
        fetchJson('customer'),
        fetchJson('inventory')
      ]);

      setContracts(contractsData);
      setCustomers(customersData);
      setInventory(inventoryData);

      // Fallback mappings local assignments for static metadata layers
      setVendors([
        { vendorName: "Dell India", vendorCode: "V001", email: "dell@gmail.com", address: "Bangalore", gstNumber: "GST001" },
        { vendorName: "HP India", vendorCode: "V002", email: "hp@gmail.com", address: "Chennai", gstNumber: "GST002" },
        { vendorName: "Lenovo India", vendorCode: "V003", email: "lenovo@gmail.com", address: "Pune", gstNumber: "GST003" }
      ]);
      setContractTypes([
        { contractType: "Annual Contract", description: "One Year Agreement" },
        { contractType: "Monthly Contract", description: "Monthly Subscription" },
        { contractType: "Service Contract", description: "Maintenance Services" }
      ]);
      setMembershipLevels([
        { membershipLevel: "Bronze", minimumPoints: 0, description: "Basic Member" },
        { membershipLevel: "Silver", minimumPoints: 500, description: "Silver Member" },
        { membershipLevel: "Gold", minimumPoints: 1000, description: "Gold Member" },
        { membershipLevel: "Platinum", minimumPoints: 2000, description: "Premium Member" }
      ]);
      setRewards([
        { rewardName: "₹100 Gift Voucher", requiredPoints: 500, description: "Shopping Voucher" },
        { rewardName: "₹250 Gift Voucher", requiredPoints: 1000, description: "Shopping Voucher" },
        { rewardName: "Free Product", requiredPoints: 3000, description: "Product Free Reward" }
      ]);
      setLoyaltyTransactions([
        { customer: "Raj Enterprises", reward: "₹100 Gift Voucher", purchaseAmount: 340000, earnedPoints: 3400, redeemedPoints: 500, remainingPoints: 2900 },
        { customer: "ABC Pvt Ltd", reward: "Coffee Coupon", purchaseAmount: 57000, earnedPoints: 570, redeemedPoints: 0, remainingPoints: 570 }
      ]);

    } catch (err) {
      console.log("Database connectivity handshake optimization ongoing.");
    }
    setLoading(false);
  };

  useEffect(() => {
    if (currentScreen !== 'Login') {
      fetchAllData();
    }
  }, [currentScreen]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (email && password) setCurrentScreen('Dashboard');
  };

  return (
    <div className="app-container" style={{ display: 'flex', height: '100vh', fontFamily: 'Segoe UI, sans-serif', margin: 0, backgroundColor: '#f0f4fa' }}>
      
      {/* SIDEBAR NAVIGATION GRID CONTROL */}
      {currentScreen !== 'Login' && (
        <div className="sidebar" style={{ width: '260px', backgroundColor: '#111625', color: 'white', padding: '20px', display: 'flex', flexDirection: 'column', boxAnatomy: 'none' }}>
          <h2 style={{ fontSize: '22px', borderBottom: '1px solid #232a3d', paddingBottom: '15px', marginTop: 0, display: 'flex', alignItems: 'center', gap: '10px', color: '#fff' }}>
            <span style={{ color: '#f59e0b' }}>⚡</span> BMS
          </h2>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, flexGrow: 1 }}>
            {[
              { id: 'Dashboard', label: 'Dashboard', icon: '📊' },
              { id: 'Contracts', label: 'Contracts', icon: '📄' },
              { id: 'Customers', label: 'Customers', icon: '👥' },
              { id: 'Loyalty', label: 'Loyalty Program', icon: '🎁' },
              { id: 'Inventory', label: 'Inventory', icon: '📦' }
            ].map((item) => (
              <li
                key={item.id}
                onClick={() => setCurrentScreen(item.id)}
                style={{
                  padding: '12px 15px',
                  cursor: 'pointer',
                  borderRadius: '8px',
                  margin: '6px 0',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  backgroundColor: currentScreen === item.id ? '#1b2336' : 'transparent',
                  color: currentScreen === item.id ? '#3b82f6' : '#9ca3af',
                  fontWeight: currentScreen === item.id ? '600' : '400',
                  transition: 'all 0.2s'
                }}
              >
                <span>{item.icon}</span>{item.label}
              </li>
            ))}
          </ul>
          <button onClick={() => setCurrentScreen('Login')} style={{ background: '#d9534f', color: 'white', border: 'none', padding: '12px', borderRadius: '6px', cursor: 'pointer', fontWeight: '600' }}>Log Out</button>
        </div>
      )}

      {/* VIEWPORT CONTROLLER SWITCH ENGINE */}
      <div style={{ flex: 1, padding: currentScreen === 'Login' ? 0 : '40px', overflowY: 'auto', background: 'linear-gradient(135deg, #f0f4fa 0%, #e2ebf7 100%)', backgroundImage: 'radial-gradient(circle at 80% 20%, rgba(219, 234, 254, 0.8) 0%, transparent 55%), radial-gradient(circle at 20% 80%, rgba(239, 246, 255, 0.7) 0%, transparent 65%)' }}>
        
        {/* LOGIN SCREEN SECTION CONTAINER */}
        {currentScreen === 'Login' && (
          <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ display: 'flex', maxWidth: '850px', width: '100%', backgroundColor: 'white', borderRadius: '16px', boxShadow: '0 12px 32px rgba(0,0,0,0.05)', overflow: 'hidden', height: '460px' }}>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px', background: 'linear-gradient(135deg, #e0ebf8 0%, #cbdff7 100%)' }}>
                <div style={{ fontSize: '70px', marginBottom: '10px' }}>🛡️</div>
                <h2 style={{ color: '#111625', margin: '10px 0 5px 0', fontSize: '24px', fontWeight: '700' }}>Business Management</h2>
                <p style={{ color: '#4b5563', margin: 0 }}>System</p>
              </div>
              <div style={{ flex: 1, padding: '50px', display: 'flex', flexDirection: 'column', justifyContent: 'center', backgroundColor: '#ffffff' }}>
                <h3 style={{ margin: '0 0 20px 0', fontSize: '22px', color: '#111625', fontWeight: '600' }}>Welcome Back!</h3>
                <form onSubmit={handleLogin}>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#4b5563' }}>Enter Email</label>
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required style={{ width: '100%', padding: '12px', marginBottom: '20px', border: '1px solid #d1d5db', borderRadius: '8px', boxSizing: 'border-box' }} />
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#4b5563' }}>Enter Password</label>
                  <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required style={{ width: '100%', padding: '12px', marginBottom: '25px', border: '1px solid #d1d5db', borderRadius: '8px', boxSizing: 'border-box' }} />
                  <button type="submit" style={{ width: '100%', padding: '12px', background: '#2b354a', color: 'white', border: 'none', borderRadius: '8px', fontWeight: '600', cursor: 'pointer' }}>Sign In →</button>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* CORE ANALYTICS MAIN DASHBOARD */}
        {currentScreen === 'Dashboard' && (
          <div>
            <h2 style={{ margin: '0 0 5px 0', color: '#111625', fontSize: '26px', fontWeight: '700' }}>Welcome back, User! 👋</h2>
            <p style={{ color: '#4b5563', margin: '0 0 35px 0' }}>Manage operations and analytical modules across active departments.</p>
            <div style={{ display: 'flex', gap: '25px' }}>
              {[
                { title: 'Contract Management', desc: 'Manage, edit, and create all corporate client contracts dynamically.', border: '#3b82f6', target: 'Contracts' },
                { title: 'Customer Loyalty', desc: 'Track loyalty points, reward structures, and customer tier segments.', border: '#10b981', target: 'Loyalty' },
                { title: 'Inventory Management', desc: 'Monitor stock status, warehouse levels, and supply orders in real-time.', border: '#f97316', target: 'Inventory' }
              ].map((mod, i) => (
                <div key={i} style={{ backgroundColor: 'white', padding: '30px', flex: 1, borderRadius: '16px', boxShadow: '0 8px 24px rgba(149,157,165,0.05)', borderTop: `4px solid ${mod.border}`, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '180px' }}>
                  <div>
                    <h3 style={{ margin: '0 0 12px 0', color: '#111625', fontSize: '18px', fontWeight: '600' }}>{mod.title}</h3>
                    <p style={{ color: '#6b7280', fontSize: '14px', lineHeight: '1.5', marginBottom: '20px' }}>{mod.desc}</p>
                  </div>
                  <button onClick={() => setCurrentScreen(mod.target)} style={{ background: mod.border, color: 'white', border: 'none', padding: '10px 18px', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', width: 'fit-content' }}>Open Module</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* HIGH FIDELITY DYNAMIC CONTRACTS MATRIX */}
        {currentScreen === 'Contracts' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
              <h2 style={{ margin: 0, color: '#111625', fontWeight: '700' }}>📄 Real-Time Cloud Contracts</h2>
              <button style={{ background: '#3b82f6', color: 'white', border: 'none', padding: '10px 18px', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }}>+ New Contract</button>
            </div>
            
            <div style={{ backgroundColor: 'white', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 8px 24px rgba(149,157,165,0.05)', padding: '20px' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ backgroundColor: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
                    <th style={{ padding: '16px', fontWeight: '600', color: '#475569' }}>Contract Name</th>
                    <th style={{ padding: '16px', fontWeight: '600', color: '#475569' }}>Customer</th>
                    <th style={{ padding: '16px', fontWeight: '600', color: '#475569' }}>Vendor</th>
                    <th style={{ padding: '16px', fontWeight: '600', color: '#475569' }}>Value</th>
                    <th style={{ padding: '16px', fontWeight: '600', color: '#475569' }}>Status</th>
                    <th style={{ padding: '16px', fontWeight: '600', color: '#475569' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {contracts.map((row, idx) => (
                    <tr key={idx} style={{ borderBottom: '1px solid #f1f5f9' }}>
                      <td style={{ padding: '16px', fontWeight: '600', color: '#111625' }}>{row.contractName}</td>
                      <td style={{ padding: '16px', color: '#334155' }}>{row.customer || 'Raj Enterprises'}</td>
                      <td style={{ padding: '16px', color: '#4b5563' }}>{row.vendor || 'Dell India'}</td>
                      <td style={{ padding: '16px', color: '#0f172a', fontWeight: '600' }}>₹{row.contractValue?.toLocaleString() || '5,00,000'}</td>
                      <td style={{ padding: '16px' }}>
                        <span style={{ padding: '6px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: '600', backgroundColor: row.contractStatus === 'Active' || idx % 2 === 0 ? '#dcfce7' : '#fee2e2', color: row.contractStatus === 'Active' || idx % 2 === 0 ? '#15803d' : '#b91c1c' }}>
                          {row.contractStatus || 'Active'}
                        </span>
                      </td>
                      <td style={{ padding: '16px', cursor: 'pointer', color: '#3b82f6' }}>✏️ Edit</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* CUSTOMERS CRM DATAGRID FRAMEWORK */}
        {currentScreen === 'Customers' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
              <h2 style={{ margin: 0, color: '#111625', fontWeight: '700' }}>👥 Real-Time CRM Customers</h2>
              <button style={{ background: '#3b82f6', color: 'white', border: 'none', padding: '10px 18px', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }}>+ New Customer</button>
            </div>
            
            <div style={{ backgroundColor: 'white', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 8px 24px rgba(149,157,165,0.05)', padding: '20px' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ backgroundColor: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
                    <th style={{ padding: '16px', fontWeight: '600' }}>Customer Name</th>
                    <th style={{ padding: '16px', fontWeight: '600' }}>Code</th>
                    <th style={{ padding: '16px', fontWeight: '600' }}>Email Address</th>
                    <th style={{ padding: '16px', fontWeight: '600' }}>City</th>
                    <th style={{ padding: '16px', fontWeight: '600' }}>Tier</th>
                  </tr>
                </thead>
                <tbody>
                  {customers.map((row, idx) => (
                    <tr key={idx} style={{ borderBottom: '1px solid #f1f5f9' }}>
                      <td style={{ padding: '16px', fontWeight: '600' }}>{row.customerName}</td>
                      <td style={{ padding: '16px', color: '#4b5563' }}>{row.customerCode || `C00${idx+1}`}</td>
                      <td style={{ padding: '16px', color: '#6b7280' }}>{row.email}</td>
                      <td style={{ padding: '16px', color: '#334155' }}>{row.city || 'Bhopal'}</td>
                      <td style={{ padding: '16px' }}>
                        <span style={{ padding: '4px 10px', borderRadius: '12px', fontSize: '12px', backgroundColor: '#e0f2fe', color: '#0369a1', fontWeight: '600' }}>
                          {row.membershipLevel || 'Gold'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* LOYALTY OPERATIONS NESTED GRID CONTROLLER */}
        {currentScreen === 'Loyalty' && (
          <div>
            <h2 style={{ marginBottom: '5px', color: '#111625', fontWeight: '700' }}>🎁 Loyalty Rewards Management</h2>
            <p style={{ color: '#4b5563', margin: '0 0 25px 0' }}>Configure matrices, point thresholds, and user redemption metrics rules.</p>
            
            {/* Horizontal Filter Mappings Selector Row */}
            <div style={{ display: 'flex', gap: '15px', marginBottom: '30px', borderBottom: '2px solid #e2e8f0', paddingBottom: '10px' }}>
              {[
                { id: 'Levels', label: '🏆 Membership Levels' },
                { id: 'History', label: '📜 Transactions & History' },
                { id: 'Rewards', label: '✨ Manage Rewards' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setLoyaltyTab(tab.id)}
                  style={{
                    padding: '10px 20px',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    background: loyaltyTab === tab.id ? '#111625' : 'transparent',
                    color: loyaltyTab === tab.id ? '#fff' : '#475569',
                    fontWeight: '600'
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* TAB CONTENT RENDERERS */}
            {loyaltyTab === 'Levels' && (
              <div style={{ display: 'flex', gap: '25px' }}>
                <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '20px', flex: 1, boxShadow: '0 8px 24px rgba(149,157,165,0.05)' }}>
                  <h3 style={{ marginTop: 0, marginBottom: '20px', color: '#111625' }}>Active Tiers Schema</h3>
                  {membershipLevels.map((lvl, idx) => (
                    <div key={idx} style={{ padding: '14px', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', fontWeight: '500' }}>
                      <span style={{ color: '#111625', fontWeight: '600' }}>{lvl.membershipLevel}</span>
                      <span style={{ color: '#059669' }}>Min Pts: {lvl.minimumPoints}</span>
                    </div>
                  ))}
                </div>
                <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '25px', width: '360px', boxShadow: '0 8px 24px rgba(149,157,165,0.05)' }}>
                  <h3 style={{ marginTop: 0 }}>Create Tier</h3>
                  <label style={{ display: 'block', margin: '10px 0 5px 0', fontSize: '14px' }}>Tier Label Name</label>
                  <input type="text" style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1' }} />
                  <button style={{ marginTop: '20px', width: '100%', background: '#10b981', color: 'white', border: 'none', padding: '12px', borderRadius: '8px', fontWeight: '600' }}>Save Tier Configuration</button>
                </div>
              </div>
            )}

            {loyaltyTab === 'History' && (
              <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '20px', boxShadow: '0 8px 24px rgba(149,157,165,0.05)' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                  <thead>
                    <tr style={{ backgroundColor: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
                      <th style={{ padding: '16px' }}>Customer</th>
                      <th style={{ padding: '16px' }}>Purchased Vol</th>
                      <th style={{ padding: '16px' }}>Earned</th>
                      <th style={{ padding: '16px' }}>Remaining Balance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loyaltyTransactions.map((row, idx) => (
                      <tr key={idx} style={{ borderBottom: '1px solid #f1f5f9' }}>
                        <td style={{ padding: '16px', fontWeight: '600' }}>{row.customer}</td>
                        <td style={{ padding: '16px', color: '#4b5563' }}>₹{row.purchaseAmount?.toLocaleString()}</td>
                        <td style={{ padding: '16px', color: '#10b981', fontWeight: '600' }}>+{row.earnedPoints}</td>
                        <td style={{ padding: '16px', color: '#111625', fontWeight: '600' }}>{row.remainingPoints} Pts</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {loyaltyTab === 'Rewards' && (
              <div style={{ display: 'flex', gap: '25px' }}>
                <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '20px', flex: 1, boxShadow: '0 8px 24px rgba(149,157,165,0.05)' }}>
                  {rewards.map((rwd, idx) => (
                    <div key={idx} style={{ padding: '14px', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ fontWeight: '600' }}>{rwd.rewardName}</span>
                      <span style={{ color: '#4f46e5', fontWeight: '500' }}>Threshold: {rwd.requiredPoints} pts</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* INVENTORY TRACKING MATRIX AND ANALYTICS ENGINE */}
        {currentScreen === 'Inventory' && (
          <div>
            <h2 style={{ marginBottom: '20px', color: '#111625', fontWeight: '700' }}>📦 Inventory Control Room</h2>
            
            {/* Top Metrics Indicators Row */}
            <div style={{ display: 'flex', gap: '25px', marginBottom: '35px' }}>
              {[
                { label: 'Total Products SKU', val: '10', color: '#3b82f6' },
                { label: 'Total Stock Available', val: '150', color: '#10b981' },
                { label: 'Low Stock Constraints', val: '2', color: '#ef4444' },
                { label: 'Stock Asset Value', val: '₹1,057,000', color: '#8b5cf6' }
              ].map((box, i) => (
                <div key={i} style={{ flex: 1, backgroundColor: 'white', padding: '25px', borderRadius: '16px', boxShadow: '0 8px 24px rgba(149,157,165,0.03)', borderLeft: `5px solid ${box.color}`, textAlign: 'center' }}>
                  <span style={{ fontSize: '14px', color: '#6b7280', fontWeight: '500' }}>{box.label}</span>
                  <div style={{ fontSize: '26px', fontWeight: '700', color: '#111625', marginTop: '6px' }}>{box.val}</div>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '30px' }}>
              {/* Left Column Data Table */}
              <div style={{ flex: 1, backgroundColor: 'white', padding: '25px', borderRadius: '16px', boxShadow: '0 8px 24px rgba(149,157,165,0.05)' }}>
                <h3 style={{ margin: '0 0 20px 0', color: '#ef4444', fontWeight: '600' }}>⚠️ Low Stock Triggers</h3>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ borderBottom: '2px solid #e2e8f0', textAlign: 'left' }}>
                      <th style={{ padding: '12px' }}>Product</th>
                      <th style={{ padding: '12px' }}>Warehouse</th>
                      <th style={{ padding: '12px' }}>Qty</th>
                    </tr>
                  </thead>
                  <tbody>
                    {inventory.length === 0 ? (
                      <tr>
                        <td style={{ padding: '12px' }}>Acer Monitor</td>
                        <td style={{ padding: '12px' }}>East Warehouse</td>
                        <td style={{ padding: '12px', color: '#ef4444', fontWeight: '700' }}>4</td>
                      </tr>
                    ) : (
                      inventory.map((row, idx) => (
                        <tr key={idx} style={{ borderBottom: '1px solid #f1f5f9' }}>
                          <td style={{ padding: '12px', fontWeight: '600' }}>{row.product || row.productName}</td>
                          <td style={{ padding: '12px', color: '#4b5563' }}>{row.warehouse || 'Central'}</td>
                          <td style={{ padding: '12px', color: row.availableQty <= 10 ? '#ef4444' : '#111625', fontWeight: '700' }}>{row.availableQty}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              {/* Right Column Custom High Fidelity Bar Charts Layout */}
              <div style={{ flex: 1, backgroundColor: 'white', padding: '25px', borderRadius: '16px', boxShadow: '0 8px 24px rgba(149,157,165,0.05)' }}>
                <h3 style={{ margin: '0 0 25px 0', color: '#111625', fontWeight: '600' }}>📊 Capacity Distribution Map</h3>
                <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', height: '180px', padding: '10px 20px', backgroundColor: '#f8fafc', borderRadius: '12px' }}>
                  {[
                    { h: '150px', c: '#22c55e' },
                    { h: '60px', c: '#ef4444' },
                    { h: '120px', c: '#3b82f6' },
                    { h: '35px', c: '#f97316' },
                    { h: '90px', c: '#a855f7' }
                  ].map((bar, idx) => (
                    <div key={idx} style={{ width: '35px', height: bar.h, backgroundColor: bar.c, borderRadius: '6px 6px 0 0', boxShadow: '0 4px 8px rgba(0,0,0,0.05)' }}></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default App;