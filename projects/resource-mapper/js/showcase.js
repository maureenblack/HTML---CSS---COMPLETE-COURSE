// Project showcase system
const showcase = {
    gallery: {
        featured: [
            {
                id: 'colorful-zoo',
                title: 'My Colorful Zoo',
                description: 'A fun webpage about zoo animals',
                preview: 'images/projects/zoo.png',
                author: 'Sarah, age 8',
                likes: 42,
                tags: ['HTML', 'CSS', 'Animals']
            },
            {
                id: 'space-adventure',
                title: 'Space Adventure',
                description: 'An interactive space exploration page',
                preview: 'images/projects/space.png',
                author: 'Tom, age 9',
                likes: 38,
                tags: ['HTML', 'CSS', 'Space', 'Interactive']
            }
        ],
        categories: [
            'Animals',
            'Space',
            'Sports',
            'Music',
            'Games',
            'Stories'
        ]
    },
    
    achievements: {
        publisher: {
            id: 'first-publish',
            title: 'First Publication',
            description: 'Published your first project to the gallery',
            icon: '🌟'
        },
        popular: {
            id: 'getting-popular',
            title: 'Getting Popular',
            description: 'Received 10 likes on your project',
            icon: '❤️'
        },
        superstar: {
            id: 'code-superstar',
            title: 'Code Superstar',
            description: 'Published 5 projects to the gallery',
            icon: '🌈'
        }
    }
};

// Initialize showcase system
function initializeShowcase() {
    const container = document.getElementById('showcaseContainer');
    if (!container) return;
    
    container.innerHTML = `
        <div class="showcase-header">
            <h2>🎨 Project Gallery</h2>
            <div class="showcase-filters">
                ${renderCategoryFilters()}
            </div>
        </div>
        
        <div class="featured-projects">
            <h3>Featured Projects</h3>
            <div class="project-grid">
                ${renderFeaturedProjects()}
            </div>
        </div>
        
        <div class="publish-section">
            <h3>Share Your Creation!</h3>
            <button onclick="showPublishModal()" class="publish-btn">
                🚀 Publish Your Project
            </button>
        </div>
    `;
}

// Render category filters
function renderCategoryFilters() {
    return showcase.gallery.categories.map(category => `
        <button 
            class="category-filter"
            onclick="filterProjects('${category}')"
        >
            ${category}
        </button>
    `).join('');
}

