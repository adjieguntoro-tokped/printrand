import { useState } from 'react'; 

const HomeView = () => {

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showReport, setShowReport] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    setShowReport(false);

    const res = await fetch('http://localhost:3001/generate');
    const body = await res.json();

    setData(body);
    setLoading(false);
    //{"alphabetical":4,"alphanumeric":4,"real":6,"integer":4,"file":""}
  };

  const handleShowReport = () => {
    setShowReport(v => !v);
  }

  const renderGenerate = () => (
    <div>
      <button style={{
        padding: '8px 12px',
        margin: '8px',
      }} onClick={handleGenerate}>Generate</button>
    </div>
  );

  if(loading) {
    return (
    <div style={{
      padding: '8px 12px',
      margin: '8px',
    }}>
      Waiting for magic!!
    </div>
    );
  }

  if(!data){ 
    return renderGenerate();
  }

  const { alphabetical, alphanumeric, real, integer, file } = data;


  const renderLink = () => data ? (
    <span style={{
      padding: '8px 2px',
      margin: '12px 8px',
    }}>
      Link:
      <a href={file} target="_blank">download here!</a>
    </span>
  ) : null;

  const renderReport = () => (
    <div style={{
      marginTop: '8px'
    }}>
      <button style={{
        padding: '8px 12px',
        margin: '8px',
      }} onClick={handleShowReport}>{showReport ? 'Close' : 'Open'} Report</button>
      <div>
        {showReport ? (
          <ul style={{
            listStyle: 'none',
            textAlign: 'left',
            paddingLeft: '8px',
          }}>
            <li>Alphabetical string: {alphabetical}</li>
            <li>Real numbers: {real}</li>
            <li>Integers: {integer}</li>
            <li>Alphanumeric: {alphanumeric}</li>
          </ul>
        ) : null}
      </div>
    </div>
  );

  return (
    <div className="container">
      {renderGenerate()}
      {renderLink()}
      {renderReport()}
    </div>
  );
};

export default HomeView;
