import 'regenerator-runtime/runtime';
import React, {useState, useEffect } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { marked } from 'marked';
import { ClipLoader } from "react-spinners";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone, faUpload, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import '../../css/agriculturesupport.css'; // Import the CSS file
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import Banner from './Banner';

const Agriculturesupport = () => {
  const [language, setlanguage] = useState('en-US');
  const [supported,setsupported] = useState('')
  const [conversationHistory, setConversationHistory] = useState("");
  const [prompt, setPrompt] = useState(""); 
  const [imgfileName, setimgFileName] = useState('');
  const [question, setquestion] = useState(""); 
  const [textareaKey, setTextareaKey] = useState(0);
  const [result, setResult] = useState(null); 
  const [loading,setloading] = useState(false);
  const [imageloading,setimageloading] = useState(false);
  const [listeningType, setListeningType] = useState(null);
  const [questionresult,setquestionresult] = useState(null);
  const [image, setImage] = useState({
    inlineData: {
      data: "",
      mimeType: "",
    },
  });

   // Gemini AI model declaration
   const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
   const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  //speech-recogition values
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  //function that listen for audio for 15 sec
  const startListening = (type) => {
    setListeningType(type);
    SpeechRecognition.startListening({language});
    setTimeout(() => {
      SpeechRecognition.stopListening();
    }, 15000); 
  };

  //check listening type to set input field values
  useEffect(() => {
    if (!listening && transcript) {
      if (listeningType === 'question') {
        setquestion(transcript); 
      } else if (listeningType === 'prompt') {
        setPrompt(transcript); 
      }
      setListeningType(null); 
    }
  }, [listening, transcript, listeningType]);

  //reset transcript after 10 sec
  useEffect(() => {
    const resetTimer = setTimeout(() => {
      resetTranscript(); 
    }, 10000); 

    return () => clearTimeout(resetTimer); // Clean up the timer on component unmount or change
  }, [transcript, resetTranscript]);


  useEffect(() => {
    if (!browserSupportsSpeechRecognition) {
      setsupported("Browser doesn't support speech recognition.");
    }
  }, []);


  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setimgFileName(selectedFile.name);
    if (selectedFile) {
      convertToBase64(selectedFile);
    }
  };

  const convertToBase64 = (file) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage({
        inlineData: {
          data: reader.result.split(",")[1],
          mimeType: file.type,
        },
      });
    };

    reader.readAsDataURL(file);
  };

  const handleGenerateContent = async () => {
    try {
      setimageloading(true);
      const response = await model.generateContent([prompt+"Give full Response in " +language, image]);
      setResult(marked(response.response.text()));
    } catch (error) {
      console.error("Error checking:", error);
    }
  };


  const handleQuestion = async () => {
    try {
    setloading(true);
    const newPrompt = `${conversationHistory}\nUser: ${question}`; // Include the history in the new prompt
    const response = await model.generateContent(newPrompt+"Give full Response in " +language);
    const newResponse = response.response.text();

    setquestionresult(marked("**Question:** "+question+"\n\n"+newResponse+ "\n\n" + conversationHistory ));
    setConversationHistory((prev) => `${prev}\n\nUser: ${question}\n\nResponse: ${newResponse}`);
    setTextareaKey((prevKey) => prevKey + 1);
    setquestion(null);
    } catch (error) {
      console.error("Error checking:", error);
    }
  };

  useEffect(() => {
    if (questionresult) {
      setloading(false);
    }
  
    if (result) {
      setimageloading(false);
    }
  }, [questionresult, result]);
  
  

  return (
    <div>
      <Banner heading="Agri Assist" />
      <div className="container mt-5 container-custom mt-5 mb-5">
        <h2 className="text-center title">Your Digital Agriculture Support</h2>
        <p className="text-center subtitle">
          Ask questions, scan images, and receive expert insights on agriculture
        </p>
        {supported && <p className='text-center text-danger'>Your {supported}</p>}

        <div className="text-input-section">
      {/* Language Selection */}
      <div className="d-flex justify-content-end align-items-center mb-3">
        <span className="language-selection">Language :</span>
        <select
          className="form-select select-style"
          value={language}
          onChange={(e) => setlanguage(e.target.value)}
        >
          <option value="en-US">English</option>
          <option value="ne-NP">Nepali</option>
        </select>
      </div>

      {/* Content Section */}
      <div className="input-section">
        {loading ? (
          // Loading animation
          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <ClipLoader color="#4AA760" size={50} /> {/* React Spinner */}
            <p style={{ marginTop: '10px', fontSize: '18px', color: '#666' }}>
              Loading, please wait...
            </p>
          </div>
        ) : questionresult ? (
          <div style={{ position: 'relative' }}>
            {/* Close button */}
            <button
              onClick={() => setquestionresult(null)}
              style={{
                position: 'absolute',
                top: '-25px',
                right: '0',
                color: 'red',
                border: 'none',
                width: '20px',
                height: '20px',
                cursor: 'pointer',
                fontSize: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              aria-label="Close"
            >
              X
            </button>

            {/* Content div with a scroll bar and max height */}
            <div
              style={{
                overflowY: 'auto',
                lineHeight: '1.5',
                textAlign: 'justify',
                maxHeight: '350px',
                padding: '10px',
                border: '1px solid #ccc',
                borderRadius: '4px',
                backgroundColor: '#f9f9f9',
              }}
              className="mt-5"
              dangerouslySetInnerHTML={{ __html: questionresult }}
            ></div>
          </div>
        ) : null}


          <form
            onSubmit={(e) => {
              e.preventDefault(); 
              handleQuestion();
            }}
          >
            {/* Textarea Input and Buttons - Always visible below the generated content */}
            <div className="input-group mb-3 mt-3">
              <span className="input-group-text" id="search-icon">
                <FontAwesomeIcon
                  icon={faMagnifyingGlass}
                  style={{
                    color: '#5a5a5a',
                    transform: 'translateY(-35px)',
                    position: 'relative',
                  }}
                />
              </span>
              <textarea
                key={textareaKey}
                className="form-control"
                placeholder="Ask Anything With AI"
                value={question}
                onChange={(e) => setquestion(e.target.value)}
                aria-label="AI Question Input"
                aria-describedby="search-icon"
                style={{ backgroundColor: '#ebebeb' }}
                rows="4"
                cols="50"
                required
              />
            </div>

            {/* Microphone and Ask Button */}
            <div className="d-flex justify-content-between align-items-center">
              <button type='button' className="btn microphone-btn" onClick={() => startListening('question')}>
              &nbsp;&nbsp;<FontAwesomeIcon icon={faMicrophone} />  <span><p style={{fontSize:'12px'}}>{listening ? 'on' : 'off'}</p></span>
                
              </button>
              <button
                type="submit"
                className="btn btn-warning ai-button"
              >
                Ask with AI
              </button>
            </div>
          </form>
      </div>
    </div>

        {/* Image Upload Section */}
        <div>
          <div className="text-center mb-3" style={{ color: '#000', fontWeight: 'bold' }}>
            Or use the Image Feature
          </div>
          <div className="image-upload-section">

          <div className="image-analyze-section">
                <form
                  onSubmit={(e) => {
                    e.preventDefault(); // Prevent default only if inputs are invalid
                    handleGenerateContent();
                  }}
                >
                  <div className="d-flex align-items-center" style={{ gap: '10px', marginBottom: '10px' }}>
                    <div className="file-upload-wrapper btn btn-light upload-btn">
                      <FontAwesomeIcon icon={faUpload} /> Upload Image
                      <input
                        type="file"
                        onChange={handleFileChange}
                        accept="image/jpeg, image/png, image/jpg"
                        required
                        className="file-upload-input"
                      />
              
                    </div>
                    
                    {/* Input field with search icon */}
                    <div className="input-group" style={{ flex: '2' }}>
                      <span className="input-group-text" id="search-icon" style={{ backgroundColor: 'transparent', border: '1px solid #e0e0e0' }}>
                        <FontAwesomeIcon icon={faMagnifyingGlass} style={{ color: '#5a5a5a' }} />
                      </span>
                      <input
                        type="text"
                        placeholder="Ask questions"
                        className="form-control"
                        style={{
                          border: '1px solid #e0e0e0',
                          borderRadius: '10px',
                          padding: '10px',
                          backgroundColor: '#ffffff',
                          borderLeft: 'none', // Remove border on left side where icon is
                        }}
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                      />
                    </div>
                    <button type="submit" className="btn btn-warning analyze-btn">
                      Analyse Image
                    </button>

                    <button type='button' className="btn microphone-btn" onClick={() => startListening('prompt')}>
                    &nbsp;&nbsp;<FontAwesomeIcon icon={faMicrophone} />  <span><p style={{fontSize:'12px'}}>{listening ? 'on' : 'off'}</p></span>
                    </button>
                    
                  </div>
                </form>
                {imgfileName && <span style={{ fontSize: '0.875rem', color: '#6c757d',marginLeft:'20px' }}>{imgfileName}</span>}
              </div>

            <small className="text-white d-block text-center text-muted-custom">
              Only supports jpg, png, and jpeg image format
            </small>

              {/* Result from prompt */}
              {imageloading ? (
                // Loading animation
                <div style={{ textAlign: 'center', marginTop: '20px' }}>
                  <ClipLoader color="#000" size={50} /> {/* React Spinner */}
                  <p style={{ marginTop: '10px', fontSize: '18px', color: '#000000' }}>
                    Loading, please wait...
                  </p>
                </div>
              ) : result ? (
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '20px',
                    marginTop: '40px',
                    position: 'relative',
                  }}
                >
                  {/* Image on the left */}
                  <img
                    src={`data:${image.inlineData.mimeType};base64,${image.inlineData.data}`}
                    alt="Preview"
                    className="image-preview"
                    style={{
                      width: '300px',
                      height: '350px',
                      border: '1px solid black',
                      borderRadius: '20px',
                      backgroundColor: 'aliceblue',
                    }}
                  />

                  {/* Text container on the right */}
                  <div
                    style={{
                      flex: 1,
                      maxHeight: '350px',
                      padding: '10px',
                      backgroundColor: '#1a1a1a',
                      borderRadius: '8px',
                      border: '1px solid #333',
                      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                      position: 'relative',
                      height: '350px',
                    }}
                  >
                    {/* Close button */}
                    <button
                      onClick={() => {setResult(null);}}
                      style={{
                        position: 'absolute',
                        top: '-25px',
                        right: '0',
                        backgroundColor: 'red',
                        color: 'white',
                        border: 'none',
                        borderRadius: '50%',
                        width: '20px',
                        height: '20px',
                        cursor: 'pointer',
                        fontSize: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      aria-label="Close"
                    >
                      X
                    </button>

                    {/* Scrollable text */}
                    <div
                      style={{
                        overflowY: 'auto',
                        color: 'white',
                        lineHeight: '1.5',
                        textAlign: 'justify',
                        height: '100%',
                      }}
                      dangerouslySetInnerHTML={{ __html: result }}
                    ></div>
                  </div>
                </div>
              ) : null}

          </div>
        </div>
      </div>
    </div>
  );
};

export default Agriculturesupport;
