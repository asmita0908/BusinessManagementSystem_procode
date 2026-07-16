import React, { useState } from 'react';
import './App.css';

function App() {
  const [currentScreen, setCurrentScreen] = useState('Login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loggedInUser, setLoggedInUser] = useState({ name: 'Guest', role: 'Viewer' }); // Naya Dynamic State

  // Search Engine Queries Mappings
  const [searchContract, setSearchContract] = useState('');
  const [searchCustomer, setSearchCustomer] = useState('');
  const [loyaltyTab, setLoyaltyTab] = useState('Levels');

  // Exact 10 Dataverse Records
  const [contracts, setContracts] = useState([
    { contractName: "Dell Supply", contractNumber: "CN1001", customer: "Raj Enterprises", vendor: "Dell India", contractType: "Supply Contract", startDate: "2026-01-01", endDate: "2026-12-31", contractValue: 500000, contractStatus: "Active", approvalStatus: "Approved", renewalRequired: "Yes" },
    { contractName: "HP Service", contractNumber: "CN1002", customer: "ABC Pvt Ltd", vendor: "HP India", contractType: "Service Contract", startDate: "2025-01-10", endDate: "2025-11-30", contractValue: 200000, contractStatus: "Expired", approvalStatus: "Approved", renewalRequired: "Yes" },
    { contractName: "Lenovo Rental", contractNumber: "CN1003", customer: "Sharma Traders", vendor: "Lenovo India", contractType: "Rental Contract", startDate: "2026-01-15", endDate: "2026-07-15", contractValue: 150000, contractStatus: "Inactive", approvalStatus: "Pending Approval", renewalRequired: "Yes" },
    { contractName: "Acer Enterprise", contractNumber: "CN1004", customer: "Tech Solutions", vendor: "Acer India", contractType: "Enterprise Contract", startDate: "2026-01-20", endDate: "2027-01-20", contractValue: 1000000, contractStatus: "Active", approvalStatus: "Approved", renewalRequired: "Yes" },
    { contractName: "Asus Annual", contractNumber: "CN1005", customer: "Bright Ltd", vendor: "Asus India", contractType: "Annual Contract", startDate: "2026-02-01", endDate: "2027-01-31", contractValue: 400000, contractStatus: "Active", approvalStatus: "Approved", renewalRequired: "Yes" },
    { contractName: "Canon Service", contractNumber: "CN1006", customer: "Vision Corp", vendor: "Canon India", contractType: "Service Contract", startDate: "2026-02-05", endDate: "2027-02-04", contractValue: 220000, contractStatus: "Inactive", approvalStatus: "Pending Approval", renewalRequired: "Yes" },
    { contractName: "Epson Supply", contractNumber: "CN1007", customer: "Global India", vendor: "Epson India", contractType: "Supply Contract", startDate: "2026-02-10", endDate: "2027-02-09", contractValue: 350000, contractStatus: "Active", approvalStatus: "Approved", renewalRequired: "Yes" },
    { contractName: "Logitech Contract", contractNumber: "CN1008", customer: "Smart Systems", vendor: "Logitech India", contractType: "Premium Contract", startDate: "2026-02-15", endDate: "2027-02-14", contractValue: 600000, contractStatus: "Active", approvalStatus: "Approved", renewalRequired: "Yes" },
    { contractName: "Samsung Contract", contractNumber: "CN1009", customer: "Apex Ltd", vendor: "Samsung India", contractType: "Enterprise Contract", startDate: "2026-02-20", endDate: "2027-02-19", contractValue: 800000, contractStatus: "Inactive", approvalStatus: "Pending Approval", renewalRequired: "Yes" },
    { contractName: "LG Contract", contractNumber: "CN1010", customer: "Future Tech", vendor: "LG India", contractType: "Annual Contract", startDate: "2026-02-25", endDate: "2027-02-24", contractValue: 700000, contractStatus: "Active", approvalStatus: "Approved", renewalRequired: "Yes" }
  ]);

  const [customers, setCustomers] = useState([
    { customerName: "Raj Enterprises", customerCode: "C001", email: "raj@gmail.com", phone: "9000000001", address: "MP Nagar", city: "Bhopal", country: "India", membershipLevel: "Gold", status: "Active" },
    { customerName: "ABC Pvt Ltd", customerCode: "C002", email: "abc@gmail.com", phone: "9000000002", address: "Vijay Nagar", city: "Indore", country: "India", membershipLevel: "Silver", status: "Active" },
    { customerName: "Sharma Traders", customerCode: "C003", email: "sharma@gmail.com", phone: "9000000003", address: "Connaught Place", city: "Delhi", country: "India", membershipLevel: "Platinum", status: "Active" },
    { customerName: "Tech Solutions", customerCode: "C004", email: "tech@gmail.com", phone: "9000000004", address: "Andheri", city: "Mumbai", country: "India", membershipLevel: "Gold", status: "Active" },
    { customerName: "Bright Ltd", customerCode: "C005", email: "bright@gmail.com", phone: "9000000005", address: "Baner", city: "Pune", country: "India", membershipLevel: "Silver", status: "Active" },
    { customerName: "Vision Corp", customerCode: "C006", email: "vision@gmail.com", phone: "9000000006", address: "MP Nagar", city: "Bhopal", country: "India", membershipLevel: "Gold", status: "Active" },
    { customerName: "Global India", customerCode: "C007", email: "global@gmail.com", phone: "9000000007", address: "Ring Road", city: "Indore", country: "India", membershipLevel: "Platinum", status: "Active" },
    { customerName: "Smart Systems", customerCode: "C008", email: "smart@gmail.com", phone: "9000000008", address: "Rohini", city: "Delhi", country: "India", membershipLevel: "Gold", status: "Active" },
    { customerName: "Apex Ltd", customerCode: "C009", email: "apex@gmail.com", phone: "9000000009", address: "Powai", city: "Mumbai", country: "India", membershipLevel: "Silver", status: "Active" },
    { customerName: "Future Tech", customerCode: "C010", email: "future@gmail.com", phone: "9000000010", address: "Hinjewadi", city: "Pune", country: "India", membershipLevel: "Platinum", status: "Active" }
  ]);

  const [loyaltyTransactions, setLoyaltyTransactions] = useState([
    { customer: "Raj Enterprises", purchaseAmount: 340000, earnedPoints: 3400, remainingPoints: 2900 },
    { customer: "ABC Pvt Ltd", purchaseAmount: 57000, earnedPoints: 570, remainingPoints: 570 },
    { customer: "Sharma Traders", purchaseAmount: 114000, earnedPoints: 1140, remainingPoints: 140 }
  ]);

  // Form parameters
  const [formContract, setFormContract] = useState({ name: '', number: '', title: '', value: '', start: '', end: '', customer: 'Raj Enterprises' });
  const [formCustomer, setFormCustomer] = useState({ name: '', code: '', email: '', phone: '', address: '', city: '', country: 'India', level: 'Gold' });

  // Safe Filter Search Parsers
  const filteredContracts = (contracts || []).filter(c => c.customer && c.customer.toLowerCase().includes(searchContract.toLowerCase()));
  const filteredCustomers = (customers || []).filter(cust => cust.customerName && cust.customerName.toLowerCase().includes(searchCustomer.toLowerCase()));

  // Safe Dynamic Count Mappings for Expiry Alerts
  const expiredContractsCount = (contracts || []).filter(c => c.contractStatus === "Expired").length;

  const handleLogin = (e) => {
    e.preventDefault();

    // Dynamic User Mapper matrix
    if (email.toLowerCase().includes('priya')) {
      setLoggedInUser({ name: 'Priya Singh', role: 'Contract Manager' });
    } else if (email.toLowerCase().includes('aman')) {
      setLoggedInUser({ name: 'Aman Verma', role: 'Inventory Manager' });
    } else if (email.toLowerCase().includes('neha')) {
      setLoggedInUser({ name: 'Neha Patel', role: 'Sales Executive' });
    } else if (email.toLowerCase().includes('rahul')) {
      setLoggedInUser({ name: 'Rahul Sharma', role: 'Admin/Manager' });
    } else {
      setLoggedInUser({ name: 'Asmita Baghsavar', role: 'System Admin' }); // Default fallback profile
    }

    setCurrentScreen('Dashboard');
  };
  const saveNewContract = () => {
    if (!formContract.name || !formContract.customer) {
      alert("Please fill out required fields.");
      return;
    }
    const record = {
      contractName: formContract.name,
      contractNumber: formContract.number || `CN${1000 + contracts.length + 1}`,
      customer: formContract.customer,
      vendor: "Dell India",
      contractType: "Supply Contract",
      startDate: formContract.start || "2026-01-01",
      endDate: formContract.end || "2026-12-31",
      contractValue: parseInt(formContract.value) || 250000,
      contractStatus: "Inactive",
      approvalStatus: "Pending Approval",
      renewalRequired: "Yes"
    };
    setContracts([record, ...contracts]);
    alert("Contract added permanently! Sent to Manager dashboard queue as 'Pending Approval'.");
    setFormContract({ name: '', number: '', title: '', value: '', start: '', end: '', customer: 'Raj Enterprises' });
    setCurrentScreen('Contracts');
  };

  const saveNewCustomer = () => {
    if (!formCustomer.name || !formCustomer.email) {
      alert("Configuration keys required.");
      return;
    }
    const record = {
      customerName: formCustomer.name,
      customerCode: formCustomer.code || `C0${customers.length + 1}`,
      email: formCustomer.email,
      phone: formCustomer.phone || "9876543210",
      address: formCustomer.address || "Hub Center",
      city: formCustomer.city || "Indore",
      country: formCustomer.country,
      membershipLevel: formCustomer.level,
      status: "Active"
    };
    setCustomers([record, ...customers]);
    setFormCustomer({ name: '', code: '', email: '', phone: '', address: '', city: '', country: 'India', level: 'Gold' });
    setCurrentScreen('Customers');
  };

  const handleWorkflowAction = (index, targetStatus) => {
    const updated = [...contracts];
    updated[index].approvalStatus = targetStatus;
    if (targetStatus === 'Approved') {
      updated[index].contractStatus = 'Active';
    } else if (targetStatus === 'Rejected') {
      updated[index].contractStatus = 'Inactive';
    }
    setContracts(updated);
    alert(`Contract workflow successfully state-locked to: ${targetStatus}`);
  };

  return (
    <div className="app-container" style={{ display: 'flex', height: '100vh', margin: 0, backgroundColor: '#f0f4fa' }}>

      {currentScreen !== 'Login' && (
        <div className="sidebar" style={{ width: '260px', backgroundColor: '#111625', color: 'white', padding: '20px', display: 'flex', flexDirection: 'column' }}>
          <h2 style={{ fontSize: '22px', borderBottom: '1px solid #232a3d', paddingBottom: '15px', marginTop: 0, color: '#ffffff' }}>⚡ BMS Portal</h2>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, flexGrow: 1 }}>
            {[
              { id: 'Dashboard', label: 'Dashboard', icon: '📊' },
              { id: 'Contracts', label: 'Contracts', icon: '📄' },
              { id: 'Customers', label: 'Customers', icon: '👥' },
              { id: 'Loyalty', label: 'Loyalty Program', icon: '🎁' }
            ].map((item) => (
              <li key={item.id} onClick={() => setCurrentScreen(item.id)} style={{ padding: '12px 15px', cursor: 'pointer', borderRadius: '8px', margin: '6px 0', display: 'flex', alignItems: 'center', gap: '12px', backgroundColor: currentScreen === item.id ? '#1b2336' : 'transparent', color: currentScreen === item.id ? '#3b82f6' : '#9ca3af', fontWeight: '500' }}>
                <span>{item.icon}</span>{item.label}
              </li>
            ))}
          </ul>
          <div style={{ padding: '10px', background: '#1e293b', borderRadius: '8px', marginBottom: '15px', fontSize: '13px', color: '#94a3b8' }}>
            👤 User: <strong>{loggedInUser.name}</strong> <br />
            <span style={{ fontSize: '11px', color: '#3b82f6' }}>🛡️ Role: {loggedInUser.role}</span>
          </div>
          <button onClick={() => setCurrentScreen('Login')} style={{ background: '#d9534f', color: 'white', border: 'none', padding: '12px', borderRadius: '6px', cursor: 'pointer', fontWeight: '600' }}>Log Out</button>
        </div>
      )}

      <div style={{ flex: 1, padding: currentScreen === 'Login' ? 0 : '40px', overflowY: 'auto' }}>

        {currentScreen !== 'Login' && expiredContractsCount > 0 && (
          <div style={{ background: '#fef2f2', border: '1px solid #fca5a5', padding: '12px 20px', borderRadius: '12px', marginBottom: '25px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ color: '#991b1b', fontWeight: '600', fontSize: '14px' }}>
              ⚠️ Critical Alert: {expiredContractsCount} Contract(s) have reached maturity expiration and require urgent renewal routing review!
            </span>
            <button onClick={() => setCurrentScreen('Contracts')} style={{ background: '#dc2626', color: 'white', border: 'none', padding: '6px 14px', borderRadius: '6px', fontSize: '12px', fontWeight: '600', cursor: 'pointer' }}>Review Now</button>
          </div>
        )}

        {currentScreen === 'Login' && (
          <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ display: 'flex', maxWidth: '850px', width: '100%', backgroundColor: 'white', borderRadius: '16px', boxShadow: '0 12px 32px rgba(0,0,0,0.05)', height: '460px' }}>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px', background: 'linear-gradient(135deg, #e0ebf8 0%, #cbdff7 100%)', borderRadius: '16px 0 0 16px' }}>
                <div style={{ fontSize: '70px' }}>🛡️</div>
                <h2 style={{ color: '#111625', margin: '10px 0', fontSize: '24px', fontWeight: '700' }}>Business Management</h2>
              </div>
              <div style={{ flex: 1, padding: '50px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <h3 style={{ margin: '0 0 20px 0', fontSize: '22px' }}>Welcome Back!</h3>
                <form onSubmit={handleLogin}>
                  <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required style={{ width: '100%', padding: '12px', marginBottom: '15px', border: '1px solid #d1d5db', borderRadius: '8px' }} />
                  <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required style={{ width: '100%', padding: '12px', marginBottom: '20px', border: '1px solid #d1d5db', borderRadius: '8px' }} />
                  <button type="submit" style={{ width: '100%', padding: '12px', background: '#2b354a', color: 'white', border: 'none', borderRadius: '8px', fontWeight: '600', cursor: 'pointer' }}>Sign In</button>
                </form>
              </div>
            </div>
          </div>
        )}

        {currentScreen === 'Dashboard' && (
          <div>
            <h2 style={{ color: '#111625', fontWeight: '700' }}>Dashboard Overview 👋</h2>
            <div style={{ display: 'flex', gap: '25px', marginTop: '30px' }}>
              {[
                { title: 'Contract Management', desc: 'Total Contracts Mapped: 10 Records Live.', border: '#3b82f6', target: 'Contracts' },
                { title: 'Customer Loyalty', desc: 'Active Loyalty Matrix Configuration Framework.', border: '#10b981', target: 'Loyalty' },
                { title: 'CRM Framework', desc: '10 Enterprise Accounts Fully Configured.', border: '#f97316', target: 'Customers' }
              ].map((mod, i) => (
                <div key={i} style={{ backgroundColor: 'white', padding: '30px', flex: 1, borderRadius: '16px', borderTop: `4px solid ${mod.border}`, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '160px' }}>
                  <div>
                    <h3 style={{ margin: '0 0 8px 0', color: '#111625' }}>{mod.title}</h3>
                    <p style={{ color: '#6b7280', fontSize: '14px' }}>{mod.desc}</p>
                  </div>
                  <button onClick={() => setCurrentScreen(mod.target)} style={{ background: mod.border, color: 'white', border: 'none', padding: '10px 16px', borderRadius: '8px', fontWeight: '600', width: 'fit-content', cursor: 'pointer' }}>Open Module</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {currentScreen === 'Contracts' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
              <h2 style={{ margin: 0, color: '#111625', fontWeight: '700' }}>Contracts Master Grid ({filteredContracts.length})</h2>
              <button onClick={() => setCurrentScreen('AddContractForm')} style={{ background: '#3b82f6', color: 'white', border: 'none', padding: '10px 18px', borderRadius: '8px', fontWeight: '600', cursor: 'pointer' }}>+ New Contract</button>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <input type="text" placeholder="🔍 Search by Client Name..." value={searchContract} onChange={(e) => setSearchContract(e.target.value)} style={{ width: '100%', maxWidth: '400px', padding: '10px 15px', border: '1px solid #cbd5e1', borderRadius: '8px', background: '#ffffff' }} />
            </div>

            <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '20px', maxHeight: '460px', overflowY: 'auto', boxAnatomy: 'none' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ backgroundColor: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
                    <th style={{ padding: '16px' }}>Contract Name</th>
                    <th style={{ padding: '16px' }}>Customer Name</th>
                    <th style={{ padding: '16px' }}>Lifecycle Status</th>
                    <th style={{ padding: '16px' }}>End Date</th>
                    <th style={{ padding: '16px' }}>Approval State</th>
                    <th style={{ padding: '16px', textAlign: 'center' }}>Workflow Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredContracts.map((row, idx) => (
                    <tr key={idx} style={{ borderBottom: '1px solid #f1f5f9' }}>
                      <td style={{ padding: '16px', fontWeight: '600' }}>{row.contractName}</td>
                      <td style={{ padding: '16px' }}>{row.customer}</td>
                      <td style={{ padding: '16px' }}>
                        <span style={{ padding: '4px 10px', borderRadius: '12px', fontSize: '11px', fontWeight: '700', backgroundColor: row.contractStatus === 'Expired' ? '#fee2e2' : row.contractStatus === 'Active' ? '#dcfce7' : '#f1f5f9', color: row.contractStatus === 'Expired' ? '#ef4444' : row.contractStatus === 'Active' ? '#16a34a' : '#64748b' }}>
                          {row.contractStatus}
                        </span>
                      </td>
                      <td style={{ padding: '16px', color: '#64748b' }}>{row.endDate}</td>
                      <td style={{ padding: '16px' }}>
                        <span style={{ padding: '4px 10px', borderRadius: '12px', fontSize: '12px', fontWeight: '600', backgroundColor: row.approvalStatus === 'Pending Approval' ? '#fef3c7' : row.approvalStatus === 'Rejected' ? '#fee2e2' : '#dcfce7', color: row.approvalStatus === 'Pending Approval' ? '#b45309' : row.approvalStatus === 'Rejected' ? '#b91c1c' : '#15803d' }}>
                          {row.approvalStatus}
                        </span>
                      </td>
                      <td style={{ padding: '16px', textAlign: 'center' }}>
                        {row.approvalStatus === 'Pending Approval' ? (
                          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
                            <button onClick={() => handleWorkflowAction(idx, 'Approved')} style={{ background: '#10b981', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '6px', fontSize: '12px', cursor: 'pointer', fontWeight: '600' }}>Approve ✅</button>
                            <button onClick={() => handleWorkflowAction(idx, 'Rejected')} style={{ background: '#ef4444', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '6px', fontSize: '12px', cursor: 'pointer', fontWeight: '600' }}>Reject ❌</button>
                          </div>
                        ) : (
                          <span style={{ color: '#94a3b8', fontSize: '13px', fontWeight: '500' }}>Action Synced</span>
                        )}
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
              <h2 style={{ margin: 0, color: '#111625', fontWeight: '700' }}>Real-Time CRM Customers ({filteredCustomers.length})</h2>
              <button onClick={() => setCurrentScreen('AddCustomerForm')} style={{ background: '#3b82f6', color: 'white', border: 'none', padding: '10px 18px', borderRadius: '8px', fontWeight: '600', cursor: 'pointer' }}>+ New Customer</button>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <input type="text" placeholder="🔍 Search Customer Name..." value={searchCustomer} onChange={(e) => setSearchCustomer(e.target.value)} style={{ width: '100%', maxWidth: '400px', padding: '10px 15px', border: '1px solid #cbd5e1', borderRadius: '8px', background: '#ffffff' }} />
            </div>

            <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '20px', maxHeight: '460px', overflowY: 'auto' }}>
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
                  {filteredCustomers.map((row, idx) => (
                    <tr key={idx} style={{ borderBottom: '1px solid #f1f5f9' }}>
                      <td style={{ padding: '16px', fontWeight: '600' }}>{row.customerName}</td>
                      <td style={{ padding: '16px', color: '#64748b' }}>{row.customerCode}</td>
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

        {currentScreen === 'Loyalty' && (
          <div>
            <h2 style={{ color: '#111625', fontWeight: '700', marginBottom: '5px' }}>🏆 Customer Loyalty Dashboard</h2>
            <p style={{ color: '#4b5563', margin: '0 0 25px 0' }}>Configure matrices, point thresholds, and user redemption metrics rules.</p>

            <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
              <div style={{ background: '#e0f2fe', padding: '15px 25px', borderRadius: '12px', flex: 1, textAlign: 'center', fontWeight: '600' }}>Total Members: 10</div>
              <div style={{ background: '#dcfce7', padding: '15px 25px', borderRadius: '12px', flex: 1, textAlign: 'center', fontWeight: '600' }}>Total Rewards: 10</div>
              <div style={{ background: '#f3e8ff', padding: '15px 25px', borderRadius: '12px', flex: 1, textAlign: 'center', fontWeight: '600' }}>Total Points: 9000</div>
            </div>

            <div style={{ display: 'flex', gap: '15px', marginBottom: '25px' }}>
              <button onClick={() => alert("Points successfully allocated!")} style={{ background: '#16a34a', color: 'white', border: 'none', cursor: 'pointer', padding: '8px 16px', borderRadius: '6px', fontWeight: '600' }}>+ Earn Points</button>
              <button onClick={() => alert("Redemption ledger updated!")} style={{ background: '#dc2626', color: 'white', border: 'none', cursor: 'pointer', padding: '8px 16px', borderRadius: '6px', fontWeight: '600' }}>- Redeem Points</button>
            </div>

            <div style={{ display: 'flex', gap: '15px', borderBottom: '2px solid #e2e8f0', paddingBottom: '10px', marginBottom: '20px' }}>
              {['Levels', 'History', 'Rewards'].map(t => (
                <button key={t} onClick={() => setLoyaltyTab(t)} style={{ padding: '8px 16px', border: 'none', borderRadius: '6px', cursor: 'pointer', background: loyaltyTab === t ? '#111625' : 'transparent', color: loyaltyTab === t ? '#fff' : '#475569', fontWeight: '600' }}>{t === 'Levels' ? '🏆 Membership Levels' : t === 'History' ? '📜 Transactions & History' : '✨ Manage Rewards'}</button>
              ))}
            </div>

            <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '20px', maxHeight: '350px', overflowY: 'auto' }}>
              {loyaltyTab === 'Levels' && (
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>
                      <th style={{ padding: '12px' }}>Tier Label</th>
                      <th style={{ padding: '12px' }}>Min Points Trigger</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[['Bronze', 0], ['Silver', 500], ['Gold', 1000], ['Platinum', 2000], ['Diamond', 5000]].map(([lbl, pt], i) => (
                      <tr key={i} style={{ borderBottom: '1px solid #f1f5f9' }}>
                        <td style={{ padding: '12px', fontWeight: '600' }}>{lbl} Member</td>
                        <td style={{ padding: '12px', color: '#16a34a', fontWeight: '700' }}>{pt} Pts</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
              {loyaltyTab === 'History' && (
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                  <thead>
                    <tr style={{ borderBottom: '2px solid #e2e8f0' }}>
                      <th style={{ padding: '12px' }}>Customer Account</th>
                      <th style={{ padding: '12px' }}>Purchased Volume</th>
                      <th style={{ padding: '12px' }}>Earned Points</th>
                      <th style={{ padding: '12px' }}>Remaining Balance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loyaltyTransactions.map((row, idx) => (
                      <tr key={idx} style={{ borderBottom: '1px solid #f1f5f9' }}>
                        <td style={{ padding: '12px', fontWeight: '600' }}>{row.customer}</td>
                        <td style={{ padding: '12px' }}>₹{row.purchaseAmount.toLocaleString()}</td>
                        <td style={{ padding: '12px', color: '#16a34a', fontWeight: '700' }}>+{row.earnedPoints}</td>
                        <td style={{ padding: '12px', fontWeight: '700' }}>{row.remainingPoints} Pts</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
              {loyaltyTab === 'Rewards' && (
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                  <thead>
                    <tr style={{ borderBottom: '2px solid #e2e8f0' }}>
                      <th style={{ padding: '12px' }}>Reward Coupon Item</th>
                      <th style={{ padding: '12px' }}>Threshold Required</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[['₹100 Gift Voucher', 500], ['Shopping Voucher', 1000], ['₹250 Gift Voucher', 1000], ['Free Product Reward', 3000]].map(([item, pts], i) => (
                      <tr key={i} style={{ borderBottom: '1px solid #f1f5f9' }}>
                        <td style={{ padding: '12px', fontWeight: '600' }}>{item}</td>
                        <td style={{ padding: '12px', color: '#4f46e5', fontWeight: '700' }}>{pts} pts</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        )}

        {/* HIGH-FIDELITY CONTRACT FORM */}
        {currentScreen === 'AddContractForm' && (
          <div>
            <h2 style={{ marginBottom: '25px', color: '#111625', fontWeight: '700' }}>➕ Create New Contract</h2>
            <div style={{ backgroundColor: 'white', padding: '35px', borderRadius: '16px', boxShadow: '0 8px 24px rgba(0,0,0,0.02)', maxWidth: '900px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '25px', marginBottom: '20px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Contract Name *</label>
                  <input type="text" value={formContract.name} onChange={(e) => setFormContract({ ...formContract, name: e.target.value })} style={{ width: '100%', padding: '10px', border: '1px solid #cbd5e1', borderRadius: '8px' }} />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Contract Number *</label>
                  <input type="text" value={formContract.number} onChange={(e) => setFormContract({ ...formContract, number: e.target.value })} placeholder="CN1011" style={{ width: '100%', padding: '10px', border: '1px solid #cbd5e1', borderRadius: '8px' }} />
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '25px', marginBottom: '20px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Contract Title</label>
                  <input type="text" value={formContract.title} onChange={(e) => setFormContract({ ...formContract, title: e.target.value })} style={{ width: '100%', padding: '10px', border: '1px solid #cbd5e1', borderRadius: '8px' }} />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Contract Value (₹) *</label>
                  <input type="text" value={formContract.value} onChange={(e) => setFormContract({ ...formContract, value: e.target.value })} style={{ width: '100%', padding: '10px', border: '1px solid #cbd5e1', borderRadius: '8px' }} />
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '25px', marginBottom: '20px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Start Date</label>
                  <input type="date" value={formContract.start} onChange={(e) => setFormContract({ ...formContract, start: e.target.value })} style={{ width: '100%', padding: '10px', border: '1px solid #cbd5e1', borderRadius: '8px' }} />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>End Date</label>
                  <input type="date" value={formContract.end} onChange={(e) => setFormContract({ ...formContract, end: e.target.value })} style={{ width: '100%', padding: '10px', border: '1px solid #cbd5e1', borderRadius: '8px' }} />
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '25px', marginBottom: '30px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Lookup Customer Account *</label>
                  <input type="text" value={formContract.customer} onChange={(e) => setFormContract({ ...formContract, customer: e.target.value })} placeholder="Find Items..." style={{ width: '100%', padding: '10px', border: '1px solid #cbd5e1', borderRadius: '8px' }} />
                </div>
              </div>
              <div style={{ display: 'flex', gap: '15px', justifyContent: 'flex-end' }}>
                <button onClick={saveNewContract} style={{ padding: '12px 24px', backgroundColor: '#3b82f6', color: 'white', border: 'none', borderRadius: '8px', fontWeight: '600', cursor: 'pointer' }}>Save Contract</button>
                <button onClick={() => setCurrentScreen('Contracts')} style={{ padding: '12px 24px', backgroundColor: '#64748b', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>Cancel</button>
              </div>
            </div>
          </div>
        )}

        {/* HIGH-FIDELITY CUSTOMER FORM */}
        {currentScreen === 'AddCustomerForm' && (
          <div>
            <h2 style={{ marginBottom: '25px', color: '#111625', fontWeight: '700' }}>➕ Add / Edit Customer</h2>
            <div style={{ backgroundColor: 'white', padding: '35px', borderRadius: '16px', boxShadow: '0 8px 24px rgba(0,0,0,0.02)', maxWidth: '950px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '25px', marginBottom: '20px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Customer Name *</label>
                  <input type="text" value={formCustomer.name} onChange={(e) => setFormCustomer({ ...formCustomer, name: e.target.value })} style={{ width: '100%', padding: '10px', border: '1px solid #cbd5e1', borderRadius: '8px' }} />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Customer Code</label>
                  <input type="text" value={formCustomer.code} onChange={(e) => setFormCustomer({ ...formCustomer, code: e.target.value })} placeholder="C011" style={{ width: '100%', padding: '10px', border: '1px solid #cbd5e1', borderRadius: '8px' }} />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Email Address *</label>
                  <input type="email" value={formCustomer.email} onChange={(e) => setFormCustomer({ ...formCustomer, email: e.target.value })} style={{ width: '100%', padding: '10px', border: '1px solid #cbd5e1', borderRadius: '8px' }} />
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '25px', marginBottom: '20px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Phone Number</label>
                  <input type="text" value={formCustomer.phone} onChange={(e) => setFormCustomer({ ...formCustomer, phone: e.target.value })} style={{ width: '100%', padding: '10px', border: '1px solid #cbd5e1', borderRadius: '8px' }} />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Address</label>
                  <input type="text" value={formCustomer.address} onChange={(e) => setFormCustomer({ ...formCustomer, address: e.target.value })} style={{ width: '100%', padding: '10px', border: '1px solid #cbd5e1', borderRadius: '8px' }} />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>City</label>
                  <input type="text" value={formCustomer.city} onChange={(e) => setFormCustomer({ ...formCustomer, city: e.target.value })} style={{ width: '100%', padding: '10px', border: '1px solid #cbd5e1', borderRadius: '8px' }} />
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '25px', marginBottom: '30px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Country</label>
                  <input type="text" value={formCustomer.country} onChange={(e) => setFormCustomer({ ...formCustomer, country: e.target.value })} style={{ width: '100%', padding: '10px', border: '1px solid #cbd5e1', borderRadius: '8px' }} />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Membership Level Tier</label>
                  <select value={formCustomer.level} onChange={(e) => setFormCustomer({ ...formCustomer, level: e.target.value })} style={{ width: '100%', padding: '10px', border: '1px solid #cbd5e1', borderRadius: '8px', background: '#f8fafc' }}>
                    <option>Gold</option>
                    <option>Silver</option>
                    <option>Platinum</option>
                    <option>Diamond</option>
                  </select>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '15px', justifyContent: 'flex-end' }}>
                <button onClick={saveNewCustomer} style={{ padding: '12px 24px', backgroundColor: '#3b82f6', color: 'white', border: 'none', borderRadius: '8px', fontWeight: '600', cursor: 'pointer' }}>Save</button>
                <button onClick={() => setCurrentScreen('Customers')} style={{ padding: '12px 24px', backgroundColor: '#64748b', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>Cancel</button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default App;