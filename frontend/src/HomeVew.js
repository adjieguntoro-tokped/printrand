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
      <button onClick={handleGenerate}>Generate</button>
    </div>
  );

  if(loading) {
    return <div>Please wait ...</div>;
  }

  if(!data){ 
    return renderGenerate();
  }

  console.log('data', data);

  const { alphabetical, alphanumeric, real, integer, file } = data;


  const renderLink = () => data ? (
    <div>
      Link:
      <a href={file} target="_blank">download here!</a>
    </div>
  ) : null;

  const renderReport = () => (
    <div>
      <button onClick={handleShowReport}>Report</button>
      <div>
        {showReport ? (
          <ul>
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
    <div>
      {renderGenerate()}
      {renderLink()}
      {renderReport()}
    </div>
  );
};

export default HomeView;
