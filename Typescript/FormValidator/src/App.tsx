import React, { useState } from 'react';
import './App.css';

interface IFormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface IErrors {
  username?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

function App() {
  const [formData, setFormData] = useState<IFormData>({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState<IErrors>({});

  const [tableData, setTableData] = useState<IFormData[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validateForm(formData);
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // Form submission logic here
      console.log('Form submitted successfully!');
    } else {
      console.log('Form submission failed due to validation errors.');
    }

    const isDuplicate = tableData.some(
      (data) =>
        data.username === formData.username &&
        data.email === formData.email &&
        data.password === formData.password
    );

    if(isDuplicate)  { 
      alert("Duplicate entry");
       return; }

    setTableData([...tableData, formData]);

    setFormData({ username: '', email: "", password: "", confirmPassword:"" });
  };

  const validateForm = (data: IFormData) => {
    const errors: IErrors = {};

    if (!data.username.trim()) {
      errors.username = 'Username is required';
    } else if (data.username.length < 4) {
      errors.username = 'Username must be at least 4 characters long';
    }

    if (!data.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      errors.email = 'Email is invalid';
    }

    if (!data.password) {
      errors.password = 'Password is required';
    } else if (data.password.length < 8) {
      errors.password = 'Password must be at least 8 characters long';
    }

    if (data.confirmPassword !== data.password) {
      errors.confirmPassword = 'Passwords do not match';
    }

    return errors;
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Form Validation</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label className="form-label">Username:</label>
          <input
            className="form-input"
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
          {errors.username && <span className="error-message">{errors.username}</span>}
        </div>
        <div>
          <label className="form-label">Email:</label>
          <input
            className="form-input"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <span className="error-message">{errors.email}</span>}
        </div>
        <div>
          <label className="form-label">Password:</label>
          <input
            className="form-input"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && <span className="error-message">{errors.password}</span>}
        </div>
        <div>
          <label className="form-label">Confirm Password:</label>
          <input
            className="form-input"
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
        </div>
        <button className="submit-button" type="submit">
          Submit
        </button>
      </form>

      <h2>Submitted Data:</h2>
      <table border={1}>
        <thead>
          <tr>
            <th>UserName</th>
            <th>Email</th>
            <th>Password</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((data, index) => (
            <tr key={index}>
              <td>{data.username}</td>
              <td>{data.email}</td>
              <td>{data.password}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
