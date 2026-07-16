import React, { useState, useEffect } from 'react';
import './App.css';


const API_BASE = window.location.hostname === 'localhost' ? "http://localhost:5000" : "https://business-management-system-procode.vercel.app";

function App() {
  const [currentScreen, setCurrentScreen] = useState('Login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  
  const [contracts, setContracts] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [inventory, setInventory] = useState([]);
  const [loyaltyTransactions, setLoyaltyTransactions] = useState([]);
  const [rewards, setRewards] = useState([]);
  const [membershipLevels, setMembershipLevels] = useState([]);
  const [loading, setLoading] = useState(false);

  const [loyaltyTab, setLoyaltyTab] = useState('Levels');

  
  const [formContract, setFormContract] = useState({ name: '', client: '', status: 'Active', value: '' });
  const [formCustomer, setFormCustomer] = useState({ name: '', code: '', email: '', city: '', level: 'Gold' });

  const loadFallbackData = () => {
    setContracts([
      { contractName: "Dell Supply", customer: "Raj Enterprises", vendor: "Dell India", contractValue: 500000, contractStatus: "Active" },
      { contractName: "HP Service", customer: "ABC Pvt Ltd", vendor: "HP India", contractValue: 200000, contractStatus: "Active" },
      { contractName: "Lenovo Rental", customer: "Sharma Traders", vendor: "Lenovo India", contractValue: 150000, contractStatus: "Active" },
      { contractName: "Acer Enterprise", customer: "Tech Solutions", vendor: "Acer India", contractValue: 1000000, contractStatus: "Active" }
    ]);
    setCustomers([
      { customerName: "Raj Enterprises", customerCode: "C001", email: "raj@gmail.com", city: "Bhopal", membershipLevel: "Gold" },
      { customerName: "ABC Pvt Ltd", customerCode: "C002", email: "abc@gmail.com", city: "Indore", membershipLevel: "Silver" },
      { customerName: "Sharma Traders", customerCode: "C003", email: "sharma@gmail.com", city: "Delhi", membershipLevel: "Platinum" },
      { customerName: "Tech Solutions", customerCode: "C004", email: "tech@gmail.com", city: "Mumbai", membershipLevel: "Gold" }
    ]);
    setInventory([
      { productName: "Dell Laptop Stock", availableQty: 50, warehouse: "Central Warehouse" },
      { productName: "HP Printer Stock", availableQty: 35, warehouse: "North Warehouse" },
      { productName: "Acer Monitor Stock", availableQty: 4, warehouse: "East Warehouse" }
    ]);
    setMembershipLevels([
      { membershipLevel: "Bronze", minimumPoints: 0 },
      { membershipLevel: "Silver", minimumPoints: 500 },
      { membershipLevel: "Gold", minimumPoints: 1000 },
      { membershipLevel: "Platinum", minimumPoints: 2000 },
      { membershipLevel: "Diamond", minimumPoints: 5000 }
    ]);
    setRewards([
      { rewardName: "₹100 Gift Voucher", requiredPoints: 500, description: "Shopping Voucher" },
      { rewardName: "₹250 Gift Voucher", requiredPoints: 1000, description: "Shopping Voucher" },
      { rewardName: "Free Product", requiredPoints: 3000, description: "Free Product Reward" },
      { rewardName: "Premium Membership", requiredPoints: 5000, description: "1 Year Membership" }
    ]);
    setLoyaltyTransactions([
      { customer: "Raj Enterprises", purchaseAmount: 340000, earnedPoints: 3400, remainingPoints: 2900 },
      { customer: "ABC Pvt Ltd", purchaseAmount: 57000, earnedPoints: 570, remainingPoints: 570 }
    ]);
  };

  const fetchAllData = async () => {
    setLoading(true);
    try {
      const fetchJson = async (endpoint) => {
        const res = await fetch(`${API_BASE}/api/${endpoint}`);
        return res.ok ? await res.json() : null;
      };

      const cData = await fetchJson('contract');
      const custData = await fetchJson('customer');
      const invData = await fetchJson('inventory');

      if (cData && cData.length > 0) setContracts(cData);
      else loadFallbackData();

      if (custData && custData.length > 0) setCustomers(custData);
      if (invData && invData.length > 0) setInventory(invData);
    } catch (err) {
      loadFallbackData();
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

  const saveNewContract = () => {
    if (!formContract.name || !formContract.client) {
      alert("Please fill required fields.");
      return;
    }
    const newRecord = {
      contractName: formContract.name,
      customer: formContract.client,
      vendor: "Dell India",
      contractValue: parseInt(formContract.value) || 120000,
      contractStatus: formContract.status
    };
    setContracts([newRecord, ...contracts]);
    setFormContract({ name: '', client: '', status: 'Active', value: '' });
    setCurrentScreen('Contracts');
  };

  const saveNewCustomer = () => {
    if (!formCustomer.name || !formCustomer.email) {
      alert("Please fill required fields.");
      return;
    }
    const newRecord = {
      customerName: formCustomer.name,
      customerCode: formCustomer.code || `C00${customers.length + 1}`,
      email: formCustomer.email,
      city: formCustomer.city || "Indore",
      membershipLevel: formCustomer.level
    };
    setCustomers([newRecord, ...customers]);
    setFormCustomer({ name: '', code: '', email: '', city: '', level: 'Gold' });
    setCurrentScreen('Customers');
  };

  return (
    <div className="app-container" style={{ display: 'flex', height: '100vh', fontFamily: 'Segoe UI, sans-serif', margin: 0, backgroundColor: '#f0f4fa' }}>
      
      {currentScreen !== 'Login' && (
        <div className="sidebar" style={{ width: '260px', backgroundColor: '#111625', color: 'white', padding: '20px', display: 'flex', flexDirection: 'column' }}>
          <h2 style={{ fontSize: '22px', borderBottom: '1px solid #232a3d', paddingBottom: '15px', marginTop: 0, display: 'flex', alignItems: 'center', gap: '10px', color: '#ffffff' }}>
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
                  backgroundColor: currentScreen === item.id || (item.id === 'Loyalty' && ['Loyalty'].includes(currentScreen)) ? '#1b2336' : 'transparent',
                  color: currentScreen === item.id ? '#3b82f6' : '#9ca3af',
                  fontWeight: '500'
                }}
              >
                <span>{item.icon}</span>{item.label}
              </li>
            ))}
          </ul>
          <button onClick={() => setCurrentScreen('Login')} style={{ background: '#d9534f', color: 'white', border: 'none', padding: '12px', borderRadius: '6px', cursor: 'pointer', fontWeight: '600' }}>Log Out</button>
        </div>
      )}

      <div style={{ flex: 1, padding: currentScreen === 'Login' ? 0 : '40px', overflowY: 'auto', background: 'linear-gradient(135deg, #f0f4fa 0%, #e2ebf7 100%)' }}>
        
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
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required style={{ width: '100%', padding: '12px', marginBottom: '20px', border: '1px solid #d1d5db', borderRadius: '8px' }} />
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#4b5563' }}>Enter Password</label>
                  <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required style={{ width: '100%', padding: '12px', marginBottom: '25px', border: '1px solid #d1d5db', borderRadius: '8px' }} />
                  <button type="submit" style={{ width: '100%', padding: '12px', background: '#2b354a', color: 'white', border: 'none', borderRadius: '8px', fontWeight: '600', cursor: 'pointer' }}>Sign In →</button>
                </form>
              </div>
            </div>
          </div>
        )}

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
                    <p style={{ color: '#6b7280', fontSize: '14px', marginBottom: '20px' }}>{mod.desc}</p>
                  </div>
                  <button onClick={() => setCurrentScreen(mod.target)} style={{ background: mod.border, color: 'white', border: 'none', padding: '10px 18px', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }}>Open Module</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {currentScreen === 'Contracts' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
              <h2 style={{ margin: 0, color: '#111625', fontWeight: '700' }}>📄 Real-Time Cloud Contracts ({contracts.length})</h2>
              {/* BUTTON TRIGGER RE-ROUTING FIX */}
              <button onClick={() => setCurrentScreen('AddContractForm')} style={{ background: '#3b82f6', color: 'white', border: 'none', padding: '10px 18px', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }}>+ New Contract</button>
            </div>
            <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '20px', boxShadow: '0 8px 24px rgba(0,0,0,0.02)' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ backgroundColor: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
                    <th style={{ padding: '16px' }}>Contract Name</th>
                    <th style={{ padding: '16px' }}>Customer</th>
                    <th style={{ padding: '16px' }}>Vendor</th>
                    <th style={{ padding: '16px' }}>Value</th>
                    <th style={{ padding: '16px' }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {contracts.map((row, idx) => (
                    <tr key={idx} style={{ borderBottom: '1px solid #f1f5f9' }}>
                      <td style={{ padding: '16px', fontWeight: '600' }}>{row.contractName}</td>
                      <td style={{ padding: '16px' }}>{row.customer || 'N/A'}</td>
                      <td style={{ padding: '16px' }}>{row.vendor || 'Dell India'}</td>
                      <td style={{ padding: '16px', fontWeight: '600' }}>₹{row.contractValue?.toLocaleString()}</td>
                      <td style={{ padding: '16px' }}>
                        <span style={{ padding: '4px 10px', borderRadius: '12px', fontSize: '12px', backgroundColor: '#dcfce7', color: '#15803d', fontWeight: '600' }}>{row.contractStatus || 'Active'}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {currentScreen === 'Customers' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
              <h2 style={{ margin: 0, color: '#111625', fontWeight: '700' }}>👥 Real-Time CRM Customers ({customers.length})</h2>
              {/* BUTTON TRIGGER RE-ROUTING FIX */}
              <button onClick={() => setCurrentScreen('AddCustomerForm')} style={{ background: '#3b82f6', color: 'white', border: 'none', padding: '10px 18px', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }}>+ New Customer</button>
            </div>
            <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '20px', boxShadow: '0 8px 24px rgba(0,0,0,0.02)' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ backgroundColor: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
                    <th style={{ padding: '16px' }}>Customer Name</th>
                    <th style={{ padding: '16px' }}>Code</th>
                    <th style={{ padding: '16px' }}>Email Address</th>
                    <th style={{ padding: '16px' }}>City</th>
                    <th style={{ padding: '16px' }}>Tier</th>
                  </tr>
                </thead>
                <tbody>
                  {customers.map((row, idx) => (
                    <tr key={idx} style={{ borderBottom: '1px solid #f1f5f9' }}>
                      <td style={{ padding: '16px', fontWeight: '600' }}>{row.customerName}</td>
                      <td style={{ padding: '16px' }}>{row.customerCode}</td>
                      <td style={{ padding: '16px' }}>{row.email}</td>
                      <td style={{ padding: '16px' }}>{row.city}</td>
                      <td style={{ padding: '16px' }}><span style={{ padding: '4px 10px', borderRadius: '12px', fontSize: '12px', backgroundColor: '#e0f2fe', color: '#0369a1', fontWeight: '600' }}>{row.membershipLevel}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* RE-ROUTING ENGINE: CONTRACT ENGINE ENTRY LAYOUT FORM */}
        {currentScreen === 'AddContractForm' && (
          <div>
            <h2 style={{ marginBottom: '25px', color: '#111625', fontWeight: '700' }}>➕ Create New Contract</h2>
            <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '16px', boxShadow: '0 8px 24px rgba(0,0,0,0.02)', maxWidth: '700px' }}>
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '6px', fontWeight: '500' }}>Contract Name</label>
                <input type="text" value={formContract.name} onChange={(e) => setFormContract({ ...formContract, name: e.target.value })} style={{ width: '100%', padding: '10px', border: '1px solid #cbd5e1', borderRadius: '8px' }} />
              </div>
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '6px', fontWeight: '500' }}>Customer Name</label>
                <input type="text" value={formContract.client} onChange={(e) => setFormContract({ ...formContract, client: e.target.value })} style={{ width: '100%', padding: '10px', border: '1px solid #cbd5e1', borderRadius: '8px' }} />
              </div>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '6px', fontWeight: '500' }}>Contract Value (₹)</label>
                <input type="text" value={formContract.value} onChange={(e) => setFormContract({ ...formContract, value: e.target.value })} style={{ width: '100%', padding: '10px', border: '1px solid #cbd5e1', borderRadius: '8px' }} />
              </div>
              <div style={{ display: 'flex', gap: '15px', justifyContent: 'flex-end' }}>
                <button onClick={() => setCurrentScreen('Contracts')} style={{ padding: '10px 20px', backgroundColor: '#64748b', color: 'white', border: 'none', borderRadius: '8px' }}>Cancel</button>
                <button onClick={saveNewContract} style={{ padding: '10px 20px', backgroundColor: '#3b82f6', color: 'white', border: 'none', borderRadius: '8px', fontWeight: '600' }}>Save</button>
              </div>
            </div>
          </div>
        )}

        {/* RE-ROUTING ENGINE: CUSTOMER ENGINE ENTRY LAYOUT FORM */}
        {currentScreen === 'AddCustomerForm' && (
          <div>
            <h2 style={{ marginBottom: '25px', color: '#111625', fontWeight: '700' }}>➕ Register New CRM Customer</h2>
            <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '16px', boxShadow: '0 8px 24px rgba(0,0,0,0.02)', maxWidth: '700px' }}>
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '6px', fontWeight: '500' }}>Customer Name</label>
                <input type="text" value={formCustomer.name} onChange={(e) => setFormCustomer({ ...formCustomer, name: e.target.value })} style={{ width: '100%', padding: '10px', border: '1px solid #cbd5e1', borderRadius: '8px' }} />
              </div>
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '6px', fontWeight: '500' }}>Email Address</label>
                <input type="email" value={formCustomer.email} onChange={(e) => setFormCustomer({ ...formCustomer, email: e.target.value })} style={{ width: '100%', padding: '10px', border: '1px solid #cbd5e1', borderRadius: '8px' }} />
              </div>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '6px', fontWeight: '500' }}>City</label>
                <input type="text" value={formCustomer.city} onChange={(e) => setFormCustomer({ ...formCustomer, city: e.target.value })} style={{ width: '100%', padding: '10px', border: '1px solid #cbd5e1', borderRadius: '8px' }} />
              </div>
              <div style={{ display: 'flex', gap: '15px', justifyContent: 'flex-end' }}>
                <button onClick={() => setCurrentScreen('Customers')} style={{ padding: '10px 20px', backgroundColor: '#64748b', color: 'white', border: 'none', borderRadius: '8px' }}>Cancel</button>
                <button onClick={saveNewCustomer} style={{ padding: '10px 20px', backgroundColor: '#3b82f6', color: 'white', border: 'none', borderRadius: '8px', fontWeight: '600' }}>Register</button>
              </div>
            </div>
          </div>
        )}

        {currentScreen === 'Loyalty' && (
          <div>
            <h2 style={{ marginBottom: '5px', color: '#111625', fontWeight: '700' }}>🎁 Loyalty Rewards Management</h2>
            <p style={{ color: '#4b5563', margin: '0 0 25px 0' }}>Configure matrices, point thresholds, and user redemption metrics rules.</p>
            <div style={{ display: 'flex', gap: '15px', marginBottom: '30px', borderBottom: '2px solid #e2e8f0', paddingBottom: '10px' }}>
              {[
                { id: 'Levels', label: '🏆 Membership Levels' },
                { id: 'History', label: '📜 Transactions & History' },
                { id: 'Rewards', label: '✨ Manage Rewards' }
              ].map(tab => (
                <button key={tab.id} onClick={() => setLoyaltyTab(tab.id)} style={{ padding: '10px 20px', border: 'none', borderRadius: '8px', cursor: 'pointer', background: loyaltyTab === tab.id ? '#111625' : 'transparent', color: loyaltyTab === tab.id ? '#fff' : '#475569', fontWeight: '600' }}>{tab.label}</button>
              ))}
            </div>

            {loyaltyTab === 'Levels' && (
              <div style={{ display: 'flex', gap: '25px' }}>
                <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '20px', flex: 1 }}>
                  <h3 style={{ marginTop: 0, marginBottom: '20px' }}>Active Tiers Schema</h3>
                  {membershipLevels.map((lvl, idx) => (
                    <div key={idx} style={{ padding: '14px', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ fontWeight: '600' }}>{lvl.membershipLevel}</span>
                      <span style={{ color: '#059669', fontWeight: '600' }}>Min Pts: {lvl.minimumPoints}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {loyaltyTab === 'History' && (
              <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '20px' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                  <thead>
                    <tr style={{ backgroundColor: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
                      <th style={{ padding: '16px' }}>Customer</th>
                      <th style={{ padding: '16px' }}>Purchased Vol</th>
                      <th style={{ padding: '16px' }}>Earned Points</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loyaltyTransactions.map((row, idx) => (
                      <tr key={idx} style={{ borderBottom: '1px solid #f1f5f9' }}>
                        <td style={{ padding: '16px', fontWeight: '600' }}>{row.customer}</td>
                        <td style={{ padding: '16px' }}>₹{row.purchaseAmount?.toLocaleString()}</td>
                        <td style={{ padding: '16px', color: '#10b981', fontWeight: '600' }}>+{row.earnedPoints} Pts</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {loyaltyTab === 'Rewards' && (
              <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '20px' }}>
                <h3 style={{ marginTop: 0, marginBottom: '20px' }}>Redemption Threshold Mappings</h3>
                {rewards.map((rwd, idx) => (
                  <div key={idx} style={{ padding: '14px', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontWeight: '600' }}>{rwd.rewardName}</span>
                    <span style={{ color: '#4f46e5', fontWeight: '600' }}>{rwd.requiredPoints} pts</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {currentScreen === 'Inventory' && (
          <div>
            <h2 style={{ marginBottom: '20px', color: '#111625', fontWeight: '700' }}>📦 Inventory Control Room</h2>
            <div style={{ display: 'flex', gap: '25px', marginBottom: '35px' }}>
              {[
                { label: 'Total Products SKU', val: '10', color: '#3b82f6' },
                { label: 'Total Stock Available', val: '150', color: '#10b981' },
                { label: 'Low Stock Constraints', val: '2', color: '#ef4444' }
              ].map((box, i) => (
                <div key={i} style={{ flex: 1, backgroundColor: 'white', padding: '25px', borderRadius: '16px', borderLeft: `5px solid ${box.color}`, textAlign: 'center' }}>
                  <span style={{ fontSize: '14px', color: '#6b7280', fontWeight: '500' }}>{box.label}</span>
                  <div style={{ fontSize: '26px', fontWeight: '700', color: '#111625', marginTop: '6px' }}>{box.val}</div>
                </div>
              ))}
            </div>
            <div style={{ backgroundColor: 'white', padding: '25px', borderRadius: '16px' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid #e2e8f0' }}>
                    <th style={{ padding: '12px' }}>Product</th>
                    <th style={{ padding: '12px' }}>Warehouse</th>
                    <th style={{ padding: '12px' }}>Qty</th>
                  </tr>
                </thead>
                <tbody>
                  {inventory.map((row, idx) => (
                    <tr key={idx} style={{ borderBottom: '1px solid #f1f5f9' }}>
                      <td style={{ padding: '12px', fontWeight: '600' }}>{row.productName}</td>
                      <td style={{ padding: '12px', color: '#4b5563' }}>{row.warehouse}</td>
                      <td style={{ padding: '12px', color: row.availableQty <= 10 ? '#ef4444' : '#111625', fontWeight: '700' }}>{row.availableQty}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default App;