//=============================================================================== ALL SOURCE JPG TO WEBP CONVERTER JS START -->
//================================================================================== CONVERTION START
let filesQueue = [];

function convertFiles() {
  const fileInput = document.getElementById("fileInput");
  const files = fileInput.files;
  const queue = document.getElementById("queue");

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    if (file.type !== "image/jpeg") {
      alert("Please select only JPEG files!");
      return;
    }
    filesQueue.push(file);
    queue.innerHTML +=
      `<div class="ctn_ht_align">
                <div class="ctn_bg">
                <div><span class="loader-83"></span></div>
                <span class="ctn_popup_text">Your File is Ready Now</span><br>
                <span class="ctn_popup_text">Download it Below</span>
           
                </div>
                </div>`;
  }

  fileInput.value = ""; // Clear the file input field
}

async function convertToWebP(jpegBlob) {
  const img = new Image();
  img.src = URL.createObjectURL(jpegBlob);

  return new Promise((resolve) => {
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");

      canvas.width = img.width;
      canvas.height = img.height;
      context.drawImage(img, 0, 0);

      canvas.toBlob((blob) => {
        resolve(blob);
      }, "image/webp", 0.8);
    };
  });
}

async function downloadAll() {
  for (let i = 0; i < filesQueue.length; i++) {
    const file = filesQueue[i];
    const imageBlob = await fetch(URL.createObjectURL(file)).then((response) =>
      response.blob()
    );

    const webpBlob = await convertToWebP(imageBlob);

    const link = document.createElement("a");
    link.href = URL.createObjectURL(webpBlob);
    link.download = file.name.replace(".jpg", ".webp");
    link.click();
  }
}

function clearQueue() {
  filesQueue = [];
  const queue = document.getElementById("queue");
  queue.innerHTML = "";
}
//================================================================================== CONVERTION END


//================================================================================== CONVERTION LOADING SUCCESESSFULL START
//=========================================================== function 1 start
function simulateLoading() {
  var button = document.getElementById('myButton');
  // button.innerHTML = 'Loading...';
  button.disabled = true;
  // button.classList.add('loading');

  // Simulate some loading process (e.g., making an API request)
  setTimeout(function () {
    // button.innerHTML = '<span style="color: #fff; font-weight: normal;">Your File is Ready</span>';
    // button.disabled = false;
    // button.classList.remove('loading');

    // Remove the message after 7 seconds
    setTimeout(function () {
      button.innerHTML = 'Converted';
    }, 3000);
  }, 1000); // Change the timeout value to adjust the loading time
}
//=========================================================== function 1 end


//=========================================================== function 2 start
document.getElementById('fileInput').addEventListener('change', function () {
  var fileInput = document.getElementById('fileInput');
  var button = document.getElementById('myButton');
  var file = fileInput.files[0];

  if (file) {
    // button.innerHTML = 'Loading...';
    button.disabled = true;
    // button.classList.add('loading');

    // Simulate some loading process (e.g., making an API request)
    setTimeout(function () {
      // button.innerHTML = '<span style="color: #fff; font-weight: normal;">Your File is Ready</span>';
      button.disabled = false;
      // button.classList.remove('loading');

      // Remove the message after 7 seconds
      setTimeout(function () {
        button.innerHTML = 'Convert';
      }, 7000);
    }, 1); // Change the timeout value to adjust the loading time
  }
});
//=========================================================== function 2 end
//==================================================================================== CONVERTION LOADING SUCCESESSFULL END



//===================================================================================================== DRAG AND DROP START
var dropArea = document.getElementById('dropArea');
var fileInput = document.getElementById('fileInput');

// Prevent default behavior (Prevent file from being opened)
dropArea.addEventListener('dragover', function (e) {
  e.preventDefault();
});

// Handle file drop
dropArea.addEventListener('drop', function (e) {
  e.preventDefault();
  var files = e.dataTransfer.files;

  // Assign the dropped files to the input element
  fileInput.files = files;

  // Use the files here or perform any other operations
  console.log(files);
});

// Optional: Highlight the drop area when dragging over it
dropArea.addEventListener('dragenter', function (e) {
  dropArea.classList.add('drag-over');
});

dropArea.addEventListener('dragleave', function (e) {
  dropArea.classList.remove('drag-over');
});



