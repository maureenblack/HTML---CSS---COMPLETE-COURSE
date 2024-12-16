// Enhanced project showcase system with more features
const enhancedShowcase = {
    gallery: {
        featured: [
            // Previous projects remain...
        ],
        categories: [
            // Creative
            'Animals', 'Space', 'Sports', 'Music', 'Games', 'Stories',
            // Educational
            'Science', 'Math', 'History', 'Geography',
            // Fun
            'Comics', 'Adventure', 'Fantasy', 'Puzzles',
            // Special
            'Holidays', 'Nature', 'Food', 'Technology',
            // Interactive
            'Animations', 'Quizzes', 'Mini-Games', 'Art Gallery'
        ],
        themes: {
            space: {
                background: 'space-bg.jpg',
                icons: ['🚀', '🌟', '🌍', '👨‍🚀'],
                colors: ['#1a237e', '#303f9f', '#3f51b5']
            },
            nature: {
                background: 'nature-bg.jpg',
                icons: ['🌳', '🌺', '🦋', '🌈'],
                colors: ['#1b5e20', '#2e7d32', '#388e3c']
            },
            ocean: {
                background: 'ocean-bg.jpg',
                icons: ['🌊', '🐠', '🐋', '🏊‍♂️'],
                colors: ['#0d47a1', '#1565c0', '#1976d2']
            },
            fantasy: {
                background: 'fantasy-bg.jpg',
                icons: ['🦄', '🏰', '🧙‍♂️', '✨'],
                colors: ['#4a148c', '#6a1b9a', '#7b1fa2']
            }
        }
    },
    
    achievements: {
        // Previous achievements remain...
        themeCreator: {
            id: 'theme-master',
            title: 'Theme Master',
            description: 'Created projects with 5 different themes',
            icon: '🎨'
        },
        seriesCreator: {
            id: 'series-master',
            title: 'Series Creator',
            description: 'Created a series of 3 connected projects',
            icon: '📚'
        },
        collaborator: {
            id: 'team-player',
            title: 'Team Player',
            description: 'Collaborated on a project with another creator',
            icon: '🤝'
        },
        innovator: {
            id: 'innovation-star',
            title: 'Innovation Star',
            description: 'Created a project using advanced features',
            icon: '💫'
        },
        mentor: {
            id: 'helpful-mentor',
            title: 'Helpful Mentor',
            description: 'Helped 5 other creators with their projects',
            icon: '🌟'
        }
    },
    
    features: {
        collaboration: true,
        comments: true,
        ratings: true,
        sharing: true,
        templates: true,
        themes: true,
        animations: true,
        soundEffects: true
    }
};

// Enhanced project creation with templates
const projectTemplates = {
    portfolio: {
        name: 'My Portfolio',
        description: 'Show off your best work',
        structure: {
            sections: ['About Me', 'My Projects', 'Contact'],
            features: ['image gallery', 'project cards', 'contact form']
        }
    },
    storyBook: {
        name: 'Interactive Story',
        description: 'Create your own adventure',
        structure: {
            sections: ['Cover', 'Chapters', 'Characters'],
            features: ['page transitions', 'character dialogs', 'sound effects']
        }
    },
    gameWorld: {
        name: 'Mini Game World',
        description: 'Design your own game world',
        structure: {
            sections: ['Game Area', 'Score Board', 'Controls'],
            features: ['sprite animations', 'collision detection', 'sound effects']
        }
    }
};

