import { useState } from 'react';
import axios from 'axios';

function App() {
  const [code, setCode] = useState('');
  const [lang, setLang] = useState('python');
  const [img, setImg] = useState('');
  // const process.env.REACT_APP_BACKEND_URL = backendURL;


  const generate = async () => {
    if (!code.trim()) {
      alert('Code cannot be blank!');
      return;
    }

    try {
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/execute`, { code, lang });
      setImg(`${process.env.REACT_APP_BACKEND_URL}/output/visualization.png?t=${Date.now()}`);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        alert(error.response.data.message);
      } else {
        alert('Something went wrong!');
      }
    }
  }

  return (
    <div style={{
      padding: '20px',
      fontFamily: 'Arial, sans-serif',
      background: 'linear-gradient(to right, #e0f7fa, #ffffff)',
      minHeight: '100vh'
    }}>
      <h1 style={{ textAlign: 'center', color: '#2c3e50', fontSize: '2.5rem' }}>
        LangViz - Language Agnostic Visualization App
      </h1>

      <div style={{
        maxWidth: '800px',
        margin: 'auto',
        padding: '20px',
        backgroundColor: 'white',
        borderRadius: '10px',
        boxShadow: '0 0 10px rgba(0,0,0,0.1)'
      }}>
        <label style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>Choose Language:</label>
        <select onChange={(e) => setLang(e.target.value)} style={{ marginLeft: '10px', padding: '5px', fontSize: '1rem' }}>
          <option value="python">Python</option>
          <option value="r">R</option>
        </select>

        <textarea
          rows="10"
          cols="80"
          placeholder="Write your Python or R code here..."
          style={{
            width: '100%',
            marginTop: '20px',
            padding: '10px',
            fontSize: '1rem',
            borderRadius: '5px',
            border: '1px solid #ccc'
          }}
          onChange={(e) => setCode(e.target.value)}
        />

        <button
          onClick={generate}
          style={{
            marginTop: '15px',
            padding: '10px 20px',
            fontSize: '1rem',
            backgroundColor: '#2c3e50',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Generate Visualization
        </button>

        {img && (
          <div style={{ marginTop: '30px', textAlign: 'center' }}>
            <h2 style={{ color: '#2c3e50' }}>Generated Visualization</h2>
            <div style={{
              border: '1px solid #ddd',
              padding: '15px',
              borderRadius: '10px',
              backgroundColor: '#f9f9f9',
              display: 'inline-block'
            }}>
              <img src={img} alt="Visualization" style={{ maxWidth: '100%', borderRadius: '5px' }} />
            </div>
          </div>
        )}
      </div>

      <footer style={{ marginTop: '30px', textAlign: 'center', color: '#555' }}>
        Built with ❤️ using Python, R & React
      </footer>
    </div>
  );
}

export default App;
