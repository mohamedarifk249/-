// Workout completion tracking
let completedWorkouts = JSON.parse(localStorage.getItem('completedWorkouts')) || [];

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    initializePage();
    loadCompletedWorkouts();
    setupImageLoading();
});

// Initialize page elements
function initializePage() {
    // Add smooth scroll behavior for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add intersection observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all workout days and week sections
    document.querySelectorAll('.workout-day, .week-section').forEach(element => {
        observer.observe(element);
    });
}

// Load completed workouts from localStorage
function loadCompletedWorkouts() {
    completedWorkouts.forEach(day => {
        const workoutDay = document.querySelector(`[data-day="${day}"]`);
        if (workoutDay) {
            const button = workoutDay.querySelector('.finish-btn');
            if (button) {
                button.textContent = 'تم إكمال التمرين ✓';
                button.classList.add('completed');
                button.disabled = false; // Keep button enabled for toggle functionality
            }
        }
    });
}

// Complete workout function (now works as toggle)
function completeWorkout(dayNumber) {
    const workoutDay = document.querySelector(`[data-day="${dayNumber}"]`);
    if (!workoutDay) return;
    
    const button = workoutDay.querySelector('.finish-btn');
    if (!button) return;
    
    if (completedWorkouts.includes(dayNumber)) {
        // Remove from completed workouts
        completedWorkouts = completedWorkouts.filter(day => day !== dayNumber);
        localStorage.setItem('completedWorkouts', JSON.stringify(completedWorkouts));
        
        // Update button state to incomplete
        button.textContent = 'إنهاء التمرين';
        button.classList.remove('completed');
        button.disabled = false;
        
        // Add completion animation
        button.style.transform = 'scale(1.1)';
        button.style.animation = 'buttonCelebration 0.8s ease-in-out';
        
        // Add sparkle effect
        createSparkles(button);
        
        setTimeout(() => {
            button.style.transform = 'scale(1)';
            button.style.animation = '';
        }, 800);
        
        // Show uncompletion message
        showUncompletionMessage(dayNumber);
    } else {
        // Add to completed workouts
        completedWorkouts.push(dayNumber);
        localStorage.setItem('completedWorkouts', JSON.stringify(completedWorkouts));
        
        // Add completion animation
        button.style.transform = 'scale(1.1)';
        button.style.animation = 'buttonCelebration 0.8s ease-in-out';
        
        // Add sparkle effect
        createSparkles(button);
        
        setTimeout(() => {
            button.style.transform = 'scale(1)';
            button.style.animation = '';
        }, 800);

        // Update button state to complete
        button.textContent = 'تم إكمال التمرين ✓';
        button.classList.add('completed');
        button.disabled = false;

        // Add completion celebration
        showCompletionMessage(dayNumber);
    }
}

// Show completion message
function showCompletionMessage(dayNumber) {
    // Create celebration element
    const celebration = document.createElement('div');
    celebration.className = 'completion-celebration';
    celebration.innerHTML = `
        <div class="celebration-content">
            <span class="celebration-icon">💋</span>
            <p>محمد اداك بوسه! 🥰</p>
            <p class="celebration-subtitle">أحسنت! لقد أكملت اليوم ${dayNumber}</p>
        </div>
    `;
    
    // Add styles
    celebration.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #ec4899, #be185d);
        color: white;
        padding: 1.2rem 1.5rem;
        border-radius: 16px;
        box-shadow: 0 12px 35px rgba(236, 72, 153, 0.4);
        z-index: 1000;
        transform: translateX(100%) scale(0.8);
        transition: all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        font-family: 'Cairo', sans-serif;
        max-width: 320px;
        text-align: center;
        border: 2px solid rgba(255, 255, 255, 0.2);
    `;

    // Add to page
    document.body.appendChild(celebration);

    // Animate in with bounce effect
    setTimeout(() => {
        celebration.style.transform = 'translateX(0) scale(1)';
    }, 100);

    // Add floating animation
    celebration.style.animation = 'celebrationFloat 3s ease-in-out infinite';

    // Remove after delay
    setTimeout(() => {
        celebration.style.transform = 'translateX(100%) scale(0.8)';
        setTimeout(() => {
            if (celebration.parentNode) {
                celebration.parentNode.removeChild(celebration);
            }
        }, 600);
    }, 4000);
}

// Show uncompletion message
function showUncompletionMessage(dayNumber) {
    // Create uncompletion element
    const uncompletion = document.createElement('div');
    uncompletion.className = 'uncompletion-message';
    uncompletion.innerHTML = `
        <div class="uncompletion-content">
            <span class="uncompletion-icon">🔄</span>
            <p>تم إلغاء إكمال اليوم ${dayNumber}</p>
        </div>
    `;
    
    // Add styles
    uncompletion.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #6b7280, #4b5563);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 12px;
        box-shadow: 0 8px 25px rgba(107, 114, 128, 0.3);
        z-index: 1000;
        transform: translateX(100%);
        transition: transform 0.5s ease;
        font-family: 'Cairo', sans-serif;
        max-width: 300px;
    `;

    // Add to page
    document.body.appendChild(uncompletion);

    // Animate in
    setTimeout(() => {
        uncompletion.style.transform = 'translateX(0)';
    }, 100);

    // Remove after delay
    setTimeout(() => {
        uncompletion.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (uncompletion.parentNode) {
                uncompletion.parentNode.removeChild(uncompletion);
            }
        }, 500);
    }, 3000);
}