//=================================================================================================== Uploading status start
// Get necessary elements from the HTML
var dropArea = document.getElementById('dropArea');
var fileInput = document.getElementById('fileInput');
var uploadStatus = document.getElementById('uploadStatus');

// Listen for drag and drop events on the drop area
dropArea.addEventListener('dragover', function (event) {
  event.preventDefault();
  dropArea.classList.add('highlight');
});

dropArea.addEventListener('dragleave', function () {
  dropArea.classList.remove('highlight');
});

dropArea.addEventListener('drop', function (event) {
  event.preventDefault();
  dropArea.classList.remove('highlight');

  handleFiles(event.dataTransfer.files);
});

// Listen for file input change event
fileInput.addEventListener('change', function (event) {
  handleFiles(fileInput.files);
});

// Handle uploaded files
function handleFiles(files) {
  if (files.length > 0) {
    var totalFiles = files.length;
    var uploadedFiles = 0;
    var totalSize = 0;
    var uploadedSize = 0;

    // Display initial message
    uploadStatus.style.display = 'block';
    uploadStatus.textContent = `Uploading ${totalFiles} files...`;

    // Function to update upload status
    function updateUploadStatus(fileSize) {
      uploadedFiles++;
      uploadedSize += fileSize;
      uploadStatus.textContent = `Uploaded ${uploadedFiles} / ${totalFiles} files (${(uploadedSize / 1024).toFixed(2)} KB)`;

      // If all files are uploaded, show "uploaded" message
      if (uploadedFiles === totalFiles) {
        setTimeout(function () {
          uploadStatus.innerHTML =
            `<div class="ctn_afus_align">
                      <div class="ctn_afus_bg">
                      <div><span class="loader-79"></span></div>
                      <span class="ctn_afus_popup_text">All files uploaded successfully</span>
                      </div>
                      </div>`;
          // Automatically remove message after 2 seconds
          setTimeout(function () {
            uploadStatus.style.display = 'none';
            uploadStatus.textContent = '';
          }, 2000);
        }, 1000);
      }
    }

    // Simulate upload operation for each file
    for (var i = 0; i < files.length; i++) {
      var file = files[i];
      totalSize += file.size;

      // Simulate upload process for each file (You should replace this with actual upload code)
      setTimeout(function (fileSize) {
        updateUploadStatus(fileSize);
      }, i * 1000, file.size);
    }
  }
}
//===================================================================================================== Uploading status end
//======================================================================================================== DRAG AND DROP END



//=================================================================================================== DISPLAY UPLOADED START
var fileInput = document.getElementById('fileInput');
var uploadStatus = document.getElementById('uploadStatus');

fileInput.addEventListener('change', function () {
  if (fileInput.files.length > 0) {
    var totalFiles = fileInput.files.length;
    var uploadedFiles = 0;
    var totalSize = 0;
    var uploadedSize = 0;

    // Display initial message
    uploadStatus.style.display = 'block';
    uploadStatus.textContent = `Uploading ${totalFiles} files...`;

    // Function to update upload status
    function updateUploadStatus(fileSize) {
      uploadedFiles++;
      uploadedSize += fileSize;
      uploadStatus.textContent = `Uploaded ${uploadedFiles} / ${totalFiles} files (${(uploadedSize / 1024).toFixed(2)} KB)`;

      // If all files are uploaded, show "uploaded" message
      if (uploadedFiles === totalFiles) {
        setTimeout(function () {
          uploadStatus.innerHTML =
            `<div class="ctn_afus_align">
                         <div class="ctn_afus_bg">
                        <div><span class="loader-79"></span></div>
                        <span class="ctn_afus_popup_text">All files uploaded successfully</span>
                        </div>
                        </div>`;
          // Automatically remove message after 2 seconds
          setTimeout(function () {
            uploadStatus.style.display = 'none';
            uploadStatus.textContent = '';
          }, 2000);
        }, 1000);
      }
    }

    // Simulate upload operation for each file
    for (var i = 0; i < fileInput.files.length; i++) {
      var file = fileInput.files[i];
      totalSize += file.size;

      // Simulate upload process for each file (You should replace this with actual upload code)
      setTimeout(function (fileSize) {
        updateUploadStatus(fileSize);
      }, i * 1000, file.size);
    }
  }
});
//======================================================================================================== DISPLAY UPLOADED END

//============================================================================== ALL SOURCE JPG TO WEBP CONVERTER JS END 