// Render featured projects
function renderFeaturedProjects() {
    return showcase.gallery.featured.map(project => `
        <div class="project-card">
            <img src="${project.preview}" alt="${project.title}" class="project-preview">
            <div class="project-info">
                <h4>${project.title}</h4>
                <p>${project.description}</p>
                <p class="project-author">By ${project.author}</p>
                <div class="project-tags">
                    ${project.tags.map(tag => `
                        <span class="tag">${tag}</span>
                    `).join('')}
                </div>
                <div class="project-actions">
                    <button onclick="likeProject('${project.id}')" class="like-btn">
                        ❤️ ${project.likes}
                    </button>
                    <button onclick="viewProject('${project.id}')" class="view-btn">
                        👀 View
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// Show publish modal
function showPublishModal() {
    const modal = document.createElement('div');
    modal.className = 'modal publish-modal';
    
    modal.innerHTML = `
        <div class="modal-content">
            <h3>🚀 Publish Your Project</h3>
            <form id="publishForm" onsubmit="publishProject(event)">
                <div class="form-group">
                    <label for="projectTitle">Project Title</label>
                    <input type="text" id="projectTitle" required>
                </div>
                
                <div class="form-group">
                    <label for="projectDescription">Description</label>
                    <textarea id="projectDescription" required></textarea>
                </div>
                
                <div class="form-group">
                    <label for="projectCategory">Category</label>
                    <select id="projectCategory" required>
                        ${showcase.gallery.categories.map(category => `
                            <option value="${category}">${category}</option>
                        `).join('')}
                    </select>
                </div>
                
                <div class="form-group">
                    <label for="authorName">Your Name</label>
                    <input type="text" id="authorName" required>
                </div>
                
                <div class="form-group">
                    <label for="authorAge">Your Age</label>
                    <input type="number" id="authorAge" min="5" max="12" required>
                </div>
                
                <div class="form-actions">
                    <button type="button" onclick="closeModal()" class="cancel-btn">
                        Cancel
                    </button>
                    <button type="submit" class="publish-btn">
                        Publish
                    </button>
                </div>
            </form>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Add close on click outside
    modal.addEventListener('click', e => {
        if (e.target === modal) closeModal();
    });
}

// Close modal
function closeModal() {
    const modal = document.querySelector('.modal');
    if (modal) {
        modal.remove();
    }
}

// Publish project
function publishProject(e) {
    e.preventDefault();
    
    const formData = {
        title: document.getElementById('projectTitle').value,
        description: document.getElementById('projectDescription').value,
        category: document.getElementById('projectCategory').value,
        author: document.getElementById('authorName').value,
        age: document.getElementById('authorAge').value
    };
    
    // Create project preview
    const preview = captureProjectPreview();
    
    // Create new project object
    const newProject = {
        id: generateProjectId(),
        title: formData.title,
        description: formData.description,
        preview: preview,
        author: `${formData.author}, age ${formData.age}`,
        likes: 0,
        tags: [formData.category, 'HTML', 'CSS']
    };
    
    // Add to featured projects
    showcase.gallery.featured.unshift(newProject);
    
    // Update UI
    initializeShowcase();
    
    // Close modal
    closeModal();
    
    // Show success message
    showSuccessMessage('Project published successfully! 🎉');
    
    // Award achievement if first project
    if (showcase.gallery.featured.length === 1) {
        awardShowcaseAchievement('first-publish');
    }
}

// Generate project preview
function captureProjectPreview() {
    // This would normally capture the current project state
    // For now, return a placeholder image
    return 'images/projects/placeholder.png';
}

// Generate unique project ID
function generateProjectId() {
    return 'project-' + Date.now();
}

// Filter projects by category
function filterProjects(category) {
    const filteredProjects = showcase.gallery.featured.filter(project =>
        project.tags.includes(category)
    );
    
    const projectGrid = document.querySelector('.project-grid');
    if (projectGrid) {
        projectGrid.innerHTML = filteredProjects.map(project => `
            <div class="project-card">
                <!-- Project card content -->
            </div>
        `).join('');
    }
}

// Like a project
function likeProject(projectId) {
    const project = showcase.gallery.featured.find(p => p.id === projectId);
    if (project) {
        project.likes++;
        
        // Update UI
        const likeBtn = document.querySelector(`[onclick="likeProject('${projectId}')"]`);
        if (likeBtn) {
            likeBtn.innerHTML = `❤️ ${project.likes}`;
        }
        
        // Check for popularity achievement
        if (project.likes >= 10) {
            awardShowcaseAchievement('getting-popular');
        }
    }
}

// View project
function viewProject(projectId) {
    const project = showcase.gallery.featured.find(p => p.id === projectId);
    if (!project) return;
    
    const modal = document.createElement('div');
    modal.className = 'modal project-modal';
    
    modal.innerHTML = `
        <div class="modal-content">
            <h2>${project.title}</h2>
            <img src="${project.preview}" alt="${project.title}" class="full-preview">
            <p class="project-description">${project.description}</p>
            <p class="project-author">Created by ${project.author}</p>
            <div class="project-tags">
                ${project.tags.map(tag => `
                    <span class="tag">${tag}</span>
                `).join('')}
            </div>
            <button onclick="closeModal()" class="close-btn">Close</button>
        </div>
    `;
    
    document.body.appendChild(modal);
}

// Award showcase achievement
function awardShowcaseAchievement(achievementId) {
    const achievement = showcase.achievements[achievementId];
    if (!achievement) return;
    
    showAchievementPopup(achievement);
    playSound('celebration');
}

// Show achievement popup
function showAchievementPopup(achievement) {
    const popup = document.createElement('div');
    popup.className = 'achievement-popup';
    
    popup.innerHTML = `
        <div class="achievement-content">
            <span class="achievement-icon">${achievement.icon}</span>
            <h3>${achievement.title}</h3>
            <p>${achievement.description}</p>
        </div>
    `;
    
    document.body.appendChild(popup);
    
    setTimeout(() => {
        popup.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        popup.classList.remove('show');
        setTimeout(() => popup.remove(), 500);
    }, 3000);
}

// Show success message
function showSuccessMessage(message) {
    const messageElement = document.createElement('div');
    messageElement.className = 'success-message';
    messageElement.textContent = message;
    
    document.body.appendChild(messageElement);
    
    setTimeout(() => {
        messageElement.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        messageElement.classList.remove('show');
        setTimeout(() => messageElement.remove(), 500);
    }, 3000);
}

// Initialize on load
document.addEventListener('DOMContentLoaded', initializeShowcase);