// Setup image loading with fade-in effect
function setupImageLoading() {
    const images = document.querySelectorAll('.exercise-image img');
    
    images.forEach(img => {
        if (img.complete) {
            img.classList.add('loaded');
        } else {
            img.addEventListener('load', function() {
                this.classList.add('loaded');
            });
            
            img.addEventListener('error', function() {
                // Fallback for failed images
                this.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 150" fill="%23f3e8ff"><rect width="200" height="150" fill="%23f3e8ff"/><text x="100" y="75" text-anchor="middle" dy=".3em" font-family="Arial" font-size="14" fill="%23a855f7">تمرين رياضي</text></svg>';
                this.classList.add('loaded');
            });
        }
    });
}

// Add hover effects for workout days
document.addEventListener('DOMContentLoaded', function() {
    const workoutDays = document.querySelectorAll('.workout-day');
    
    workoutDays.forEach(day => {
        day.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(5px) scale(1.02)';
        });
        
        day.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0) scale(1)';
        });
    });
});

// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        // Close any open modals or celebrations
        const celebrations = document.querySelectorAll('.completion-celebration');
        celebrations.forEach(celebration => {
            celebration.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (celebration.parentNode) {
                    celebration.parentNode.removeChild(celebration);
                }
            }, 500);
        });
    }
});

// Progress tracking function (optional enhancement)
function getProgressPercentage() {
    return Math.round((completedWorkouts.length / 30) * 100);
}

// Reset progress function
function resetProgress() {
    if (confirm('هل أنت متأكدة من أنك تريد إعادة تعيين التقدم؟')) {
        completedWorkouts = [];
        localStorage.removeItem('completedWorkouts');
        
        // Reset all buttons
        document.querySelectorAll('.finish-btn').forEach(button => {
            button.textContent = 'إنهاء التمرين';
            button.classList.remove('completed');
            button.disabled = false;
        });
        
        // Show reset message
        showResetMessage();
    }
}

