import React, { useState, useEffect } from 'react'


import { supabase } from '../../helper/supabaseClient'

import csvFile from '../../assets/files/calories.csv'; 



const CsvImport = () => {
  const [csvData, setCsvData] = useState(null);

  useEffect(() => {

    fetch(csvFile)
      .then((response) => response.text())
      .then((data) => setCsvData(data))
      .catch((error) => console.error('Error reading CSV file:', error));


    insertFoods();


  }, [, csvData])

  const insertFoods = async () => {
    try {
      if (!csvData) return;

      // Parse the CSV data
      const parsedData = parseCSV(csvData);

      // Iterate over each row of parsed data and insert into the foods table
      for (const row of parsedData) {
        console.log(row)
        // Remove 'cal' from calories and parse as float
        const calories = parseFloat(row.calories.replace('cal', ''));
        
        // Remove 'g' from unit
        const unit = row.unit.replace('g', '');
  
        await supabase.from('foods').insert([
          {
            category: row.category,
            name: row.name,
            unit: unit,
            calories: calories,
            // Add other columns as needed
          },
        ]);
      }
      console.log('Foods inserted successfully!');
    } catch (error) {
      console.error('Error inserting foods:', error.message);
    }
  };

  const parseCSV = (csvData) => {
    // Implement your CSV parsing logic here
    // For example, you can use libraries like 'csv-parse' or write custom parsing logic
    // Here's a basic example assuming CSV is comma-separated with a header row:
    const lines = csvData.split('\n');
    const headers = lines[0].split(',');
    const parsedData = [];
    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(',');
      const row = {};
      for (let j = 0; j < headers.length; j++) {
        row[headers[j]] = values[j];
      }
      parsedData.push(row);
    }
    return parsedData;
  };
  



  return (
    <>
      <h1>import csv</h1>
    </>
  )
}

export default CsvImport
