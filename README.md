# Ethan Soh - Portfolio

Personal portfolio website showcasing my projects, accomplishments, and experience as a student developer from Singapore.

## 🚀 Live Demo

Visit the live site: [Your GitHub Pages URL will be here]

## 📋 About

This portfolio features:
- **FlowDay** - Smart study companion for students
- **Scripties** - Public speaking mastery app (Swift Accelerator 2025 project)
- **Sign Language AI** - Computer vision project for accessibility
- Swift Accelerator Programme graduate (2025)
- Various accomplishments and awards

## 🛠️ Built With

- HTML5
- CSS3 (Custom styling with CSS Variables)
- Vanilla JavaScript
- No frameworks or dependencies

## 📁 Project Structure

```
portfolio-site/
├── index.html           # Main HTML file
├── assets/              # Image assets
│   ├── scripties-logo.png
│   ├── ethan-photo.png
│   ├── bpghs-logo.png
│   └── flowday-logo.png (add your own)
└── README.md           # This file
```

## 🎨 Features

- **Light Theme** - Clean, minimal design inspired by modern portfolios
- **Responsive Design** - Works on desktop, tablet, and mobile
- **Project Showcase** - Interactive cards for each project
- **Timeline** - Education and experience displayed chronologically
- **Fast Loading** - No external dependencies, pure HTML/CSS/JS

## 📦 Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/portfolio-site.git
   cd portfolio-site
   ```

2. **Add your FlowDay logo**
   - Place your FlowDay logo in the `assets/` folder
   - Name it `flowday-logo.png`
   - Recommended: 512x512px, PNG format with transparent background

3. **Open locally**
   - Simply open `index.html` in your web browser
   - Or use a local server: `python -m http.server 8000`

## 🌐 Deploy to GitHub Pages

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Enable GitHub Pages**
   - Go to your repository settings
   - Navigate to "Pages" in the sidebar
   - Under "Source", select "Deploy from a branch"
   - Select branch: `main` and folder: `/ (root)`
   - Click "Save"

3. **Access your site**
   - Your site will be live at: `https://YOUR_USERNAME.github.io/portfolio-site/`
   - It may take a few minutes to deploy

## ✏️ Customization

### Update Content
Edit `index.html` to update:
- Personal information in the header
- Project descriptions
- Accomplishments
- Social media links

### Update Styling
All styles are in the `<style>` section of `index.html`:
- Color scheme defined in `:root` CSS variables
- Easy to change colors, fonts, spacing
- Responsive breakpoints at 768px

### Add Projects
Follow the existing project card structure:
```html
<a href="YOUR_PROJECT_URL" class="project-card" target="_blank">
    <div class="project-header">
        <div class="project-icon">
            <img src="assets/your-logo.png" alt="Project Name">
        </div>
        <div class="project-info">
            <h3 class="project-name">Project Name</h3>
            <p class="project-tagline">Short tagline</p>
        </div>
    </div>
    <p class="project-description">
        Detailed description of your project...
    </p>
    <span class="project-badge">Badge Text</span>
</a>
```

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 📬 Contact

- **GitHub**: [@quantamShade0337](https://github.com/quantamShade0337)
- **LinkedIn**: [Ethan Soh](https://www.linkedin.com/in/ethan-soh-9548863a9/)

## 🙏 Acknowledgments
- Swift Accelerator Programme by Apple, IMDA, and SwiftInSG
- Bukit Panjang Government High School

---

Built with focus and dedication. © 2026 Ethan Soh
