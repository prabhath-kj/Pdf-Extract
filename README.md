# PDF FORGE

PDF Forge is a web application that enables users to extract and manipulate PDF files seamlessly.

# Table of Contents

- [PDF Forge](#pdf-forge)
  - [Features](#features)
  - [How to Use](#how-to-use)
  - [Installation](#installation)
  - [Usage](#usage)
    - [Development](#development)  
  - [Apis](#apis)
  - [License](#license)

## Features

- **Upload PDFs:**

  - Easily upload PDF files for processing.

  ![Landing Page](https://res.cloudinary.com/djlzfhwqo/image/upload/v1699183778/HomePage_qve3vj.png)


- **Page Preview:**

  - Visualize each page through an intuitive interface.

  ![Preview](https://res.cloudinary.com/djlzfhwqo/image/upload/v1699184091/Viewpdf_pedam3.png)

- **Selective Extraction:**

  - Choose specific pages for extraction using checkboxes.

   ![Select Page](https://res.cloudinary.com/djlzfhwqo/image/upload/v1699184134/Extract_Button_k0kkvx.png)
- **Page Inspection:**

  - View detailed, full-page content through a modal interface.

  ![Single Page](https://res.cloudinary.com/djlzfhwqo/image/upload/v1699184110/Single_Page_View_t5qqac.png)

- **Individual Page Downloads:**

  - Download individual pages as high-quality PNG images.

- **Effortless Extraction:**

  - Seamlessly extract selected pages by triggering the "Extract" button.

- **PDF Generation:**

  - Process chosen pages, creating a new PDF file with precision.

- **Seamless PDF Viewing:**
  - Redirect users to a sophisticated PDF viewer for comprehensive viewing.

   ![Extracted Pdf and View](https://res.cloudinary.com/djlzfhwqo/image/upload/v1699184142/Extracted_pdf_and_download_cts4np.png)
  

## How to Use

1. **Upload PDF:**

   - Access the application and drag or drop the PDF FILE.

2. **Navigate Page Preview:**

   - Scroll through the page previews to inspect each page visually.

3. **Selective Extraction:**

   - Utilize the checkboxes to select specific pages for extraction.

4. **Detailed Page View:**

   - Click on a page to open a modal interface for a detailed, full-page view.

5. **Download Pages:**

   - Download individual pages seamlessly as high-quality PNG images.

6. **Initiate Extraction:**

   - Confirm your selection and trigger the extraction process with the "Extract" button.

7. **Explore PDF Viewer:**
   - Seamlessly redirect to a sophisticated PDF viewer for comprehensive viewing and downloading.
8. **PDF Generation:**
   - Witness the creation of a new, precisely extracted PDF file.

## Installation

1.Clone the repository and install dependencies.

    git clone https://github.com/yourusername/pdf-forge.git

2.Navigate to the project directory.
    
    cd pdf-forge
    npm install

3.Install the dependencies using your preferred package manager in both the server and client directorie
    
    cd api &&  npm install
    cd client && npm install
4.Set up the required environment variables by renaming the .env.example file to .env and providing the necessary values for your environment.

## Usage

   ### Developement

   1. Start the development server
        
           cd api  && npm start
  
   2.Access the server at http://localhost:3000.

   (Repeat the same process for access the UI , instead  cd api && npm start use cd clien && npm run dev.
   Access dev server at http://localhost:5173)


# APIs

This API provides endpoints for performing various operations on PDF files, including uploading, fetching, and extracting pages.

## API Endpoints

### 1. Upload a PDF File

**Endpoint:** POST /api/pdf/upload

**Description:**
Upload a PDF file to the server.

### 2. Fetch an Uploaded PDF File

**Endpoint:** GET /api/pdf/:fileName


**Description:**
Fetch an uploaded PDF file.

### 3. Extract Pages from PDF

**Endpoint:**  POST /api/pdf/extract

**Description:**
Extract new PDFs from the original PDF by selecting specific pages.

## Detailed API Documentation

For detailed documentation on each API endpoint, including request and response formats, please refer to the [API Documentation](https://documenter.getpostman.com/view/20041063/2s9YXfa39S).


# License
This project is licensed under the MIT License - see the LICENSE file for details.

```   
Feel free to adjust the content and formatting based on your specific needs.

