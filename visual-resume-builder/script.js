document.getElementById('resume-form').addEventListener('input', () => {
  document.getElementById('preview-name').textContent = document.getElementById('name').value || "Your Name";
  document.getElementById('preview-title').textContent = document.getElementById('title').value || "Your Title";
  document.getElementById('preview-summary').textContent = document.getElementById('summary').value || "A short professional summary will appear here.";
  document.getElementById('preview-email').textContent = document.getElementById('email').value || "examolella@example.com";
  document.getElementById('preview-phone').textContent = document.getElementById('phone').value || "123-456-7890";
  document.getElementById('preview-skills').textContent = document.getElementById('skills').value || "Python, HTML, CSS";
  document.getElementById('preview-education').textContent = document.getElementById('education').value || "B.Tech in CSE, XYZ University, 2023";
  document.getElementById('preview-experience').textContent = document.getElementById('experience').value || "Intern at ABC Crop, June 2022 - Jul 2022";

});

document.getElementById('resume-form').addEventListener('submit', function(e) {
  e.preventDefault();
  alert("Resume updated in preview!");
});
document.getElementById('download-btn').addEventListener('click', () => {
  const resume = document.getElementById('resume-card');
  
  const opt = {
    margin:       0.5,
    filename:     'resume.pdf',
    image:        { type: 'jpeg', quality: 0.98 },
    html2canvas:  { scale: 2 },
    jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
  };
  
  html2pdf().set(opt).from(resume).save();
});
function updatePreview() {
  document.getElementById('preview-name').textContent = document.getElementById('name').value;
  document.getElementById('preview-title').textContent = document.getElementById('title').value;
  document.getElementById('preview-email').textContent = document.getElementById('email').value;
  document.getElementById('preview-phone').textContent = document.getElementById('phone').value;
  document.getElementById('preview-summary').textContent = document.getElementById('summary').value;
  document.getElementById('preview-experience').textContent = document.getElementById('experience').value;
  document.getElementById('preview-education').textContent = document.getElementById('education').value;
}
document.getElementById('profile-image-input').addEventListener('change', function () {
  const file = this.files[0];
  const reader = new FileReader();

  reader.onload = function (e) {
    document.getElementById('preview-image').src = e.target.result;
    localStorage.setItem('profileImage', e.target.result);
  };

  if (file) {
    reader.readAsDataURL(file);
  }
});

function saveToLocalStorage() {
  const formData = {
    name: document.getElementById('name').value,
    title: document.getElementById('title').value,
    email: document.getElementById('email').value,
    phone: document.getElementById('phone').value,
    summary: document.getElementById('summary').value,
    experience: document.getElementById('experience').value,
    education: document.getElementById('education').value
  };
  localStorage.setItem('resumeData', JSON.stringify(formData));
}

function loadFromLocalStorage() {
  const savedData = localStorage.getItem('resumeData');
  if (savedData) {
    const data = JSON.parse(savedData);
    document.getElementById('name').value = data.name;
    document.getElementById('title').value = data.title;
    document.getElementById('email').value = data.email;
    document.getElementById('phone').value = data.phone;
    document.getElementById('summary').value = data.summary;
    document.getElementById('experience').value = data.experience;
    document.getElementById('education').value = data.education;
    updatePreview();
    const savedImage = localStorage.getItem('profileImage');
    if (savedImage) {
      document.getElementById('preview-image').src = savedImage;
    }

  }
}


// Hook into form input changes
document.querySelectorAll('#resume-form input, #resume-form textarea').forEach(field => {
  field.addEventListener('input', saveToLocalStorage);
});

// Load data when the page loads
window.addEventListener('DOMContentLoaded', loadFromLocalStorage);

