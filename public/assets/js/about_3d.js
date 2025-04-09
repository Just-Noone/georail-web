document.querySelectorAll('[id="about_box"]').forEach(box => {
    let isHovered = false;
    
    const handleMove = (e) => {
        if (!isHovered) return;
        
        const rect = box.getBoundingClientRect();
        const centerX = (rect.left + rect.right) / 2;
        const centerY = (rect.top + rect.bottom) / 2;
        
        const posX = (e.clientX - centerX) / (rect.width / 2);
        const posY = (e.clientY - centerY) / (rect.height / 2);
        
        box.style.transform = `
            perspective(1000px)
            rotateX(${posY * -2}deg)
            rotateY(${posX * 2}deg)
            translateZ(0px)
        `;
    };

    box.addEventListener('mouseenter', () => {
        isHovered = true;
    });

    box.addEventListener('mousemove', handleMove);

    box.addEventListener('mouseleave', () => {
        isHovered = false;
        box.style.transform = 'perspective(500px) translateZ(0)';
    });
});