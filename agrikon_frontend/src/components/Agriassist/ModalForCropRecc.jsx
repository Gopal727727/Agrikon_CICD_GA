import React, { useState, useEffect } from 'react';
import '../../css/modal.css';
import { Link } from 'react-router-dom';
import OpenAI from 'openai';
import { ClipLoader } from "react-spinners";

function ModalForCropRecc({ cropDetails }) {
  const [selectedOption, setSelectedOption] = useState(5); // Default to 5
  const [selectedSort, setSelectedSort] = useState('Best Crop'); // Default to Best Crop
  const soil_details = JSON.stringify(cropDetails, null, 2);

  //chatgpt text generation for table
  const prompt = `${soil_details} These are the details of my soil. Provide a JSON with two objects: 'BestCrops' and 'WorstCrops'. Each object should contain 3 sets. Each set should include the following fields:
- 'cropname': The name of the crop.
- 'suitability': The suitability of the crop for the soil.
- 'BestMoistureLevel': The best moisture level for the crop.
- 'Tips': Tips for growing the crop.
- 'CropImage': A URL to an image of the crop.
- 'LinkToRelatedArticle': A link to a related article for further information.
  Please ensure that the crop images are URLs from the internet are working.`;

  

  const [response, setResponse] = useState('');
  const [jsondata, setJsondata] = useState(null);

  const client = new OpenAI({
    apiKey:import.meta.env.VITE_CHATGPT_API_KEY,
    dangerouslyAllowBrowser: true
  });

  const GetResponse = async () => {
    try {
      const chatCompletion = await client.chat.completions.create({
        messages: [{ role: 'user', content: prompt }],
        model: 'gpt-4o-mini',
      });

      const responseText = chatCompletion.choices[0].message.content;
      setResponse(responseText);

      // Extract JSON from response and set it to jsondata
      const extractedJson = extractJson(responseText);
      if (extractedJson) {
        setJsondata(extractedJson);
      }
    } catch (error) {
      console.error('Error fetching OpenAI response:', error);
    }
  };

  useEffect(() => {
    GetResponse();
  }, []);

  // Function to extract JSON from response text
  //Regular Expression-Based Parsing Algorithm
  const extractJson = (text) => {
    const jsonRegex = /```json\s*({.*})\s*```/s; // Regex to match the JSON part
    const match = text.match(jsonRegex);
    if (match && match[1]) {
      try {
        return JSON.parse(match[1]);
      } catch (error) {
        console.error('Error parsing JSON:', error);
        return null;
      }
    }
    return null;
  };

  // Wait for jsondata to be set before rendering the table
  if (!jsondata) {
    return (
      <div className="modal-container border-1 border-dark p-4">
        <h3 className="mx-auto text-dark">Asking AI, please wait...</h3>
        <ClipLoader color="#4AA760" size={100} className='mt-4' />
      </div>
    );
  }

  const bestCrops = jsondata.BestCrops.map(crop => ({
    cropName: crop.cropname,
    suitability: crop.suitability,
    moistureLevel: crop.BestMoistureLevel,
    tips: crop.Tips,
    image: crop.CropImage,
    link: crop.LinkToRelatedArticle
  }));

  const worstCrops = jsondata.WorstCrops.map(crop => ({
    cropName: crop.cropname,
    suitability: crop.suitability,
    moistureLevel: crop.BestMoistureLevel,
    tips: crop.Tips,
    image: crop.CropImage,
    link: crop.LinkToRelatedArticle
  }));

  const cropsToDisplay = selectedSort === 'Best Crop' ? bestCrops : worstCrops;

  return (
    <div className="modal-container border-1 border-dark p-4">
      {/* Top section */}
      <div className="d-flex justify-content-between align-items-center">
        <div className="d-flex me-3">
          <label><b>Show</b></label>
          <select
            className="form-select ms-2"
            style={{ width: '60px', fontSize: '14px', backgroundColor: '#D9D9D9' }}
            value={selectedOption}
            onChange={(e) => setSelectedOption(e.target.value)}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
          </select>
        </div>
        <div className="d-flex ml-2">
          <label><b>Sort By</b></label>
          <select
            className="form-select ms-2"
            style={{ width: '120px', fontSize: '14px', color: '#9c9c9c' }}
            value={selectedSort}
            onChange={(e) => setSelectedSort(e.target.value)}
          >
            <option value="Best Crop">Best Crop</option>
            <option value="Worst Crop">Worst Crop</option>
          </select>
        </div>
        <h3 className="mx-auto text-dark">Crop Suggestions</h3>
        <div className="d-flex align-items-center">
          <button className="btn" style={{ backgroundColor: '#B641D6', color: 'white', borderRadius: '10px' }}>
            <Link className='text-decoration-none text-white' to='/AgriAssistance'>Ask AI</Link>
          </button>
        </div>
      </div>
      <hr style={{ borderColor: 'black' }} />
      
      {/* Table section */}
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th>Crop Name</th>
              <th>Suitability</th>
              <th>Best Moisture Level</th>
              <th>Tips</th>
              <th>Learn More</th>
            </tr>
          </thead>
          <tbody>
          {cropsToDisplay.slice(0, selectedOption).map((crop, index) => (
          <tr key={index}>
            <td className='custom-row-bg'>{crop.cropName}</td>
            <td className='custom-row-bg'>{crop.suitability}</td>
            <td className='custom-row-bg'>{crop.moistureLevel}</td>
            <td className='custom-row-bg'>{crop.tips}</td>
            <td className='custom-row-bg'>

              <button
                className="btn"
                style={{
                  backgroundColor: '#FF8418',
                  color: 'white',
                  borderRadius: '10px', 
                  width: '150px',
                  height: '40px'
                }}
              >
                <a 
                  href={`https://www.google.com/search?q=${encodeURIComponent(crop.cropName + " farming tips and suggestions")}`} 
                  target='_blank' 
                  className='text-decoration-none text-white'
                >
                  Learn More
                </a>
              </button>
            </td>
          </tr>
        ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ModalForCropRecc;
