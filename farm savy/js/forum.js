// Forum functionality
document.addEventListener('DOMContentLoaded', function() {
    // Handle reply form submission
    const replyForm = document.querySelector('.reply-form form');
    if (replyForm) {
        replyForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const replyContent = this.querySelector('textarea').value.trim();
            
            if (!replyContent) {
                alert('Please enter your reply before submitting.');
                return;
            }
            
            // In a real app, this would send to server
            alert('Reply submitted! In a real application, this would be saved to the database.');
            this.querySelector('textarea').value = '';
        });
    }
    
    // Handle post actions (like, save, share)
    document.querySelectorAll('.post-action-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const action = this.querySelector('i').className;
            
            if (action.includes('thumbs-up')) {
                // Like action
                const count = parseInt(this.textContent.match(/\((\d+)\)/)[1]);
                this.innerHTML = `<i class="fas fa-thumbs-up"></i> Like (${count + 1})`;
                this.style.color = getComputedStyle(document.documentElement).getPropertyValue('--primary-color');
            } else if (action.includes('bookmark')) {
                // Save action
                this.innerHTML = '<i class="fas fa-bookmark"></i> Saved';
                this.style.color = var(--primary-color);
            } else if (action.includes('share')) {
                // Share action
                alert('Share functionality would open sharing dialog in a real app.');
            }
        });
    });
    
    // Handle reply actions (like, reply)
    document.querySelectorAll('.reply-action-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const action = this.querySelector('i').className;
            
            if (action.includes('thumbs-up')) {
                // Like action
                const count = parseInt(this.textContent.match(/\((\d+)\)/)[1] || 0);
                this.innerHTML = `<i class="fas fa-thumbs-up"></i> Helpful (${count + 1})`;
                this.style.color = var(--primary-color);
            } else if (action.includes('reply')) {
                // Reply action
                const replyTo = this.closest('.reply').querySelector('.reply-author').textContent;
                document.querySelector('textarea').value = `@${replyTo} `;
                document.querySelector('textarea').focus();
            }
        });
    });
    
    // Mark expert replies
    const expertBadges = document.querySelectorAll('.expert-badge');
    expertBadges.forEach(badge => {
        badge.addEventListener('click', function() {
            alert(`${this.parentElement.textContent.trim()} is a verified ${this.textContent} on Farm Savvy.`);
        });
    });
});