// Show reset message
function showResetMessage() {
    const message = document.createElement('div');
    message.className = 'reset-message';
    message.innerHTML = `
        <div class="message-content">
            <span class="message-icon">🔄</span>
            <p>تم إعادة تعيين التقدم بنجاح</p>
        </div>
    `;
    
    message.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #f59e0b, #d97706);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 12px;
        box-shadow: 0 8px 25px rgba(245, 158, 11, 0.3);
        z-index: 1000;
        transform: translateX(100%);
        transition: transform 0.5s ease;
        font-family: 'Cairo', sans-serif;
        max-width: 300px;
    `;

    document.body.appendChild(message);

    setTimeout(() => {
        message.style.transform = 'translateX(0)';
    }, 100);

    setTimeout(() => {
        message.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (message.parentNode) {
                message.parentNode.removeChild(message);
            }
        }, 500);
    }, 3000);
}

// Add smooth reveal animation for week sections
function revealWeekSections() {
    const weekSections = document.querySelectorAll('.week-section');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
    });

    weekSections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        revealObserver.observe(section);
    });
}

// Initialize reveal animations
document.addEventListener('DOMContentLoaded', function() {
    revealWeekSections();
});

// Add touch support for mobile devices
if ('ontouchstart' in window) {
    document.addEventListener('DOMContentLoaded', function() {
        const workoutDays = document.querySelectorAll('.workout-day');
        
        workoutDays.forEach(day => {
            day.addEventListener('touchstart', function() {
                this.style.transform = 'scale(0.98)';
            });
            
            day.addEventListener('touchend', function() {
                this.style.transform = 'scale(1)';
            });
        });
    });
}

// Performance optimization: Lazy load images
function lazyLoadImages() {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('.exercise-image img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Initialize lazy loading
document.addEventListener('DOMContentLoaded', function() {
    lazyLoadImages();
});

// Add print functionality
function printWorkoutSchedule() {
    window.print();
}

// Add share functionality (if supported)
function shareWorkoutSchedule() {
    if (navigator.share) {
        navigator.share({
            title: 'جدول تمارين نحت الجسم - Body Sculpting Workout Schedule',
            text: 'انضمي إلي في رحلة شهرية لتحقيق الجسم المثالي! 💪✨',
            url: window.location.href
        });
    } else {
        // Fallback: copy URL to clipboard
        navigator.clipboard.writeText(window.location.href).then(() => {
            alert('تم نسخ الرابط إلى الحافظة!');
        });
    }
}

// Export completed workouts data
function exportProgress() {
    const data = {
        completedWorkouts: completedWorkouts,
        totalWorkouts: 30,
        progressPercentage: getProgressPercentage(),
        exportDate: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'workout-progress.json';
    a.click();
    URL.revokeObjectURL(url);
}

// Add these functions to global scope for potential use
window.completeWorkout = completeWorkout;
window.resetProgress = resetProgress;
window.printWorkoutSchedule = printWorkoutSchedule;
window.shareWorkoutSchedule = shareWorkoutSchedule;
window.exportProgress = exportProgress;

// Create sparkle effects
function createSparkles(element) {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    for (let i = 0; i < 8; i++) {
        const sparkle = document.createElement('div');
        sparkle.innerHTML = '✨';
        sparkle.style.cssText = `
            position: fixed;
            left: ${centerX}px;
            top: ${centerY}px;
            font-size: 20px;
            pointer-events: none;
            z-index: 1001;
            animation: sparkle 1s ease-out forwards;
            transform: translate(-50%, -50%);
        `;
        
        // Random direction for each sparkle
        const angle = (i * 45) * (Math.PI / 180);
        const distance = 60 + Math.random() * 40;
        const endX = centerX + Math.cos(angle) * distance;
        const endY = centerY + Math.sin(angle) * distance;
        
        sparkle.style.setProperty('--end-x', endX + 'px');
        sparkle.style.setProperty('--end-y', endY + 'px');
        
        document.body.appendChild(sparkle);
        
        // Remove sparkle after animation
        setTimeout(() => {
            if (sparkle.parentNode) {
                sparkle.parentNode.removeChild(sparkle);
            }
        }, 1000);
    }
}

// Add CSS animation for floating effect
const style = document.createElement('style');
style.textContent = `
    @keyframes celebrationFloat {
        0%, 100% { transform: translateX(0) translateY(0) scale(1); }
        25% { transform: translateX(-5px) translateY(-5px) scale(1.02); }
        50% { transform: translateX(0) translateY(-10px) scale(1.05); }
        75% { transform: translateX(5px) translateY(-5px) scale(1.02); }
    }
    
    @keyframes buttonCelebration {
        0% { transform: scale(1) rotate(0deg); }
        25% { transform: scale(1.1) rotate(-5deg); }
        50% { transform: scale(1.2) rotate(5deg); }
        75% { transform: scale(1.1) rotate(-3deg); }
        100% { transform: scale(1) rotate(0deg); }
    }
    
    @keyframes sparkle {
        0% { transform: scale(0) rotate(0deg); opacity: 1; }
        100% { transform: scale(1) rotate(180deg); opacity: 0; }
    }
`;
document.head.appendChild(style);