// Enhanced project customization
function showCustomizationPanel() {
    const panel = document.createElement('div');
    panel.className = 'customization-panel';
    
    panel.innerHTML = `
        <div class="panel-content">
            <h3>🎨 Customize Your Project</h3>
            
            <div class="theme-selector">
                <h4>Choose a Theme</h4>
                ${Object.entries(enhancedShowcase.gallery.themes).map(([theme, data]) => `
                    <button onclick="applyTheme('${theme}')" class="theme-btn">
                        ${data.icons.join(' ')} ${theme}
                    </button>
                `).join('')}
            </div>
            
            <div class="animation-controls">
                <h4>Add Animations</h4>
                <button onclick="addAnimation('fade')" class="anim-btn">
                    ✨ Fade Effect
                </button>
                <button onclick="addAnimation('slide')" class="anim-btn">
                    ➡️ Slide Effect
                </button>
                <button onclick="addAnimation('bounce')" class="anim-btn">
                    ⚡ Bounce Effect
                </button>
            </div>
            
            <div class="sound-controls">
                <h4>Add Sound Effects</h4>
                <button onclick="addSound('click')" class="sound-btn">
                    🔊 Click Sound
                </button>
                <button onclick="addSound('success')" class="sound-btn">
                    🎵 Success Sound
                </button>
                <button onclick="addSound('background')" class="sound-btn">
                    🎼 Background Music
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(panel);
}

// Enhanced project collaboration
function enableCollaboration(projectId) {
    const collaborationTools = {
        chat: {
            enabled: true,
            messages: [],
            sendMessage: (user, message) => {
                // Implementation
            }
        },
        sharing: {
            enabled: true,
            sharedWith: [],
            shareWith: (userId) => {
                // Implementation
            }
        },
        realtime: {
            enabled: true,
            cursors: {},
            updateCursor: (userId, position) => {
                // Implementation
            }
        }
    };
    
    return collaborationTools;
}

// Enhanced project templates
function showTemplateSelector() {
    const modal = document.createElement('div');
    modal.className = 'template-modal';
    
    modal.innerHTML = `
        <div class="modal-content">
            <h3>🎯 Choose a Template</h3>
            
            <div class="template-grid">
                ${Object.entries(projectTemplates).map(([id, template]) => `
                    <div class="template-card" onclick="useTemplate('${id}')">
                        <h4>${template.name}</h4>
                        <p>${template.description}</p>
                        <div class="template-features">
                            ${template.structure.features.map(feature => 
                                `<span class="feature-tag">${feature}</span>`
                            ).join('')}
                        </div>
                    </div>
                `).join('')}
            </div>
            
            <button onclick="closeModal()" class="close-btn">
                Start from Scratch Instead
            </button>
        </div>
    `;
    
    document.body.appendChild(modal);
}

// Enhanced project sharing
function shareProject(projectId) {
    const shareOptions = {
        platforms: [
            {
                name: 'Class Gallery',
                icon: '🏫',
                share: () => shareToGallery(projectId)
            },
            {
                name: 'Friend Share',
                icon: '👥',
                share: () => shareWithFriends(projectId)
            },
            {
                name: 'Download',
                icon: '💾',
                share: () => downloadProject(projectId)
            }
        ]
    };
    
    showShareModal(shareOptions);
}

// Enhanced project feedback
function enableFeedback(projectId) {
    const feedbackSystem = {
        comments: {
            add: (user, comment) => {
                // Implementation
            },
            reply: (commentId, user, reply) => {
                // Implementation
            },
            like: (commentId, user) => {
                // Implementation
            }
        },
        ratings: {
            add: (user, rating, category) => {
                // Implementation
            },
            categories: ['creativity', 'design', 'interactivity']
        },
        suggestions: {
            add: (user, suggestion) => {
                // Implementation
            },
            vote: (suggestionId, user) => {
                // Implementation
            }
        }
    };
    
    return feedbackSystem;
}

// Enhanced project analytics
function trackProjectMetrics(projectId) {
    const metrics = {
        views: 0,
        likes: 0,
        shares: 0,
        comments: 0,
        averageRating: 0,
        timeSpent: 0,
        interactions: []
    };
    
    return {
        increment: (metric) => {
            metrics[metric]++;
            updateProjectStats(projectId, metrics);
        },
        track: (interaction) => {
            metrics.interactions.push({
                type: interaction,
                timestamp: new Date()
            });
        },
        getReport: () => generateProjectReport(metrics)
    };
}

// Initialize enhanced showcase
document.addEventListener('DOMContentLoaded', () => {
    initializeShowcase();
    if (enhancedShowcase.features.collaboration) enableCollaboration();
    if (enhancedShowcase.features.templates) showTemplateSelector();
});
