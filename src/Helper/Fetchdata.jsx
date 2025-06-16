const fetchPrediction = async (formData) => {
  try {
    const response = await axios.post(
      "https://electricity-11.onrender.com/predict",
      formData,
      {
        headers: {
          "access-token": "my-secret-key",
          "Content-Type": "application/json", 
        },
      }
    );
    console.log("✅ Prediction Response:", response.data);
    return response.data;
   
    
  } catch (error) {
    console.error("Error fetching prediction:", error.response || error.message);
    return null;
  }
};
